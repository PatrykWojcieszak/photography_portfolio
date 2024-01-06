import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { PhotographyCollection } from "@/components/cardList/CardList.types";
import { CardList } from "@/components/cardList/CardList";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: (params.id.charAt(0).toUpperCase() + params.id.slice(1))
      .replace(/([A-Z])/g, " $1")
      .trim(),
  };
}

export async function generateStaticParams() {
  const collectionData = await getDocs(collection(firestore, "homePage"));
  const result: string[] = [];

  collectionData.forEach((collection) => {
    result.push(collection.data().collectionName);
  });

  return result.map((collectionName) => ({
    id: collectionName,
  }));
}

const getData = async (collectionName: string) => {
  const collectionData = await getDocs(collection(firestore, collectionName));

  const result: PhotographyCollection[] = [];

  collectionData.forEach((data) => {
    result.push(data.data() as PhotographyCollection);
  });

  return result;
};

export default async function Page({ params }: { params: { id: string } }) {
  const photoCards = await getData(params.id);

  return <CardList cards={photoCards} />;
}

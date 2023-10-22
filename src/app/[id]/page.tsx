import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { PhotographyCollection } from "@/components/cardList/CardList.types";
import { CardList } from "@/components/cardList/CardList";

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

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { PhotographyCollection } from "@/components/cardList/CardList.types";
import { CardList } from "@/components/cardList/CardList";

const getData = async () => {
  const collectionData = await getDocs(collection(firestore, "homePage"));

  const result: PhotographyCollection[] = [];

  collectionData.forEach((data) => {
    result.push(data.data() as PhotographyCollection);
  });

  return result;
};

export default async function asyncHome() {
  const homePageCards = await getData();

  return <CardList cards={homePageCards} />;
}

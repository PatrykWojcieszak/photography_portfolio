import { PhotographyCollection } from "@/components/cardList/CardList.types";
import { firestore } from "@/firebase/firebase";
import { getDocs, collection } from "firebase/firestore";

export const fetchCategories = async (collectionName: string) => {
  const collectionData = await getDocs(collection(firestore, collectionName));

  const result: PhotographyCollection[] = [];

  collectionData.forEach((data) => {
    result.push(data.data() as PhotographyCollection);
  });

  return result;
};

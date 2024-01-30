import { firestore } from "@/firebase/firebase";
import { getDocs, collection } from "firebase/firestore";

export const fetchAllCollections = async () => {
  const collectionData = await getDocs(collection(firestore, "allPages"));

  const result: string[] = [];

  collectionData.forEach((collection) => {
    result.push(collection.data().collectionName);
  });

  return result.map((collectionName) => ({
    collectionName,
  }));
};

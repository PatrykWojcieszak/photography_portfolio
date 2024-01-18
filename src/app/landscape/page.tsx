import { CardList } from "@/components/cardList/CardList";
import { Metadata } from "next";
import { fetchSubCategories } from "../api/actions/fetchSubCategories";

const COLLECTION_NAME = "landscape";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: COLLECTION_NAME,
  };
}

const getData = async () => {
  return await fetchSubCategories(COLLECTION_NAME);
};

export default async function Page() {
  const photoCards = await getData();

  return <CardList cards={photoCards} categoryName={COLLECTION_NAME} />;
}

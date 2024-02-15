import { CardList } from "@/components/cardList/CardList";
import { Metadata } from "next";
import { fetchCategories } from "../api/actions/fetchCategories";

const COLLECTION_NAME = "streetPhotography";

export function generateMetadata(): Metadata {
  return {
    title: COLLECTION_NAME,
  };
}

const getData = async () => {
  return await fetchCategories(COLLECTION_NAME);
};

export default async function Page() {
  const photoCards = await getData();

  return <CardList cards={photoCards} categoryName={COLLECTION_NAME} />;
}

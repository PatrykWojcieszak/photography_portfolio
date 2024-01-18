import { CardList } from "@/components/cardList/CardList";
import { fetchCategories } from "./api/actions/fetchCategories";

const getData = async () => {
  return await fetchCategories("homePage");
};

export default async function asyncHome() {
  const homePageCards = await getData();

  return <CardList cards={homePageCards} />;
}

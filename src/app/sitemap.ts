import { PhotographyCollection } from "@/components/cardList/CardList.types";
import { firestore } from "@/firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { MetadataRoute } from "next";

const BASE_URL = "https://patrykwojcieszak.pl/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const photographyCategoriesData = await getDocs(
    collection(firestore, "homePage")
  );

  const photographyCategories: PhotographyCollection[] = [];

  photographyCategoriesData.forEach((data) => {
    photographyCategories.push(data.data() as PhotographyCollection);
  });

  const galleriesData = await getDocs(collection(firestore, "allPages"));

  const photographyGalleries: string[] = [];

  galleriesData.forEach((collection) => {
    photographyGalleries.push(collection.data().collectionName);
  });

  const photographyCategoriesMetadata: MetadataRoute.Sitemap =
    photographyCategories.map(({ collectionName }) => ({
      url: BASE_URL + collectionName,
    }));

  const photographyGalleriesMetadata: MetadataRoute.Sitemap =
    photographyGalleries.map((collectionName) => ({
      url: BASE_URL + collectionName,
    }));

  return [...photographyCategoriesMetadata, ...photographyGalleriesMetadata];
}

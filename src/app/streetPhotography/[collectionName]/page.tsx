import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Metadata } from "next";
import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { getPageTitleFromCollectionName } from "@/utils/getPageTitleFromCollectionName";
import { fetchCategories } from "@/app/api/actions/fetchCategories";

export async function generateMetadata({
  params,
}: {
  params: { collectionName: string };
}): Promise<Metadata> {
  return {
    title: getPageTitleFromCollectionName(params.collectionName),
  };
}

export async function generateStaticParams() {
  const allCategories = await fetchCategories("streetPhotography");

  return allCategories.map((category) => ({
    collectionName: category.collectionName,
  }));
}

const getData = async (collectionName: string) => {
  return await fetchImageGallery(collectionName);
};

export default async function Page({
  params,
}: {
  params: { collectionName: string };
}) {
  const photos = await getData(params.collectionName);

  return <MasonryGallery photos={photos} />;
}

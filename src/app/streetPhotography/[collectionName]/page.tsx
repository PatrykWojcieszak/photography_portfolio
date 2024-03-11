import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Metadata } from "next";
import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { getPageTitleFromCollectionName } from "@/utils/getPageTitleFromCollectionName";
import { fetchCategories } from "@/app/api/actions/fetchCategories";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const COLLECTION_NAME = "streetPhotography";

export function generateMetadata({
  params,
}: {
  params: { collectionName: string };
}): Metadata {
  return {
    title: getPageTitleFromCollectionName(params.collectionName),
  };
}

export async function generateStaticParams() {
  const allCategories = await fetchCategories(COLLECTION_NAME);

  return allCategories.map((category) => ({
    collectionName: category.collectionName,
  }));
}

const getData = async (collectionName: string) => {
  const photos = await fetchImageGallery(collectionName);

  if (!photos.length) {
    return notFound();
  }

  return photos;
};

export default async function Page({
  params,
}: {
  params: { collectionName: string };
}) {
  const photos = await getData(params.collectionName);

  return (
    <Suspense>
      <MasonryGallery photos={photos} />
    </Suspense>
  );
}

import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Metadata } from "next";
import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { getPageTitleFromCollectionName } from "@/utils/getPageTitleFromCollectionName";
import { fetchCategories } from "@/app/api/actions/fetchCategories";
import { GalleryContextController } from "@/providers/gallery/galleryContextController/GalleryContextController";
import { Suspense } from "react";
import { notFound } from "next/navigation";

const COLLECTION_NAME = "landscape";

export async function generateMetadata({
  params,
}: {
  params: { collectionName: string };
  searchParams: {
    photo: string;
  };
}): Promise<Metadata> {
  return {
    title: getPageTitleFromCollectionName(params.collectionName),
    metadataBase: new URL("https://photography-portfolio-sooty.vercel.app/"),
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

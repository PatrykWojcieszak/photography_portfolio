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
  searchParams,
}: {
  params: { collectionName: string };
  searchParams: {
    photo: string;
  };
}): Promise<Metadata> {
  const categories = await fetchCategories(COLLECTION_NAME);
  const categoryPhoto = categories.find(
    (category) => category.collectionName === params.collectionName
  )?.thumbnailId;

  return {
    title: getPageTitleFromCollectionName(params.collectionName),
    openGraph: {
      images: [
        {
          url: `/api/og?photo=${categoryPhoto}`,
          width: 1200,
          height: 630,
          alt: "photo thumbnail",
        },
      ],
    },
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
    <GalleryContextController>
      <Suspense>
        <MasonryGallery photos={photos} />
      </Suspense>
    </GalleryContextController>
  );
}

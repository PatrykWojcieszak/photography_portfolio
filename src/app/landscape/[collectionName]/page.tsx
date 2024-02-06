// @ts-nocheck
import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Metadata } from "next";
import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { getPageTitleFromCollectionName } from "@/utils/getPageTitleFromCollectionName";
import { fetchCategories } from "@/app/api/actions/fetchCategories";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { collectionName: string };
  searchParams: {
    photo: string;
  };
}): Promise<Metadata> {
  return {
    title: getPageTitleFromCollectionName(params.collectionName),
    openGraph: {
      images: [
        {
          url: `patrykwojcieszak.pl/api/og?photo=${searchParams.photo}`,
          width: 1200,
          height: 630,
          alt: "photo thumbnail",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const allCategories = await fetchCategories("landscape");

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

import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Metadata } from "next";
import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { getPageTitleFromCollectionName } from "@/utils/getPageTitleFromCollectionName";
import { fetchCategories } from "@/app/api/actions/fetchCategories";
import { GalleryContextController } from "@/providers/gallery/galleryContextController/GalleryContextController";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { collectionName: string };
  searchParams: {
    photo: string;
  };
}): Promise<Metadata> {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  return {
    title: getPageTitleFromCollectionName(params.collectionName),
    openGraph: {
      images: [
        {
          url: `${pathname.split("/")[0]}/api/og?photo=${searchParams.photo}`,
          width: 1200,
          height: 630,
          alt: "photo thumbnail",
        },
      ],
    },
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

  return (
    <GalleryContextController>
      <MasonryGallery photos={photos} />
    </GalleryContextController>
  );
}

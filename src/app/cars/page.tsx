import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Metadata } from "next";
import { fetchImageGallery } from "../api/actions/fetchImageGallery";
import { GalleryContextController } from "@/providers/gallery/galleryContextController/GalleryContextController";
import { headers } from "next/headers";
import { fetchCategories } from "../api/actions/fetchCategories";
import { Suspense } from "react";

const COLLECTION_NAME = "cars";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    photo: string;
  };
}): Promise<Metadata> {
  const categories = await fetchCategories("homePage");
  const categoryPhoto = categories.find(
    (category) => category.collectionName === COLLECTION_NAME
  )?.thumbnailId;

  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  return {
    metadataBase: new URL(pathname.split("/")[0]),
    title: COLLECTION_NAME,
    openGraph: {
      images: [
        {
          url: `/api/og?photo=${searchParams.photo ?? categoryPhoto}`,
          width: 1200,
          height: 630,
          alt: "photo thumbnail",
        },
      ],
    },
  };
}

const getData = async () => {
  return await fetchImageGallery(COLLECTION_NAME);
};

export default async function Page() {
  const photos = await getData();

  return (
    <GalleryContextController>
      <Suspense>
        <MasonryGallery photos={photos} />
      </Suspense>
    </GalleryContextController>
  );
}

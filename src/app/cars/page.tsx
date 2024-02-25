import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Metadata } from "next";
import { fetchImageGallery } from "../api/actions/fetchImageGallery";
import { Suspense } from "react";

const COLLECTION_NAME = "cars";

export function generateMetadata(): Metadata {
  return {
    title: COLLECTION_NAME,
  };
}

const getData = async () => {
  return await fetchImageGallery(COLLECTION_NAME);
};

export default async function Page() {
  const photos = await getData();

  return (
    <Suspense>
      <MasonryGallery photos={photos} />
    </Suspense>
  );
}

import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Metadata } from "next";
import { Suspense } from "react";

const COLLECTION_NAME = "malaFatra";

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

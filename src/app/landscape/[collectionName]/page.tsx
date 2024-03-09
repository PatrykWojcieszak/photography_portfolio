import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { Suspense } from "react";

const getData = async (collectionName: string) => {
  const photos = await fetchImageGallery(collectionName);

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

import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { ExpandedPhotoWithGallery } from "@/components/expandedPhotoWithGallery/ExpandedPhotoWithGallery";
import { getPageTitleFromCollectionName } from "@/utils/getPageTitleFromCollectionName";
import { Metadata } from "next";

export function generateMetadata({
  params,
}: {
  params: { collectionName: string; photo: string };
}): Metadata {
  return {
    title: getPageTitleFromCollectionName(params.collectionName),
    openGraph: {
      images: [
        {
          url: `/api/og?photo=${params.photo}`,
          width: 1200,
          height: 630,
          alt: "photo thumbnail",
        },
      ],
    },
  };
}

const getData = async (collectionName: string) => {
  return await fetchImageGallery(collectionName);
};

export default async function Page({
  params,
}: {
  params: { photo: string; collectionName: string };
}) {
  const photos = await getData(params.collectionName);

  return (
    <ExpandedPhotoWithGallery
      photos={photos.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )}
      selectedPhotoId={params.photo}
    />
  );
}

import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { ExpandedPhotoWithGallery } from "@/components/expandedPhotoWithGallery/ExpandedPhotoWithGallery";

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

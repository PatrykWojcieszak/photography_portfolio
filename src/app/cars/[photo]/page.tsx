import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { ExpandedPhotoWithGallery } from "@/components/expandedPhotoWithGallery/ExpandedPhotoWithGallery";

const COLLECTION_NAME = "cars";

const getData = async () => {
  return await fetchImageGallery(COLLECTION_NAME);
};

export default async function Page({ params }: { params: { photo: string } }) {
  const photos = await getData();
  console.log("params.photo", params.photo);
  return (
    <ExpandedPhotoWithGallery photos={photos} selectedPhotoId={params.photo} />
  );
}

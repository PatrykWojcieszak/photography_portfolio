import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { GalleryExpandedPhoto } from "@/components/galleryExpandedPhoto/GalleryExpandedPhoto";

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
    <GalleryExpandedPhoto
      photoId={params.photo}
      allPhotos={photos.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )}
    />
  );
}

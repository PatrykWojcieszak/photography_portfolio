import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Photo } from "@/components/masonryGallery/MasonryGallery.types";
import cloudinary from "@/utils/cloudinary";
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";

const CLOUDINARY_IDS_CHUNK = 100;

const getData = async (collectionName: string) => {
  const galleryFirestoreData = await getDocs(
    collection(firestore, collectionName)
  );

  const result: Photo[] = [];

  galleryFirestoreData.forEach((data) => {
    const photoData = data.data();

    if ((photoData as Photo)?.photoId) {
      result.push(data.data() as Photo);
    }
  });

  const photoIds = result.map((photo) => photo.photoId);

  const splittedUserIdChunks = Array(
    Math.ceil(photoIds.length / CLOUDINARY_IDS_CHUNK)
  )
    .fill(0)
    .map((_, index) =>
      photoIds.slice(
        index * CLOUDINARY_IDS_CHUNK,
        index * CLOUDINARY_IDS_CHUNK + CLOUDINARY_IDS_CHUNK
      )
    );

  const cloudinaryPhotoPromises = splittedUserIdChunks.map((idsChunk) =>
    cloudinary.v2.api.resources_by_ids(idsChunk)
  );

  const cloudinaryPhotos = await Promise.all(cloudinaryPhotoPromises);

  const cloudinaryResources = cloudinaryPhotos.flatMap((res) => res.resources);

  const blurImagePromises = cloudinaryResources.map((image) => {
    return getBase64ImageUrl(image.public_id);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < result.length; i++) {
    result[i].blurPhotoData = imagesWithBlurDataUrls[i];
  }

  const finalResult = result.map((photo) => {
    const cloudinaryPhoto = cloudinaryResources.find(
      (cloudinaryPhoto) => cloudinaryPhoto.id === photo.photoId
    );

    return { ...photo, ...(cloudinaryPhoto ?? {}) };
  });

  return finalResult;
};

export default async function Page({ params }: { params: { id: string } }) {
  const photos = await getData(params.id);

  return <MasonryGallery photos={photos} />;
}

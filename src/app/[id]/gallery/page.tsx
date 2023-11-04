import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Photo } from "@/components/masonryGallery/MasonryGallery.types";
import cloudinary from "@/utils/cloudinary";
import { resizePhoto } from "@/utils/resizePhoto";

const CLOUDINARY_IDS_CHUNK = 100;
const PHOTO_HEIGHT = 299;
const PHOTO_WIDTH = 200;

export async function generateStaticParams() {
  const collectionData = await getDocs(collection(firestore, "allPages"));

  const result: string[] = [];

  collectionData.forEach((collection) => {
    result.push(collection.data().collectionName);
  });

  return result.map((collectionName) => ({
    id: collectionName,
  }));
}

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
    cloudinary.v2.api.resources_by_ids(idsChunk, {})
  );

  const cloudinaryPhotos = await Promise.all(cloudinaryPhotoPromises);

  const cloudinaryResources = cloudinaryPhotos.flatMap((res) => res.resources);

  return result.map((photo) => {
    const cloudinaryPhoto = cloudinaryResources.find(
      (cdnPhoto) => cdnPhoto.public_id === photo.photoId
    );
    const resizedPhoto = resizePhoto(
      [cloudinaryPhoto?.width ?? 0, cloudinaryPhoto?.height ?? 0],
      [PHOTO_WIDTH, PHOTO_HEIGHT]
    );

    return { ...photo, width: resizedPhoto[0], height: resizedPhoto[1] };
  });
};

export default async function Page({ params }: { params: { id: string } }) {
  const photos = await getData(params.id);

  return <MasonryGallery photos={photos} />;
}

import { Photo } from "@/components/masonryGallery/MasonryGallery.types";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "@/constants";
import { resizePhoto } from "@/utils/resizePhoto";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

export const fetchImageGallery = async (collectionName: string) => {
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

  return result.map((photo) => {
    const resizedPhoto = resizePhoto(
      [photo.width, photo.height],
      [PHOTO_WIDTH, PHOTO_HEIGHT]
    );

    return {
      ...photo,
      width: resizedPhoto[0],
      height: resizedPhoto[1],
    };
  });
};

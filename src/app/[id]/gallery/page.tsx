import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Photo } from "@/components/masonryGallery/MasonryGallery.types";
import cloudinary from "@/utils/cloudinary";
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";

const getData = async (collectionName: string) => {
  const collectionData = await getDocs(collection(firestore, collectionName));

  const result: Photo[] = [];

  collectionData.forEach((data) => {
    result.push(data.data() as Photo);
  });

  const chunk = 100;

  const photoIds = result.map((photo) => photo.photoId);

  const splittedUserIds = Array(Math.ceil(photoIds.length / chunk))
    .fill(0)
    .map((_, index) => photoIds.slice(index * chunk, index * chunk + chunk));

  const cloudinaryRequest = splittedUserIds.map((idsChunk) =>
    cloudinary.v2.api.resources_by_ids(idsChunk)
  );

  const cloudinaryResult = await Promise.all(cloudinaryRequest);

  const resources = cloudinaryResult.flatMap((res) => res.resources);

  const blurImagePromises = resources.map((image) => {
    return getBase64ImageUrl(image.public_id);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < result.length; i++) {
    result[i].small = imagesWithBlurDataUrls[i];
  }

  const finalResult = result.map((photo) => {
    const cloudinaryPhoto = resources.find(
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

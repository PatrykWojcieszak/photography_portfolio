import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Photo } from "@/components/masonryGallery/MasonryGallery.types";
import { getPictures } from "@/app/api/pictures";

const getData = async (collectionName: string) => {
  const collectionData = await getDocs(collection(firestore, collectionName));

  const result: Photo[] = [];

  collectionData.forEach((data) => {
    result.push(data.data() as Photo);
  });

  const pictures = await getPictures(result.map((photo) => photo.photoId));
  console.log("tatras pictures", pictures);
  console.log("tatras photos", result);

  const finalResult = result.map((photo) => {
    const cloudinaryPhoto = pictures.find(
      (cloudinaryPhoto) => cloudinaryPhoto.id === photo.photoId
    );

    return { ...photo, ...(cloudinaryPhoto ?? {}) };
  });

  console.log("finalResult", finalResult);

  return finalResult;
};

export default async function Page({ params }: { params: { id: string } }) {
  const photos = await getData(params.id);

  return <MasonryGallery photos={photos} />;
}

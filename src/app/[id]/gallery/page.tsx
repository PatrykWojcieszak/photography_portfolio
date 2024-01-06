import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Photo } from "@/components/masonryGallery/MasonryGallery.types";
import { resizePhoto } from "@/utils/resizePhoto";
import { PHOTO_WIDTH, PHOTO_HEIGHT } from "@/constants";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: (params.id.charAt(0).toUpperCase() + params.id.slice(1))
      .replace(/([A-Z])/g, " $1")
      .trim(),
  };
}

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

export default async function Page({ params }: { params: { id: string } }) {
  const photos = await getData(params.id);

  return <MasonryGallery photos={photos} />;
}

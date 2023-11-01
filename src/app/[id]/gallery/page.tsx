import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Photo } from "@/components/masonryGallery/MasonryGallery.types";

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

  return result;
};

export default async function Page({ params }: { params: { id: string } }) {
  const photos = await getData(params.id);

  return <MasonryGallery photos={photos} />;
}

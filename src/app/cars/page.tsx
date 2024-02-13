import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Metadata } from "next";
import { fetchImageGallery } from "../api/actions/fetchImageGallery";
import { GalleryContextController } from "@/providers/gallery/galleryContextController/GalleryContextController";

const COLLECTION_NAME = "cars";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: COLLECTION_NAME,
  };
}

const getData = async () => {
  return await fetchImageGallery(COLLECTION_NAME);
};

export default async function Page() {
  const photos = await getData();

  return (
    <GalleryContextController>
      <MasonryGallery photos={photos} />
    </GalleryContextController>
  );
}

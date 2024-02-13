import { GalleryExpandedPhoto } from "@/components/galleryExpandedPhoto/GalleryExpandedPhoto";

export default async function Page({ params }: { params: { photo: string } }) {
  return <GalleryExpandedPhoto photoId={params.photo} />;
}

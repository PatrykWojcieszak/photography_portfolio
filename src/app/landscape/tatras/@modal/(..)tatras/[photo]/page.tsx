import { fetchImageGallery } from "@/app/api/actions/fetchImageGallery";
import { GalleryExpandedPhoto } from "@/components/galleryExpandedPhoto/GalleryExpandedPhoto";
import { Metadata } from "next";

const COLLECTION_NAME = "tatras";

export function generateMetadata({
  params,
}: {
  params: { photo: string };
}): Metadata {
  return {
    title: COLLECTION_NAME,
    openGraph: {
      images: [
        {
          url: `/api/og?photo=${params.photo}`,
          width: 1200,
          height: 630,
          alt: "photo thumbnail",
        },
      ],
    },
  };
}

const getData = async () => {
  return await fetchImageGallery(COLLECTION_NAME);
};

export default async function Page({ params }: { params: { photo: string } }) {
  const photos = await getData();

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

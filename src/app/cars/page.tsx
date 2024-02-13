import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Metadata } from "next";
import { fetchImageGallery } from "../api/actions/fetchImageGallery";
import { GalleryContextController } from "@/providers/gallery/galleryContextController/GalleryContextController";
import { headers } from "next/headers";

const COLLECTION_NAME = "cars";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    photo: string;
  };
}): Promise<Metadata> {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  return {
    title: COLLECTION_NAME,
    openGraph: {
      images: [
        {
          url: `${pathname.split("/")[0]}/api/og?photo=${searchParams.photo}`,
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

export default async function Page() {
  const photos = await getData();

  return (
    <GalleryContextController>
      <MasonryGallery photos={photos} />
    </GalleryContextController>
  );
}

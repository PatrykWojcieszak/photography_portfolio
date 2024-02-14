import { MasonryGallery } from "@/components/masonryGallery/MasonryGallery";
import { Metadata } from "next";
import { fetchImageGallery } from "../api/actions/fetchImageGallery";
import { GalleryContextController } from "@/providers/gallery/galleryContextController/GalleryContextController";
import { headers } from "next/headers";
import { fetchCategories } from "../api/actions/fetchCategories";

const COLLECTION_NAME = "cars";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { collectionName: string };
  searchParams: {
    photo: string;
  };
}): Promise<Metadata> {
  const categories = await fetchCategories("homePage");
  const categoryPhoto = categories.find(
    (category) => category.collectionName === params.collectionName
  )?.thumbnailId;

  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  return {
    title: COLLECTION_NAME,
    openGraph: {
      images: [
        {
          url: `${pathname.split("/")[0]}/api/og?photo=zwo00wsjdykjjn4kdoxp`,
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

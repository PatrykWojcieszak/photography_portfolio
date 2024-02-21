/* eslint-disable @next/next/no-img-element */
import { fetchCategories } from "@/app/api/actions/fetchCategories";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";
const COLLECTION_NAME = "landscape";

export const size = {
  width: 1200,
  height: 630,
};

export default async function Image({
  params,
  searchParams,
}: {
  params: { collectionName: string };
  searchParams: {
    photo: string;
  };
}) {
  const categories = await fetchCategories(COLLECTION_NAME);
  const categoryPhoto = categories.find(
    (category) => category.collectionName === params.collectionName
  )?.thumbnailId;

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <img
          alt="gallery photo"
          src={`https://res.cloudinary.com/dn8n473ye/image/upload/w_1200,h_630,c_fill/${
            searchParams.photo ?? categoryPhoto
          }.jpg`}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

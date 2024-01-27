import BaseImage from "next/image";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Gallery photo";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params,
}: {
  params: {
    collectionName: string;
    searchParams: {
      photo: string;
    };
  };
}) {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <BaseImage
        unoptimized
        src={`https://res.cloudinary.com/${
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        }/image/upload/c_scale,h_500/${
          params.searchParams.photo ?? "mzgshobomvwz7w4cica9"
        }.webp`}
        alt={alt}
        className="border border-white/50 rounded-lg cursor-pointer"
      />
    ),
    {
      ...size,
    }
  );
}

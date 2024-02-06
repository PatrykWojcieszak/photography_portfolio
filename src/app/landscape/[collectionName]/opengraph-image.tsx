import BaseImage from "next/image";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

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
export default async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const photoId = searchParams.get("photo");

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <BaseImage
        unoptimized
        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,h_500/${photoId}.webp`}
        alt={alt}
        width={size.width}
        height={size.height}
        className="border border-white/50 rounded-lg cursor-pointer"
      />
    ),
    {
      ...size,
    }
  );
}

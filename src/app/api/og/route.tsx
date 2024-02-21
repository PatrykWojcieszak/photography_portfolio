/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";
export const alt = "Gallery photo";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const photo = searchParams.get("photo");

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-black">
          <img
            width={1200}
            height={630}
            src={`https://res.cloudinary.com/dn8n473ye/image/upload/w_1200,h_630,c_fill/${photo}.jpg`}
          />
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}

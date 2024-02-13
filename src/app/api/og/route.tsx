/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("photo");
    const photo = hasTitle ? searchParams.get("photo") : "";

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-black">
          <img
            width={1200}
            height={630}
            src={`https://res.cloudinary.com/dn8n473ye/image/upload/w_1200,h-630,crop=fit/${photo}.jpg`}
          />
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}

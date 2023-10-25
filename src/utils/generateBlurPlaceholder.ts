import { encode } from "base64-arraybuffer";

const cache = new Map<string, string>();

export default async function getBase64ImageUrl(
  public_id: string
): Promise<string> {
  let url = cache.get(public_id);
  if (url) {
    return url;
  }

  const responseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${public_id}.webp`;

  const response = await fetch(
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${public_id}.webp`
  );

  const buffer = await (await fetch(responseUrl)).arrayBuffer();
  const base64 = await encode(buffer);

  url = `data:image/jpeg;base64,${base64}`;
  cache.set(public_id, url);
  return url;
}

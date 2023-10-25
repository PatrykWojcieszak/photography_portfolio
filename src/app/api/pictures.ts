import cloudinary from "cloudinary";
import { encode } from "base64-arraybuffer";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const getPictures = async (ids: string[]) => {
  const chunk = 100;

  const splittedUserIds = Array(Math.ceil(ids.length / chunk))
    .fill(0)
    .map((_, index) => ids.slice(index * chunk, index * chunk + chunk));

  const cloudinaryRequest = splittedUserIds.map((idsChunk) =>
    cloudinary.v2.api.resources_by_ids(idsChunk)
  );

  const result = await Promise.all(cloudinaryRequest);

  const resources = result.flatMap((res) => res.resources);
  const urls = await resources.map((resource) => {
    const smallUrl = getThumbnail(resource.public_id);

    return {
      largeUrl: resource.url,
      smallUrl,
      publicId: resource.public_id,
    };
  });

  const promises = urls.map((url) => fetchBase64(url.smallUrl));
  const resolvedPromises = await Promise.all(promises);

  const response = urls.map((url, index) => ({
    large: url.largeUrl,
    small: resolvedPromises[index],
    id: url.publicId,
  }));

  return response;
};

const fetchBase64 = async (url: string): Promise<string> => {
  const buffer = await (await fetch(url)).arrayBuffer();
  const base64 = await encode(buffer);

  return base64;
};

const getThumbnail = (publicId: string): string => {
  const url = cloudinary.v2.url(publicId, {
    gravity: "face",
    width: 200,
    crop: "thumb",
  });

  return url;
};

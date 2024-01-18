export const getExpandedPhotoUrl = (photoId: string, size: number) =>
  `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_${size}/${photoId}.webp`;

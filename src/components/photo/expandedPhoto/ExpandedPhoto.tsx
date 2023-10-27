import Image from "next/image";
import { ExpandedPhotoProps } from "./ExpandedPhoto.types";
import { shimmerLoader } from "@/utils/getShimmerLoader";

export const ExpandedPhoto = ({
  alt,
  closeExpandedMode,
  photoId,
}: ExpandedPhotoProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/90 z-40 !mt-0 p-16 cursor-pointer"
      onClick={closeExpandedMode}>
      <div className="relative w-full h-full flex items-start justify-center z-50">
        <Image
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_3440/${photoId}.webp`}
          placeholder={`data:image/svg+xml;base64,${shimmerLoader}`}
          loading="lazy"
        />
      </div>
    </div>
  );
};

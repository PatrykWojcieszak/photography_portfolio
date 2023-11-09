import Image from "next/image";
import { ExpandedPhotoProps } from "./ExpandedPhoto.types";
import { shimmerLoader } from "@/utils/getShimmerLoader";

export const ExpandedPhoto = ({
  closeExpandedMode,
  photoId,
  description,
  isPhotoLoaded,
  onPhotoLoaded,
}: ExpandedPhotoProps) => {
  const onLoadedImage = (image: HTMLImageElement) => {
    onPhotoLoaded(true);
    image.classList.remove("opacity-0");
  };

  return (
    <div
      className={`transition-opacity duration-[0.5s] fixed top-0 left-0 w-full h-full bg-black/90 z-40 !mt-0 p-16 cursor-pointer ${
        !isPhotoLoaded && "opacity-0"
      }`}
      onClick={closeExpandedMode}>
      <div className="relative w-full h-full flex items-start justify-center z-50">
        <Image
          unoptimized
          alt={description}
          fill
          style={{ objectFit: "contain" }}
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${photoId}.webp`}
          placeholder={`data:image/svg+xml;base64,${shimmerLoader}`}
          className="transition-opacity opacity-0 duration-[0.5s] rounded-lg"
          onLoadingComplete={onLoadedImage}
          loading="lazy"
        />
      </div>
    </div>
  );
};

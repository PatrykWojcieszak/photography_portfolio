import Image from "next/image";
import { ExpandedPhotoProps } from "./ExpandedPhoto.types";
import { shimmerLoader } from "@/utils/getShimmerLoader";
import { PhotoSize } from "@/components/masonryGallery/MasonryGallery.types";
import { clsx } from "clsx";
import { useWindowSize } from "react-use";

const VERTICAL_PHOTO_WIDTH = 720;
const HORIZONTAL_PHOTO_WIDTH = 1920;
const VERTICAL_PHOTO_SCALE_PADDING = 0.2;
const HORIZONTAL_PHOTO_SCALE_PADDING = 0.4;

export const ExpandedPhoto = ({
  closeExpandedMode,
  photoId,
  description,
  isPhotoLoaded,
  onPhotoLoaded,
  size,
  positionX,
  positionY,
  width,
  height,
  scrollPosition,
}: ExpandedPhotoProps) => {
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const onLoadedImage = (image: HTMLImageElement) => {
    onPhotoLoaded(true);

    const xPosition = windowWidth / 2 - (positionX ?? 0) - width / 2;
    const yPosition =
      windowHeight / 2 - ((positionY ?? 0) - scrollPosition) - height / 2;

    const xMaxScale = windowWidth / width;
    const yMaxScale = windowHeight / height;

    const maxScale =
      Math.min(xMaxScale, yMaxScale) -
      (size === PhotoSize.VERTICAL
        ? VERTICAL_PHOTO_SCALE_PADDING
        : HORIZONTAL_PHOTO_SCALE_PADDING);

    image.classList.remove("opacity-0");
    image.style.setProperty(
      "transform",
      `translate(${xPosition}px, ${yPosition}px) scale(${maxScale})`
    );
  };

  return (
    <div
      className={clsx(
        "transition-opacity duration-[0.5s] fixed top-0 left-0 w-full h-full bg-black/90 z-40 !mt-0 md:p-8 cursor-pointer",
        !isPhotoLoaded && "opacity-0"
      )}
      onClick={closeExpandedMode}>
      <div className="relative w-full h-full flex items-start justify-center z-50">
        <Image
          unoptimized
          alt={description}
          style={{
            objectFit: "contain",
            top: (positionY ?? 0) - scrollPosition,
            left: positionX ?? 0,
          }}
          src={`https://res.cloudinary.com/${
            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
          }/image/upload/c_scale,w_${
            size !== PhotoSize.VERTICAL
              ? HORIZONTAL_PHOTO_WIDTH
              : VERTICAL_PHOTO_WIDTH
          }/${photoId}.webp`}
          width={width}
          height={height}
          placeholder={`data:image/svg+xml;base64,${shimmerLoader}`}
          className="fixed transition-all opacity-0 duration-[1s] rounded-lg"
          onLoadingComplete={onLoadedImage}
          loading="lazy"
        />
      </div>
    </div>
  );
};

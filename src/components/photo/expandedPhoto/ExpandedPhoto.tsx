"use client";

import Image from "next/image";
import { ExpandedPhotoProps } from "./ExpandedPhoto.types";
import { shimmerLoader } from "@/utils/getShimmerLoader";
import {
  Photo,
  PhotoSize,
} from "@/components/masonryGallery/MasonryGallery.types";
import { clsx } from "clsx";
import { useKeyPressEvent, useWindowSize } from "react-use";
import { getExpandedPhotoUrl } from "@/utils/getExpandedPhotoUrl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const VERTICAL_PHOTO_WIDTH = 720;
const HORIZONTAL_PHOTO_WIDTH = 1920;
const VERTICAL_PHOTO_SCALE_PADDING = 0.2;
const HORIZONTAL_PHOTO_SCALE_PADDING = 0.4;

export const ExpandedPhoto = ({
  closeExpandedMode,
  isPhotoLoaded,
  onPhotoLoaded,
  positionX,
  positionY,
  scrollPosition,
  photos,
}: ExpandedPhotoProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const photoId = searchParams.get("photo") ?? "";

  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const { width, height, size, description } = photos.find(
    (photo) => photo.photoId === photoId
  ) as Photo;

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

  const currentPhotoIndexInArray = photos.findIndex(
    (photo) => photo.photoId === photoId
  );

  const previousPhoto = photos?.[currentPhotoIndexInArray - 1];
  const nextPhoto = photos?.[currentPhotoIndexInArray + 1];

  const changePhoto = (photoId: string) =>
    router.replace(`${pathname}?photo=${photoId}`, { scroll: false });

  useKeyPressEvent(
    "ArrowLeft",
    () => previousPhoto && changePhoto(previousPhoto.photoId)
  );
  useKeyPressEvent(
    "ArrowRight",
    () => nextPhoto && changePhoto(nextPhoto.photoId)
  );

  return (
    <div
      className={clsx(
        "transition-opacity duration-[0.5s] fixed top-0 left-0 w-full h-full bg-black/90 z-40 !mt-0 md:p-8 cursor-pointer",
        !isPhotoLoaded && "opacity-0"
      )}
      onClick={closeExpandedMode}>
      <div
        className="relative w-full h-full flex items-start justify-center z-50"
        onKeyDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
        <Image
          unoptimized
          alt={description}
          style={{
            objectFit: "contain",
            top: (positionY ?? 0) - scrollPosition,
            left: positionX ?? 0,
          }}
          src={getExpandedPhotoUrl(
            photoId,
            size !== PhotoSize.VERTICAL
              ? HORIZONTAL_PHOTO_WIDTH
              : VERTICAL_PHOTO_WIDTH
          )}
          width={width}
          height={height}
          placeholder={`data:image/svg+xml;base64,${shimmerLoader}`}
          className="fixed transition-all opacity-0 duration-[0.7s] rounded-lg"
          onLoadingComplete={onLoadedImage}
          loading="lazy"
        />
      </div>
    </div>
  );
};

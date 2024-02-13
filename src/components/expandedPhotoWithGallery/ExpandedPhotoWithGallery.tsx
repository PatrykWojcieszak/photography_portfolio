"use client";

import { getExpandedPhotoUrl } from "@/utils/getExpandedPhotoUrl";
import { Photo, PhotoSize } from "../masonryGallery/MasonryGallery.types";
import { ExpandedPhotoWithGalleryProps } from "./ExpandedPhotoWithGallery.types";
import Image from "next/image";
import { useKeyPressEvent, useWindowSize } from "react-use";
import { shimmerLoader } from "@/utils/getShimmerLoader";
import { clsx } from "clsx";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const VERTICAL_PHOTO_WIDTH = 720;
const HORIZONTAL_PHOTO_WIDTH = 1920;
const VERTICAL_PHOTO_SCALE_PADDING = 0.6;
const HORIZONTAL_PHOTO_SCALE_PADDING = 0.12;

export const ExpandedPhotoWithGallery = ({
  photos,
  selectedPhotoId,
}: ExpandedPhotoWithGalleryProps) => {
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const router = useRouter();
  const pathname = usePathname();

  console.log("pathname", pathname, selectedPhotoId);
  const { width, height, size, description } = photos?.find(
    (photo) => photo.photoId === selectedPhotoId
  ) as Photo;

  const xMaxScale = windowWidth / width;
  const yMaxScale = windowHeight / height;

  const maxScale =
    Math.min(xMaxScale, yMaxScale) -
    (size === PhotoSize.VERTICAL
      ? VERTICAL_PHOTO_SCALE_PADDING
      : HORIZONTAL_PHOTO_SCALE_PADDING);

  const maxPhotoHeight = height * maxScale;
  const maxPhotoWidth = width * maxScale;

  const currentPhotoIndexInArray = photos.findIndex(
    (photo) => photo.photoId === selectedPhotoId
  );

  const previousPhoto = photos?.[currentPhotoIndexInArray - 1];
  const nextPhoto = photos?.[currentPhotoIndexInArray + 1];
  console.log("photos", photos);
  console.log("previousPhoto", previousPhoto);
  console.log("nextPhoto", nextPhoto);
  // useEffect(() => {
  //   if (previousPhoto) {
  //     router.prefetch(`/cars/${previousPhoto.photoId}`);
  //   }
  // }, [previousPhoto, router]);

  // useEffect(() => {
  //   if (nextPhoto) {
  //     router.prefetch(`/cars/${nextPhoto.photoId}`);
  //   }
  // }, [nextPhoto, router]);

  const changePhoto = (photoId: string) => {
    router.push(`/cars/${photoId}`);
  };

  useKeyPressEvent("ArrowLeft", () => {
    if (previousPhoto) {
      changePhoto(previousPhoto.photoId);
    }
  });

  useKeyPressEvent("ArrowRight", () => {
    if (nextPhoto) {
      changePhoto(nextPhoto.photoId);
    }
  });
  console.log("maxPhotoWidth ?? width", maxPhotoWidth, width);
  return (
    <div className="flex justify-center">
      <Image
        unoptimized
        alt={description}
        style={{
          transform: "translate3d(0, 0, 0)",
          objectFit: "contain",
        }}
        src={getExpandedPhotoUrl(
          selectedPhotoId,
          size !== PhotoSize.VERTICAL
            ? HORIZONTAL_PHOTO_WIDTH
            : VERTICAL_PHOTO_WIDTH
        )}
        width={width}
        height={height}
        placeholder={`data:image/svg+xml;base64,${shimmerLoader}`}
        className={clsx("rounded-lg")}
        // onLoadingComplete={onLoadedImage}
        priority
      />
    </div>
  );
};

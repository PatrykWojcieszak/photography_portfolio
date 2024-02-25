"use client";

import { getExpandedPhotoUrl } from "@/utils/getExpandedPhotoUrl";
import { Photo, PhotoSize } from "../masonryGallery/MasonryGallery.types";
import { ExpandedPhotoWithGalleryProps } from "./ExpandedPhotoWithGallery.types";
import Image from "next/image";
import { useKeyPressEvent, useWindowSize } from "react-use";
import { shimmerLoader } from "@/utils/getShimmerLoader";
import { clsx } from "clsx";
import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

const VERTICAL_PHOTO_WIDTH = 720;
const HORIZONTAL_PHOTO_WIDTH = 1920;
const VERTICAL_PHOTO_SCALE_PADDING = 0.2;
const HORIZONTAL_PHOTO_SCALE_PADDING = 0.4;

export const ExpandedPhotoWithGallery = ({
  photos,
  selectedPhotoId,
}: ExpandedPhotoWithGalleryProps) => {
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const router = useRouter();
  const pathname = usePathname();

  const url = pathname.substring(0, pathname.lastIndexOf("/") + 1);

  const { width, height, size, description } = photos?.find(
    (photo) => photo.photoId === selectedPhotoId
  ) as Photo;

  const handleCloseExpandedMode = () => {
    router.push(url);
  };

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

  useEffect(() => {
    if (previousPhoto) {
      router.prefetch(`${url}/${previousPhoto.photoId}`);
    }
  }, [previousPhoto, router, url]);

  useEffect(() => {
    if (nextPhoto) {
      router.prefetch(`${url}/${nextPhoto.photoId}`);
    }
  }, [nextPhoto, router, url]);

  const changePhoto = (photoId: string) => {
    router.push(`${url}/${photoId}`);
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

  const photoWidth = useMemo(() => {
    if (maxPhotoWidth) {
      return maxPhotoWidth;
    }

    return width;
  }, [maxPhotoWidth, width]);

  const photoHeight = useMemo(() => {
    if (maxPhotoHeight) {
      return maxPhotoWidth;
    }

    return height;
  }, [height, maxPhotoHeight, maxPhotoWidth]);

  return (
    <div
      className={clsx(
        "transition-opacity duration-[0.5s] fixed top-0 left-0 w-full h-full bg-black/90 z-40 !mt-0 md:p-8 cursor-pointer"
      )}
      onClick={handleCloseExpandedMode}>
      <div
        className="relative text-red-600 w-full h-full flex justify-center z-50"
        onKeyDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
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
          width={photoWidth}
          height={photoHeight}
          placeholder={`data:image/svg+xml;base64,${shimmerLoader}`}
          className={clsx("rounded-lg")}
          priority
        />
      </div>
    </div>
  );
};

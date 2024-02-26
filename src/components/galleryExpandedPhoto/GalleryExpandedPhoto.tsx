"use client";

import { useGalleryContextState } from "@/hooks/useGalleryContextState";
import { GalleryExpandedPhotoProps } from "./GalleryExpandedPhoto.types";
import { getExpandedPhotoUrl } from "@/utils/getExpandedPhotoUrl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import { shimmerLoader } from "@/utils/getShimmerLoader";
import { Photo, PhotoSize } from "../masonryGallery/MasonryGallery.types";
import { useKeyPressEvent, useWindowSize } from "react-use";
import { useEffect } from "react";

const VERTICAL_PHOTO_WIDTH = 720;
const HORIZONTAL_PHOTO_WIDTH = 1920;
const VERTICAL_PHOTO_SCALE_PADDING = 0.2;
const HORIZONTAL_PHOTO_SCALE_PADDING = 0.4;
const NUMBER_OF_PRIORITY_PHOTOS = 15;

export const GalleryExpandedPhoto = ({
  photoId,
  allPhotos,
}: GalleryExpandedPhotoProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const {
    photoPosition,
    isPhotoLoaded,
    setIsPhotoLoaded,
    scrollPosition,
    resetPhotoDetails,
    setPhotoDetails,
  } = useGalleryContextState();

  const handleCloseExpandedMode = () => {
    router.back();
    resetPhotoDetails();
  };

  const currentPhotoIndexInArray = allPhotos.findIndex(
    (photo) => photo.photoId === photoId
  );

  const previousPhoto = allPhotos?.[currentPhotoIndexInArray - 1];
  const nextPhoto = allPhotos?.[currentPhotoIndexInArray + 1];

  const url = pathname.substring(0, pathname.lastIndexOf("/") + 1);

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
    router.replace(`${url}/${photoId}`, { scroll: false });
    setPhotoDetails({
      photoId,
      photoPosition: undefined,
    });
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

  useKeyPressEvent("Escape", () => {
    handleCloseExpandedMode();
  });

  if (!photoId) {
    return null;
  }

  const { width, height, size, description } =
    (allPhotos.find((photo) => photo.photoId === photoId) as Photo) ?? {};

  const photoCenterXPosition =
    windowWidth / 2 - (photoPosition?.x ?? 0) - width / 2;
  const photoCenterYPosition =
    windowHeight / 2 - ((photoPosition?.y ?? 0) - scrollPosition) - height / 2;

  const xMaxScale = windowWidth / width;
  const yMaxScale = windowHeight / height;

  const maxScale =
    Math.min(xMaxScale, yMaxScale) -
    (size === PhotoSize.VERTICAL
      ? VERTICAL_PHOTO_SCALE_PADDING
      : HORIZONTAL_PHOTO_SCALE_PADDING);

  const maxPhotoHeight = height * maxScale;
  const maxPhotoWidth = width * maxScale;

  const onLoadedImage = (image: HTMLImageElement) => {
    setIsPhotoLoaded(true);

    if (photoPosition) {
      image.classList.remove("opacity-0");
      image.style.setProperty(
        "transform",
        `translate(${photoCenterXPosition}px, ${photoCenterYPosition}px) scale(${maxScale})`
      );
    }
  };

  return (
    <div
      className={clsx(
        "transition-opacity duration-[0.5s] fixed top-0 left-0 w-full h-full bg-black/90 z-40 !mt-0 md:p-8 cursor-pointer",
        !isPhotoLoaded && "opacity-0"
      )}
      onClick={handleCloseExpandedMode}>
      <div
        className="relative text-red-600 w-full h-full flex justify-center z-50"
        onKeyDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
        {photoPosition && (
          <Image
            unoptimized
            alt={description}
            style={{
              transform: "translate3d(0, 0, 0)",
              objectFit: "contain",
              ...(photoPosition
                ? {
                    top: (photoPosition?.y ?? 0) - scrollPosition,
                    left: photoPosition?.x ?? 0,
                  }
                : {}),
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
            className={clsx(
              "rounded-lg transition-all duration-[0.7s]",
              photoPosition && "fixed opacity-0"
            )}
            onLoadingComplete={onLoadedImage}
            priority
          />
        )}
        {!photoPosition && (
          <Image
            unoptimized
            alt={description}
            style={{
              transform: "translate3d(0, 0, 0)",
              objectFit: "contain",
            }}
            src={getExpandedPhotoUrl(
              photoId,
              size !== PhotoSize.VERTICAL
                ? HORIZONTAL_PHOTO_WIDTH
                : VERTICAL_PHOTO_WIDTH
            )}
            width={maxPhotoWidth}
            height={maxPhotoHeight}
            placeholder={`data:image/svg+xml;base64,${shimmerLoader}`}
            className={clsx("rounded-lg relative")}
            onLoadingComplete={onLoadedImage}
            priority={currentPhotoIndexInArray <= NUMBER_OF_PRIORITY_PHOTOS}
          />
        )}
      </div>
    </div>
  );
};

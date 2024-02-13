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

export const GalleryExpandedPhoto = ({
  photoId,
  photos: allPhotos,
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

  useEffect(() => {
    if (previousPhoto) {
      router.prefetch(`/cars/${previousPhoto.photoId}`);
    }
  }, [previousPhoto, router]);

  useEffect(() => {
    if (nextPhoto) {
      router.prefetch(`/cars/${nextPhoto.photoId}`);
    }
  }, [nextPhoto, router]);

  const changePhoto = (photoId: string) => {
    router.replace(`${pathname}?photo=${photoId}`, { scroll: false });
    setPhotoDetails({
      photoId,
      photoPosition,
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

  const { width, height, size, description } = allPhotos?.find(
    (photo) => photo.photoId === photoId
  ) as Photo;

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

  const onLoadedImage = (image: HTMLImageElement) => {
    setIsPhotoLoaded(true);

    if (photoPosition) {
      image.classList.remove("opacity-0");
      image.style.setProperty(
        "transform",
        `translate(${photoCenterXPosition}px, ${photoCenterYPosition}px) scale(${maxScale})`
      );
    } else {
      image.style.setProperty("transform", `scale(${maxScale})`);
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
        className="relative w-full h-full flex justify-center z-50"
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
            top: (photoPosition?.y ?? 0) - scrollPosition,
            left: photoPosition?.x ?? 0,
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
            photoPosition ? "fixed opacity-0" : "relative"
          )}
          onLoadingComplete={onLoadedImage}
          priority
        />
      </div>
    </div>
  );
};

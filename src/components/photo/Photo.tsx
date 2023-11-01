"use client";

import Image from "next/image";
import { PhotoProps } from "./Photo.types";
import { PhotoSize } from "../masonryGallery/MasonryGallery.types";
import { useState } from "react";
import { ExpandedPhoto } from "./expandedPhoto/ExpandedPhoto";
import { PhotoDetails } from "./photoDetails/PhotoDetails";
import { shimmerLoader } from "@/utils/getShimmerLoader";

const PHOTO_HEIGHT = 540;
const PHOTO_VERTICAL_WIDTH = 490;
const PHOTO_HORIZONTAL_WIDTH = 960;

export const Photo = (photoProps: PhotoProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  return (
    <>
      {isPhotoExpanded && (
        <ExpandedPhoto
          {...photoProps}
          closeExpandedMode={() => setIsPhotoExpanded(false)}
        />
      )}
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        <Image
          key={photoProps.photoId}
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${photoProps.photoId}.webp`}
          alt={photoProps.description}
          width={
            photoProps.size === PhotoSize.VERTICAL
              ? PHOTO_VERTICAL_WIDTH
              : PHOTO_HORIZONTAL_WIDTH
          }
          height={PHOTO_HEIGHT}
          loading="lazy"
          placeholder={`data:image/svg+xml;base64,${shimmerLoader}`}
          className="border border-white/50 rounded-lg cursor-pointer"
        />
        {isHovering && (
          <PhotoDetails
            photo={photoProps}
            onExpandPhoto={() => setIsPhotoExpanded(true)}
          />
        )}
      </div>
    </>
  );
};

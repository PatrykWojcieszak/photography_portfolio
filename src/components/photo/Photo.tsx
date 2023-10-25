"use client";

import Image from "next/image";
import { PhotoProps } from "./Photo.types";
import { PhotoSize } from "../masonryGallery/MasonryGallery.types";
import { useState } from "react";
import { ExpandedPhoto } from "./expandedPhoto/ExpandedPhoto";
import { PhotoDetails } from "./photoDetails/PhotoDetails";

const PHOTO_HEIGHT = 540;
const PHOTO_VERTICAL_WIDTH = 490;
const PHOTO_HORIZONTAL_WIDTH = 960;

export const Photo = ({ alt, photoId, size, large, small }: PhotoProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  return (
    <>
      {isPhotoExpanded && (
        <ExpandedPhoto
          alt={alt}
          photoId={photoId}
          size={size}
          large={large}
          small={small}
          closeExpandedMode={() => setIsPhotoExpanded(false)}
        />
      )}
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        <Image
          key={photoId}
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${photoId}.webp`}
          alt={alt}
          width={
            size === PhotoSize.VERTICAL
              ? PHOTO_VERTICAL_WIDTH
              : PHOTO_HORIZONTAL_WIDTH
          }
          height={PHOTO_HEIGHT}
          loading="lazy"
          placeholder="blur"
          blurDataURL={small}
          className="rounded-lg"
        />
        {isHovering && (
          <PhotoDetails onExpandPhoto={() => setIsPhotoExpanded(true)} />
        )}
      </div>
    </>
  );
};

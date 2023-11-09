"use client";

import Image from "next/image";
import { PhotoProps } from "./Photo.types";
import { useState } from "react";
import { ExpandedPhoto } from "./expandedPhoto/ExpandedPhoto";
import { PhotoDetails } from "./photoDetails/PhotoDetails";
import { shimmerLoader } from "@/utils/getShimmerLoader";
import { Spinner } from "../spinner/Spinner";

export const Photo = (photoProps: PhotoProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);

  const onCloseExpandedPhoto = () => {
    setIsPhotoExpanded(false);
    setIsPhotoLoaded(false);
  };

  return (
    <div>
      {isPhotoExpanded && (
        <ExpandedPhoto
          {...photoProps}
          isPhotoLoaded={isPhotoLoaded}
          onPhotoLoaded={setIsPhotoLoaded}
          closeExpandedMode={onCloseExpandedPhoto}
        />
      )}
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        <Image
          unoptimized
          key={photoProps.photoId}
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_280/${photoProps.photoId}.webp`}
          alt={photoProps.description}
          width={photoProps.width}
          height={photoProps.height}
          loading="lazy"
          placeholder={`data:image/svg+xml;base64,${shimmerLoader}`}
          className="border border-white/50 rounded-lg cursor-pointer"
        />
        {isPhotoExpanded && !isPhotoLoaded && <Spinner />}
        {isHovering && (
          <PhotoDetails
            photo={photoProps}
            onExpandPhoto={() => setIsPhotoExpanded(true)}
          />
        )}
      </div>
    </div>
  );
};

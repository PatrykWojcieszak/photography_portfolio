"use client";

import Image from "next/image";
import { PhotoProps } from "./Photo.types";
import { useRef, useState } from "react";
import { ExpandedPhoto } from "./expandedPhoto/ExpandedPhoto";
import { PhotoDetails } from "./photoDetails/PhotoDetails";
import { shimmerLoader } from "@/utils/getShimmerLoader";
import { Spinner } from "../spinner/Spinner";
import { useGetScrollPosition } from "@/hooks/useGetScrollPosition";

export const Photo = (photoProps: PhotoProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);

  const { scrollPosition } = useGetScrollPosition();

  const photoRef = useRef<HTMLDivElement>(null);

  const onCloseExpandedPhoto = () => {
    setIsPhotoExpanded(false);
    setIsPhotoLoaded(false);
  };

  const positionY = photoRef.current?.offsetTop ?? 0;
  const positionX = photoRef.current?.offsetLeft ?? 0;

  return (
    <div>
      {isPhotoExpanded && (
        <ExpandedPhoto
          {...photoProps}
          isPhotoLoaded={isPhotoLoaded}
          onPhotoLoaded={setIsPhotoLoaded}
          closeExpandedMode={onCloseExpandedPhoto}
          positionX={positionX}
          positionY={positionY}
          scrollPosition={scrollPosition}
        />
      )}
      <div
        ref={photoRef}
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

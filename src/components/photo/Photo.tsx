"use client";

import Image from "next/image";
import { PhotoProps } from "./Photo.types";
import { useRef, useState } from "react";
import { ExpandedPhoto } from "./expandedPhoto/ExpandedPhoto";
import { PhotoDetails } from "./photoDetails/PhotoDetails";
import { shimmerLoader } from "@/utils/getShimmerLoader";
import { Spinner } from "../spinner/Spinner";
import { useGetScrollPosition } from "@/hooks/useGetScrollPosition";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Photo = ({ photo, photos }: PhotoProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { scrollPosition } = useGetScrollPosition();

  const photoId = searchParams.get("photo");

  const [isHovering, setIsHovering] = useState(false);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);

  const photoRef = useRef<HTMLDivElement>(null);

  const isPhotoExpanded = photoId === photo.photoId;

  const onCloseExpandedPhoto = () => {
    router.replace(pathname);
    setIsPhotoLoaded(false);
  };

  const positionY = photoRef.current?.offsetTop ?? 0;
  const positionX = photoRef.current?.offsetLeft ?? 0;

  return (
    <div>
      {isPhotoExpanded && (
        <ExpandedPhoto
          {...photo}
          isPhotoLoaded={isPhotoLoaded}
          onPhotoLoaded={setIsPhotoLoaded}
          closeExpandedMode={onCloseExpandedPhoto}
          positionX={positionX}
          positionY={positionY}
          scrollPosition={scrollPosition}
          photos={photos}
        />
      )}
      <div
        ref={photoRef}
        className="relative flex items-center justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        <Image
          unoptimized
          key={photo.photoId}
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_280/${photo.photoId}.webp`}
          alt={photo.description}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          placeholder={`data:image/svg+xml;base64,${shimmerLoader}`}
          className="border border-white/50 rounded-lg cursor-pointer"
        />
        {isPhotoExpanded && !isPhotoLoaded && <Spinner />}
        {isHovering && (
          <PhotoDetails
            photo={photo}
            onExpandPhoto={() => {
              router.replace(`${pathname}?photo=${photo.photoId}`);
            }}
          />
        )}
      </div>
    </div>
  );
};

"use client";

import Image from "next/image";
import { PhotoProps } from "./Photo.types";
import { useRef, useState } from "react";
import { PhotoDetails } from "./photoDetails/PhotoDetails";
import { shimmerLoader } from "@/utils/getShimmerLoader";
import { Spinner } from "../spinner/Spinner";
import { useScroll } from "react-use";
import { useGalleryContextState } from "@/hooks/useGalleryContextState";
import Link from "next/link";

export const Photo = ({ photo, masonryGalleryRef }: PhotoProps) => {
  const { y: scrollPosition } = useScroll(masonryGalleryRef);
  const { setPhotoDetails, isPhotoLoaded, setScrollPosition, selectedPhotoId } =
    useGalleryContextState();

  const [isHovering, setIsHovering] = useState(false);

  const photoRef = useRef<HTMLDivElement>(null);

  const positionY = photoRef.current?.offsetTop ?? 0;
  const positionX = photoRef.current?.offsetLeft ?? 0;

  const handleSelectPhoto = () => {
    setScrollPosition(scrollPosition);
    setPhotoDetails({
      photoId: photo.photoId,
      photoPosition: {
        x: positionX,
        y: positionY,
      },
    });
  };

  return (
    <Link
      href={`/?photo=${photo.photoId}`}
      as={`/cars/${photo.photoId}`}
      shallow>
      <div
        ref={photoRef}
        className="relative flex items-center justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        <Image
          unoptimized
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_280/${photo.photoId}.webp`}
          alt={photo.description}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          style={{ transform: "translate3d(0, 0, 0)" }}
          placeholder={`data:image/svg+xml;base64,${shimmerLoader}`}
          className="border border-white/50 rounded-lg cursor-pointer"
        />
        {selectedPhotoId === photo.photoId && !isPhotoLoaded && <Spinner />}
        {isHovering && (
          <PhotoDetails photo={photo} onExpandPhoto={handleSelectPhoto} />
        )}
      </div>
    </Link>
  );
};

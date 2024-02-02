"use client";

import Image from "next/image";
import { PhotoProps } from "./Photo.types";
import { useRef, useState } from "react";
import { ExpandedPhoto } from "./expandedPhoto/ExpandedPhoto";
import { PhotoDetails } from "./photoDetails/PhotoDetails";
import { shimmerLoader } from "@/utils/getShimmerLoader";
import { Spinner } from "../spinner/Spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useScroll } from "react-use";

export const Photo = ({ photo, photos, masonryGalleryRef }: PhotoProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { y: scrollPosition } = useScroll(masonryGalleryRef);

  const photoId = searchParams.get("photo");

  const [isHovering, setIsHovering] = useState(false);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);

  const photoRef = useRef<HTMLDivElement>(null);

  const isPhotoExpanded = photoId === photo.photoId;

  const onCloseExpandedPhoto = () => {
    router.replace(pathname, { scroll: false });
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
          <Link
            href={`${pathname}?photo=${photo.photoId}`}
            replace
            scroll={false}>
            <PhotoDetails photo={photo} onExpandPhoto={() => {}} />
          </Link>
        )}
      </div>
    </div>
  );
};

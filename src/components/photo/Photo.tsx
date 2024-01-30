"use client";

import Image from "next/image";
import { PhotoProps } from "./Photo.types";
import { useEffect, useRef, useState } from "react";
import { ExpandedPhoto } from "./expandedPhoto/ExpandedPhoto";
import { PhotoDetails } from "./photoDetails/PhotoDetails";
import { shimmerLoader } from "@/utils/getShimmerLoader";
import { Spinner } from "../spinner/Spinner";
import { useGetScrollPosition } from "@/hooks/useGetScrollPosition";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useScrollBlock } from "@/hooks/useDisableScroll";
import Link from "next/link";

export const Photo = ({ photo, photos }: PhotoProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { scrollPosition } = useGetScrollPosition();
  const [block, allow] = useScrollBlock();

  const photoId = searchParams.get("photo");
  console.log("scrollPosition", scrollPosition);
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

  useEffect(() => {
    if (isPhotoExpanded) {
      block();
    } else {
      allow();
    }
  }, [allow, block, isPhotoExpanded]);

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
            <PhotoDetails
              photo={photo}
              onExpandPhoto={() => {
                // router.replace(`${pathname}?photo=${photo.photoId}`, {
                //   scroll: false,
                // });
              }}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

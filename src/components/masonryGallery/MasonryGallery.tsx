"use client";

import { MasonryGalleryProps, Photo } from "./MasonryGallery.types";
import { Photo as PhotoComponent } from "../photo/Photo";
import { useMeasure } from "react-use";
import { useEffect, useMemo, useRef } from "react";
import { PHOTO_WIDTH } from "@/constants";
import { useGalleryContextState } from "@/hooks/useGalleryContextState";

export const MasonryGallery = ({ photos: allPhotos }: MasonryGalleryProps) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const masonryGalleryRef = useRef<HTMLDivElement>(null);
  const { setAllPhotos } = useGalleryContextState();

  useEffect(() => setAllPhotos(allPhotos), [allPhotos, setAllPhotos]);

  const photoColumns = useMemo(() => {
    const numberOfColumns = Math.ceil(width / PHOTO_WIDTH);

    return allPhotos
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .reduce<Record<string, Photo[]>>((photos, photo, index) => {
        const columnIndex = index % numberOfColumns;

        photos[columnIndex] = [...(photos[columnIndex] ?? []), photo];

        return photos;
      }, {});
  }, [allPhotos, width]);

  return (
    <div
      ref={masonryGalleryRef}
      style={{ height: `calc(100vh - 100px)` }}
      className="overflow-y-auto scrollbar-thin">
      <div ref={ref} className="flex gap-3 justify-between">
        {Object.values(photoColumns).map((photos, index) => (
          <div key={index} className="flex flex-col gap-3">
            {photos.map((photo) => (
              <PhotoComponent
                key={photo.photoId}
                photo={photo}
                photos={allPhotos}
                masonryGalleryRef={masonryGalleryRef}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

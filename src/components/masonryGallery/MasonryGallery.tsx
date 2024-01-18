"use client";

import { MasonryGalleryProps, Photo } from "./MasonryGallery.types";
import { Photo as PhotoComponent } from "../photo/Photo";
import { useMeasure } from "react-use";
import { useMemo } from "react";
import { PHOTO_WIDTH } from "@/constants";

export const MasonryGallery = ({ photos: allPhotos }: MasonryGalleryProps) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

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
    <div ref={ref} className="flex gap-3 justify-between">
      {Object.values(photoColumns).map((photos, index) => (
        <div key={index} className="flex flex-col gap-3">
          {photos.map((photo) => (
            <PhotoComponent
              key={photo.photoId}
              photo={photo}
              photos={allPhotos}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

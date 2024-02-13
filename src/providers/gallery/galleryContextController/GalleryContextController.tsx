"use client";

import { ReactNode, useState } from "react";
import { GalleryStateContext } from "../galleryContext/GalleryContext";
import {
  PhotoDetails,
  PhotoPosition,
} from "../galleryContext/GalleryContext.types";
import { Photo } from "@/components/masonryGallery/MasonryGallery.types";

export const GalleryContextController = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<
    string | undefined | null
  >(undefined);
  const [selectedPhotoPosition, setSelectedPhotoPosition] = useState<
    PhotoPosition | undefined
  >(undefined);
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  console.log("allPhotos", allPhotos);
  const handlePhotoDetailsChange = (photoDetails: PhotoDetails) => {
    setSelectedPhotoId(photoDetails.photoId);
    setSelectedPhotoPosition(photoDetails.photoPosition);
  };

  const handleResetPhotoDetails = () => {
    setSelectedPhotoId(undefined);
    setSelectedPhotoPosition(undefined);
    setIsPhotoLoaded(false);
    setScrollPosition(0);
  };

  return (
    <GalleryStateContext.Provider
      value={{
        selectedPhotoId,
        allPhotos,
        setAllPhotos,
        isPhotoLoaded,
        setIsPhotoLoaded,
        setScrollPosition,
        scrollPosition,
        resetPhotoDetails: handleResetPhotoDetails,
        photoPosition: selectedPhotoPosition,
        setPhotoDetails: handlePhotoDetailsChange,
      }}>
      {children}
    </GalleryStateContext.Provider>
  );
};

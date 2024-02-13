import { Photo } from "@/components/masonryGallery/MasonryGallery.types";

export type GalleryContext = {
  selectedPhotoId?: string | null;
  photoPosition?: PhotoPosition;
  isPhotoLoaded: boolean;
  scrollPosition: number;
  setScrollPosition: (yPosition: number) => void;
  setIsPhotoLoaded: (isLoaded: boolean) => void;
  setPhotoDetails: (photoDetails: PhotoDetails) => void;
  resetPhotoDetails: () => void;
};

export type PhotoPosition = {
  x: number;
  y: number;
};

export type PhotoDetails = {
  photoId?: string | null;
  photoPosition?: PhotoPosition;
};

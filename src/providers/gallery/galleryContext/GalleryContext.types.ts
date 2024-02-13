import { Photo } from "@/components/masonryGallery/MasonryGallery.types";

export type GalleryContext = {
  selectedPhotoId?: string | null;
  photoPosition?: PhotoPosition;
  allPhotos: Photo[];
  isPhotoLoaded: boolean;
  scrollPosition: number;
  setScrollPosition: (yPosition: number) => void;
  setIsPhotoLoaded: (isLoaded: boolean) => void;
  setPhotoDetails: (photoDetails: PhotoDetails) => void;
  setAllPhotos: (photos: Photo[]) => void;
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

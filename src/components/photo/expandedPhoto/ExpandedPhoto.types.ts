import { Photo } from "@/components/masonryGallery/MasonryGallery.types";

export type ExpandedPhotoProps = Photo & {
  isPhotoLoaded: boolean;
  positionX?: number;
  positionY?: number;
  scrollPosition: number;
  photos: Photo[];
  onPhotoLoaded: (isLoaded: boolean) => void;
  closeExpandedMode: () => void;
};

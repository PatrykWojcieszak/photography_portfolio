import { Photo } from "@/components/masonryGallery/MasonryGallery.types";

export type ExpandedPhotoProps = Photo & {
  isPhotoLoaded: boolean;
  positionX?: number;
  positionY?: number;
  scrollPosition: number;
  onPhotoLoaded: (isLoaded: boolean) => void;
  closeExpandedMode: () => void;
};

import { Photo } from "@/components/masonryGallery/MasonryGallery.types";

export type ExpandedPhotoProps = Photo & {
  isPhotoLoaded: boolean;
  onPhotoLoaded: (isLoaded: boolean) => void;
  closeExpandedMode: () => void;
};

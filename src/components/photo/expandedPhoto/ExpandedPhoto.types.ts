import { Photo } from "@/components/masonryGallery/MasonryGallery.types";

export type ExpandedPhotoProps = Photo & {
  closeExpandedMode: () => void;
};

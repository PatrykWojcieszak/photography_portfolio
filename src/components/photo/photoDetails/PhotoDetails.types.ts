import { Photo } from "../../masonryGallery/MasonryGallery.types";

export type PhotoDetailsProps = {
  photo: Photo;
  onExpandPhoto: () => void;
};

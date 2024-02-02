import { RefObject } from "react";
import { Photo } from "../masonryGallery/MasonryGallery.types";

export type PhotoProps = {
  photo: Photo;
  photos: Photo[];
  masonryGalleryRef: RefObject<HTMLDivElement>;
};

import { createContext } from "react";
import { GalleryContext } from "./GalleryContext.types";

export const GalleryStateContext = createContext<GalleryContext>({
  isPhotoLoaded: false,
  scrollPosition: 0,
  allPhotos: [],
  resetPhotoDetails: () => {},
  setPhotoDetails: () => {},
  setAllPhotos: () => {},
  setIsPhotoLoaded: () => {},
  setScrollPosition: () => {},
});

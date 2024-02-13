import { GalleryStateContext } from "@/providers/gallery/galleryContext/GalleryContext";
import { GalleryContext } from "./../providers/gallery/galleryContext/GalleryContext.types";
import { useContext } from "react";

export const useGalleryContextState: () => GalleryContext = () => {
  const context = useContext(GalleryStateContext);

  if (context === undefined) {
    throw new Error(
      "useGalleryContextState must be used within an GalleryContextController"
    );
  }

  return context;
};

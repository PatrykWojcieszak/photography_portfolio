import { MasonryGalleryProps } from "./MasonryGallery.types";
import { Photo } from "../photo/Photo";

export const MasonryGallery = ({ photos }: MasonryGalleryProps) => {
  return (
    <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 xl:columns-5 [&>div:not(:first-child)]:mt-8">
      {photos.map((photo) => (
        <Photo key={photo.photoId} {...photo} />
      ))}
    </div>
  );
};

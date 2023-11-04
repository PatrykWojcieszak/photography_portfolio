import { MasonryGalleryProps } from "./MasonryGallery.types";
import { Photo } from "../photo/Photo";

export const MasonryGallery = ({ photos }: MasonryGalleryProps) => {
  return (
    <div className="columns-7 sm:columns-2 md:columns-3 lg:columns-5 xl:columns-6 2xl:columns-8 [&>div:not(:first-child)]:mt-5">
      {photos.map((photo) => (
        <Photo key={photo.photoId} {...photo} />
      ))}
    </div>
  );
};

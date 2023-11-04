import { MasonryGalleryProps } from "./MasonryGallery.types";
import { Photo } from "../photo/Photo";

export const MasonryGallery = ({ photos }: MasonryGalleryProps) => {
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 3xl:columns-8 4xl:columns-9 5xl:columns-11 [&>div:not(:first-child)]:mt-5">
      {photos
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((photo) => (
          <Photo key={photo.photoId} {...photo} />
        ))}
    </div>
  );
};

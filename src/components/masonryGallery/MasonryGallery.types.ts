export type MasonryGalleryProps = {
  photos: Photo[];
};

export type Photo = {
  size: PhotoSize;
  photoId: string;
  alt: string;
};

export enum PhotoSize {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
  SQUARE = "square",
}

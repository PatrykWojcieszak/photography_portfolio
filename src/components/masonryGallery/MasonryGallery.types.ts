export type MasonryGalleryProps = {
  photos: Photo[];
};

export type Photo = {
  description: string;
  size: PhotoSize;
  photoId: string;
  camera: string;
  exposureTime: number;
  fNumber: number;
  focalLength: number;
  iso: number;
  lens: string;
  width: number;
  height: number;
  createdAt: string;
};

export enum PhotoSize {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
  SQUARE = "square",
}

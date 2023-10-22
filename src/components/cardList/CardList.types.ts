export type PhotographyCollection = {
  collectionName: string;
  name: string;
  thumbnailId: string;
  isGallery?: boolean;
};

export type CardListProps = {
  cards: PhotographyCollection[];
};

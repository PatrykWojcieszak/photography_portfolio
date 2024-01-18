import { ImageCard } from "../imageCard/ImageCard";
import { CardListProps } from "./CardList.types";

export const CardList = ({ cards, categoryName }: CardListProps) => {
  return (
    <main className="flex-[2] py-6">
      <div className="flex items-center gap-12 justify-center flex-wrap h-full">
        {cards.map((card) => (
          <ImageCard
            key={card.collectionName}
            thumbnailId={card.thumbnailId}
            alt={`${card.name} Thumbnail`}
            title={card.name}
            collectionName={card.collectionName}
            isGallery={card.isGallery}
            categoryName={categoryName}
          />
        ))}
      </div>
    </main>
  );
};

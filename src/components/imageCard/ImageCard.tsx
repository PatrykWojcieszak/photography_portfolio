import Image from "next/image";
import { ImageCardProps } from "./ImageCard.types";
import Link from "next/link";

const CARD_HEIGHT = 500;
const CARD_WIDTH = 333;

export const ImageCard = ({
  thumbnailId,
  alt,
  title,
  collectionName,
  isGallery,
}: ImageCardProps) => {
  return (
    <Link href={`/${collectionName}${isGallery ? "/gallery" : ""}`}>
      <div className="relative transition ease-in-out duration-100 hover:brightness-125">
        <Image
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,h_500/${thumbnailId}.webp`}
          alt={alt}
          height={CARD_HEIGHT}
          width={CARD_WIDTH}
          className="border border-white/50 rounded-lg cursor-pointer"
        />
        <span className="absolute bottom-0 text-gray text-center w-full uppercase bg-black/60 p-3">
          {title}
        </span>
      </div>
    </Link>
  );
};

import Image from "next/image";
import { ImageCardProps } from "./ImageCard.types";

export const ImageCard = ({ src, alt, title }: ImageCardProps) => {
  return (
    <div className="relative transition ease-in-out duration-100 hover:brightness-125">
      <Image
        src={src}
        alt={alt}
        height={500}
        className="border border-white/50 rounded-lg cursor-pointer"
      />
      <span className="absolute bottom-0 text-gray text-center w-full uppercase bg-black/60 p-3">
        {title}
      </span>
    </div>
  );
};

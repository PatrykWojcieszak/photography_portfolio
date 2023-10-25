import Image from "next/image";
import { ExpandedPhotoProps } from "./ExpandedPhoto.types";

export const ExpandedPhoto = ({
  alt,
  closeExpandedMode,
  large,
  small,
}: ExpandedPhotoProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/90 z-40 !mt-0 p-16 cursor-pointer"
      onClick={closeExpandedMode}>
      <div className="relative w-full h-full flex items-start justify-center z-50">
        <Image
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
          src={large}
          // placeholder="blur"
          loading="lazy"
          // blurDataURL={small}
        />
      </div>
    </div>
  );
};

import Image from "next/image";
import ExpandIcon from "../../../../public/expandIcon.svg";
import { PhotoDetailsProps } from "./PhotoDetails.types";

export const PhotoDetails = ({
  onExpandPhoto,
  photo: { camera, exposureTime, fNumber, focalLength, iso, lens, description },
}: PhotoDetailsProps) => {
  const focalLengthText = !!focalLength && `${focalLength}mm`;
  const isoText = !!iso && `${iso} ISO`;
  const fNumberText = !!fNumber && `F ${fNumber}`;
  const exposureTimeText = !!exposureTime && `1/${1 / exposureTime}s`;

  const photoDetails = [focalLengthText, isoText, fNumberText, exposureTimeText]
    .filter(Boolean)
    .join(" | ");

  return (
    <>
      <div
        onClick={onExpandPhoto}
        className="rounded-lg absolute top-0 left-0 bg-black/80 w-full h-full cursor-pointer p-2">
        <div className="flex flex-col gap-2">
          {description && <h4 className="text-white">{description}</h4>}
          {camera && <h5 className="text-gray text-xs">{camera}</h5>}
          {lens && <h5 className="text-gray text-xs">{lens}</h5>}
          {photoDetails.length && (
            <h5 className="text-gray text-xs">{photoDetails}</h5>
          )}
        </div>
      </div>
      <Image
        onClick={onExpandPhoto}
        className="absolute cursor-pointer"
        src={ExpandIcon}
        alt="Expand Icon"
      />
    </>
  );
};

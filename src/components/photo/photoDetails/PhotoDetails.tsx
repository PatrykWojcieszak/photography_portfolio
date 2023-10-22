import Image from "next/image";
import ExpandIcon from "../../../../public/expandIcon.svg";
import { PhotoDetailsProps } from "./PhotoDetails.types";

export const PhotoDetails = ({ onExpandPhoto }: PhotoDetailsProps) => {
  return (
    <>
      <div
        onClick={onExpandPhoto}
        className="rounded-lg absolute top-0 left-0 bg-black/80 w-full h-full cursor-pointer p-2">
        <div className="flex flex-col gap-2">
          <h4 className="text-white">Jaskinia Mylna</h4>
          <h5 className="text-gray text-xs">Sony A7 III</h5>
          <h5 className="text-gray text-xs">Sigma 24-70 F2.8 DG ART</h5>
          <h5 className="text-gray text-xs">24mm | 64 ISO | F 2.8 | 1/300s</h5>
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

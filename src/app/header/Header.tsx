import Image from "next/image";
import InstagramIcon from "../../../public/instagramIcon.svg";
import Link from "next/link";

const ICON_SIZE = 32;

export const Header = () => {
  return (
    <div className="flex justify-between items-center h-16 pt-6">
      <h1 className="text-white text-2xl">Patryk Wojcieszak</h1>
      <div className="flex gap-4">
        <Link
          href="https://www.instagram.com/p.w_shots"
          rel="noopener noreferrer"
          target="_blank">
          <Image
            src={InstagramIcon}
            alt="Instagram Icon"
            width={ICON_SIZE}
            className="cursor-pointer"
          />
        </Link>
        <Link
          href="https://www.instagram.com/patryk_wojcieszak/"
          rel="noopener noreferrer"
          target="_blank">
          <Image
            src={InstagramIcon}
            alt="Instagram Icon"
            width={ICON_SIZE}
            className="cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

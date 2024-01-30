"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import InstagramIcon from "public/instagramIcon.svg";
import BackIcon from "public/backArrow.svg";
import Link from "next/link";

const INSTAGRAM_ICON_SIZE = 32;
const BACK_ICON_SIZE = 26;

export const Header = () => {
  const router = useRouter();
  const location = usePathname();

  return (
    <div className="sticky top-0 bg-black flex justify-between items-center h-20 w-full z-30 py-5">
      <div className="flex items-center gap-3">
        {location !== "/" && (
          <Image
            onClick={() => router.back()}
            src={BackIcon}
            alt="Instagram Icon"
            width={BACK_ICON_SIZE}
            className="cursor-pointer rounded-full bg-white"
          />
        )}
        <Link href="/">
          <h1 className="text-white text-2xl cursor-pointer">
            Patryk Wojcieszak
          </h1>
        </Link>
      </div>
      <div className="flex gap-4">
        <Link
          href="https://www.instagram.com/p.w_shots"
          rel="noopener noreferrer"
          target="_blank">
          <Image
            src={InstagramIcon}
            alt="Instagram Icon"
            width={INSTAGRAM_ICON_SIZE}
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
            width={INSTAGRAM_ICON_SIZE}
            className="cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

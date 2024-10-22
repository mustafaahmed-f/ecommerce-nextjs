import {
  FavoriteBorder,
  KeyboardArrowDownOutlined,
  Person2Outlined,
  Segment,
  ShoppingBag,
} from "@mui/icons-material";
// import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

import Image from "next/image";
import Link from "next/link";
import CategoriesOptions from "./CategoriesOptions";
import LogoAndSearch from "./LogoAndSearch";
import PagesLinks from "./PagesLinks";
import SocialLinks from "./SocialLinks";

function DesktopHeader() {
  return (
    <div className="hidden sm:block">
      {/* ////First section for logo, search and main pages//// */}

      <div className="desktop-header-first-section">
        <LogoAndSearch />

        <div className="flex items-center sm:justify-between md:justify-end md:gap-32">
          <PagesLinks />

          <SocialLinks />
        </div>
      </div>

      {/* ////Second section for secondary pages ,favourites and cart//// */}

      <div className="grid sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] bg-black text-white py-3">
        <div className="flex items-center justify-center sm:gap-10 md:gap-12">
          <div className="flex gap-2 cursor-pointer hover:text-sky-600">
            <div className="-scale-x-100">
              <Segment />
            </div>
            <p className="font-semibold">Categories</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="cursor-pointer hover:text-sky-600">
              USD
              <span>
                <KeyboardArrowDownOutlined />
              </span>
            </p>
            <p className="cursor-pointer hover:text-sky-600">
              English
              <span>
                <KeyboardArrowDownOutlined />
              </span>
            </p>
          </div>
        </div>
        <div className="items-center  justify-center md:flex sm:hidden border-s-[1px] border-s-neutral-400">
          <Image
            alt="header photo"
            src="/header photo.png"
            className="w-16 h-16 "
            width={300}
            height={300}
          />
          <div>
            <p>Weekly Men&apos;s Toiletries Coupons.</p>
            <p className="text-neutral-400">
              We extend exclusive discounts to our male clientele
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center sm:gap-4 md:gap-6 border-s-[1px] border-s-neutral-400">
          <div className="flex items-center gap-2 cursor-pointer hover:text-sky-600">
            <Person2Outlined />
            <Link href="">Sign in</Link>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-sky-600">
            <FavoriteBorder />
            <Link href="">Favorites</Link>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-sky-600">
            <ShoppingBag />
            <Link href="">Cart</Link>
            <span className="flex items-center justify-center text-white bg-green-500 rounded-[50%] p-1 w-6 h-6">
              3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopHeader;

import { Shop } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

interface FirstMainSectionProps {}

function FirstMainSection({}: FirstMainSectionProps) {
  return (
    <div className="sm:grid hidden grid-cols-[1fr_2fr] gap-0 w-full ">
      <div className="relative">
        <div className="absolute right-0 flex-col hidden translate-x-1/2 translate-y-1/2 md:flex bottom-1/2">
          <div className="flex flex-col items-center justify-center gap-3 px-3 py-6 bg-white">
            <p className="font-semibold">Summer Essentials</p>
            <p className="text-red-500">20% off</p>
          </div>
          <div className="py-3 text-white relative bg-black px-9">
            16 may - 17 may
          </div>
        </div>
        <div className="">
          <Image
            width={500}
            height={500}
            alt="left"
            className=" w-full"
            src="/left.png"
            priority={true}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-white md:text-2xl sm:text-xl bg-sky-600">
        <p className="font-semibold">Kimonos, Caftans & Pareos</p>
        <p>Poolside glam included From $4.99</p>
        <button className="px-4 py-2 text-sm text-white rounded-sm cursor-pointer bg-sky-700 hover:text-sky-300">
          <div className="flex flex-row items-center justify-center gap-2 w-fit">
            <Shop />
            <span>SHOP NOW</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default FirstMainSection;

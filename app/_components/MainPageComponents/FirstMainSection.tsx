import ShopSVG from "@/app/_icons/ShopSVG";
import Image from "next/image";
import Link from "next/link";

interface FirstMainSectionProps {}

function FirstMainSection({}: FirstMainSectionProps) {
  return (
    <div className="hidden w-full grid-cols-[1fr_2fr] gap-0 sm:grid">
      <div className="relative">
        <div className="absolute bottom-1/2 right-0 hidden translate-x-1/2 translate-y-1/2 flex-col md:flex">
          <div className="flex flex-col items-center justify-center gap-3 bg-white px-3 py-6">
            <p className="font-semibold">Summer Essentials</p>
            <p className="text-red-500">20% off</p>
          </div>
          <div className="relative bg-black px-9 py-3 text-white">
            16 may - 17 may
          </div>
        </div>
        <div className="">
          <Image
            width={500}
            height={500}
            alt="left"
            className="w-full"
            src="/left.png"
            priority={true}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 bg-sky-600 text-white sm:text-xl md:text-2xl">
        <p className="font-semibold">Kimonos, Caftans & Pareos</p>
        <p>Poolside glam included From $4.99</p>
        <button className="cursor-pointer rounded-sm bg-sky-700 px-4 py-2 text-sm text-white hover:text-sky-300">
          <div className="flex w-fit flex-row items-center justify-center gap-2">
            <ShopSVG />
            <Link href="/products">SHOP NOW</Link>
          </div>
        </button>
      </div>
    </div>
  );
}

export default FirstMainSection;

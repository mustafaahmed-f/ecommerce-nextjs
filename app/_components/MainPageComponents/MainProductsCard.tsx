import { FavoriteBorder } from "@mui/icons-material";
import Image from "next/image";

function MainProductsCard() {
  return (
    <div className="flex flex-col shadow-[0px_0px_2px_3px_#F3F3F3]  min-w-48 cursor-pointer  rounded-md  flashSalesCard ">
      <div className=" overflow-hidden text-center">
        <Image
          width={300}
          height={300}
          alt="main product"
          className="w-full cardZoom"
          src="/top 100.png"
        />
      </div>
      <div className="flex flex-row items-center justify-between gap-2 p-2 sm:p-4 ">
        <div className="flex flex-col items-start justify-center gap-2 text-start ">
          <p className="text-sm font-bold text-black">Mango</p>
          <p className="text-xs text-textGrey">Shoulder bag-white</p>
          <div className="flex flex-row flex-wrap items-center justify-start gap-2">
            <div className="flex items-start justify-start text-sm">
              <p>⭐</p>
              <p>⭐</p>
              <p>⭐</p>
              <p>⭐</p>
            </div>
            <p className="text-textGrey">{"( 54 )"}</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-[2px] sm:gap-3 w-full">
            <p className="text-base text-red-600 sm:text-lg">$69.99</p>
            <p className="text-sm line-through text-textGrey sm:text-base">
              $129.99
            </p>
            <div className="sm:p-1 py-[2px] px-[1px] text-[10px] sm:text-sm text-xs text-red-600 rounded-md">
              <p>- 40%</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-center h-full ">
          <div className="text-black cursor-pointer hover:text-sky-500">
            <FavoriteBorder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainProductsCard;

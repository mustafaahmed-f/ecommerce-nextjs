import { Luggage } from "@mui/icons-material";
import Image from "next/image";

function TrendingMustHaveCard({ cardNum }: { cardNum: number }) {
  return (
    <div className="relative w-full rounded-md min-w-80">
      {cardNum % 2 !== 0 && (
        <div className="absolute flex items-center justify-center gap-1 p-1 sm:text-base text-[10px] text-white bg-green-500 rounded-md w-fit max-w-[70%] sm:max-w-full top-2 left-2">
          <Luggage fontSize="small" />
          <p className="capitalize">new arrival</p>
        </div>
      )}
      <div className="">
        <Image
          alt={`photo bag ${cardNum}`}
          width={300}
          height={300}
          className="w-full"
          src={`/trending must have ${cardNum}.png`}
        />
      </div>
      <div className="p-3 text-white bg-black">
        <div className="flex flex-row items-center justify-center gap-8 sm:justify-between sm:gap-0">
          <div className="flex flex-col items-start gap-2 text-sm sm:text-base">
            <p>Cool & Sexy Calvin Klein</p>
            <p className="text-sm text-textLowerGrey">Belt-Brown-Casual</p>
          </div>
          <button className="bg-transparent sm:text-base text-xs border-[1px] p-1 gap-1 sm:gap-2 whitespace-nowrap hover:text-sky-500 text-nowrap  border-white rounded-md flex items-center justify-start">
            <p>$89</p>
            <p className="capitalize text-start">shop now</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default TrendingMustHaveCard;

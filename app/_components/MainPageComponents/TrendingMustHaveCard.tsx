import { Luggage } from "@mui/icons-material";
import Image from "next/image";

function TrendingMustHaveCard({ product }: { product: any }) {
  let productPrice = product.price - product.price * (product.discount / 100);
  return (
    <div className="relative w-full rounded-md min-w-80 max-h-96">
      {product.id % 2 !== 0 && (
        <div className="absolute flex items-center justify-center gap-1 p-1 sm:text-base text-[10px] text-white bg-green-500 rounded-md w-fit max-w-[70%] sm:max-w-full top-2 left-2">
          <Luggage fontSize="small" />
          <p className="capitalize">new arrival</p>
        </div>
      )}
      <div className="">
        <Image
          alt={`${product.title}`}
          width={300}
          height={300}
          className="w-full max-h-[250px]"
          src={`${product.image}`}
        />
      </div>
      <div className="p-3 text-white bg-black">
        <div className="flex flex-row items-center justify-center gap-8 sm:justify-between sm:gap-0">
          <div className="flex flex-col items-start gap-2 text-sm sm:text-base">
            <p>{product.title}</p>
            <p className="text-sm text-textLowerGrey">{product.brand}</p>
          </div>
          <button className="bg-transparent sm:text-base text-xs border-[1px] p-1 gap-1 sm:gap-2 whitespace-nowrap hover:text-sky-500 text-nowrap  border-white rounded-md flex items-center justify-start">
            <p>{productPrice}</p>
            <p className="capitalize text-start">shop now</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default TrendingMustHaveCard;

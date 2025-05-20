import LuggageSVG from "@/app/_icons/LuggageSVG";
import Image from "next/image";

function TrendingMustHaveCard({ product }: { product: any }) {
  let productPrice = product.price - product.price * (product.discount / 100);
  return (
    <div className="relative flex h-full w-full min-w-80 flex-col justify-between rounded-md">
      {product.id % 2 !== 0 && (
        <div className="absolute left-2 top-2 flex w-fit max-w-[70%] items-center justify-center gap-1 rounded-md bg-green-500 p-1 text-[10px] text-white sm:max-w-full sm:text-base">
          <LuggageSVG />
          <p className="capitalize">new arrival</p>
        </div>
      )}

      <Image
        alt={`${product.title}`}
        width={300}
        height={300}
        className="max-h-[250px] w-full"
        src={`${product.image}`}
      />

      <div className="bg-black p-3 text-white">
        <div className="flex flex-row items-center justify-center gap-8 sm:justify-between sm:gap-0">
          <div className="flex flex-col items-start gap-2 text-sm sm:text-base">
            <p>{product.title}</p>
            <p className="text-sm text-textLowerGrey">{product.brand}</p>
          </div>
          <button className="flex items-center justify-start gap-1 whitespace-nowrap text-nowrap rounded-md border-[1px] border-white bg-transparent p-1 text-xs hover:text-sky-500 sm:gap-2 sm:text-base">
            <p>{productPrice}</p>
            <p className="text-start capitalize">shop now</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default TrendingMustHaveCard;

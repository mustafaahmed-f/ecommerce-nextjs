import ColorIndicator from "@/app/products/_components/ColorIndicator";
import { FavoriteBorder } from "@mui/icons-material";
import { ProductType } from "../_types/Product.type";
import { colorMap } from "@/app/_lib/colorsArray";
import IncreaseQuantity from "@/app/_icons/IncreaseQuantity";
import DecreaseQuantity from "@/app/_icons/DecreaseQuantity";
import AddToBasketIcon from "@/app/_icons/AddToBasketIcon";

interface ProductInfoProps {
  title: string;
  price: number;
  color: string;
  size: string;
  ram: string;
  discount: number;
}

function ProductInfo({
  title,
  price,
  color,
  size,
  ram,
  discount,
}: ProductInfoProps) {
  return (
    <div className="my-auto flex flex-col gap-2">
      {/* ( title and price ) */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex flex-col">
          <h6 className="text-base font-semibold">{title}</h6>
          <div className="flex w-full flex-row items-center justify-start gap-[2px] sm:gap-3">
            <p className="text-base text-red-600 sm:text-lg">
              $ {price - price * ((discount ?? 0) / 100)}
            </p>

            {discount !== 0 ? (
              <p className="text-sm text-textGrey line-through sm:text-base">
                $ {price}
              </p>
            ) : null}
            <div className="rounded-md px-[1px] py-[2px] text-[10px] text-xs text-red-600 sm:p-1 sm:text-sm">
              {discount !== 0 ? <p>- {discount}%</p> : null}
            </div>
          </div>
        </div>
        <div className="cursor-pointer text-black hover:text-sky-500">
          <FavoriteBorder />
        </div>
      </div>
      {/* Other details */}
      <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-6">
        {/* Size */}
        <p className="my-auto">Size</p>
        <p className="w-fit rounded-md border-[1px] border-black px-1 text-center">
          {size}
        </p>
        {/* RAM */}
        <p className="my-auto">RAM</p>
        <p className="w-fit rounded-md border-[1px] border-black px-1 text-center">
          {ram}
        </p>
        {/* Color */}
        <p className="my-auto">Color</p>
        <ColorIndicator
          isSelected={false}
          colorHex={colorMap.get(color!)!}
          colorString={color!}
        />
        {/* Quantity */}
        <p className="my-auto">Quantity</p>
        <div className="flex w-fit items-center gap-4 rounded-md border-[1px] border-[#C4C4C4] px-3 py-2 text-center">
          <button>
            <IncreaseQuantity />
          </button>
          <span className="text-sm text-textGrey">1</span>
          <button>
            <DecreaseQuantity />
          </button>
        </div>
      </div>
      <div className="mt-6 grid w-full grid-cols-2 gap-2 max-md:text-sm md:gap-3">
        <button className="flex-1 rounded-lg bg-[#4172DC] py-2 text-center uppercase text-white hover:bg-[#466fc8]">
          shop now
        </button>
        <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border-[1px] border-[#434343] px-[2px] py-2 text-center text-[#555555] hover:bg-[#f5f5f5] md:gap-2">
          <AddToBasketIcon />
          <span className="uppercase max-md:w-fit">Add to cart</span>
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;

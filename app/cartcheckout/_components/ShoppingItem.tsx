import { colorMap } from "@/app/_lib/colorsArray";
import { CartProduct } from "@/app/cart/_types/CartType";
import ColorIndicator from "@/app/products/_components/ColorIndicator";
import Image from "next/image";

interface ShoppingItemProps extends CartProduct {}

function ShoppingItem({
  image,
  title,
  color,
  quantity,
  unitPaymentPrice,
  discount,
}: ShoppingItemProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:gap-4">
      <div className="grid grid-cols-[auto_1fr] gap-2 sm:gap-5">
        <div className="my-auto h-[70px] w-[58px] overflow-hidden rounded-md">
          <Image
            src={image!}
            alt=""
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold max-sm:text-sm">{title}</p>
          <div className="flex items-center gap-2 text-sm">
            <p>Color: </p>{" "}
            <ColorIndicator
              colorString={color!}
              colorHex={colorMap.get(color!)!}
              size="small"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <p>
          <span className="text-xs text-sky-500">{quantity}x</span>{" "}
          {unitPaymentPrice - (discount || 0)} $
        </p>
        {discount && discount !== 0 && (
          <p className="text-red-500">
            <span className="text-xs text-sky-500">{quantity}x</span> {discount}{" "}
            $ off
          </p>
        )}
        <p>x{quantity}</p>
      </div>
    </div>
  );
}

export default ShoppingItem;

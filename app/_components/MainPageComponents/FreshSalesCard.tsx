import Image from "next/image";
import Link from "next/link";
import Rating from "../Rating";
import TimerSection from "./TimerSection";

function FreshSalesCard({
  product,
  initialTimer,
}: {
  product: any;
  initialTimer: { hour: number; min: number; sec: number };
}) {
  return (
    <Link
      href={`/product/${product.productId}`}
      className="FreshSalesCard realtive flex min-w-48 cursor-pointer flex-col rounded-md px-2 py-2 shadow-[0px_0px_2px_3px_#F3F3F3] sm:px-5"
    >
      {product.stock === 0 ? (
        <div className="absolute left-[-5px] top-8 z-10 w-[110px] -rotate-45 transform bg-red-600 py-1 text-center text-sm font-semibold text-white shadow-md">
          Out of Stock
        </div>
      ) : null}
      <div className="flex flex-col items-center justify-center gap-2 py-2 text-center">
        <p className="mb-0 font-bold text-textGrey">Deal of the day</p>
        <TimerSection initialTimer={initialTimer} />
      </div>
      <div className="py-2 text-center">
        <Image
          alt={`photo bag ${product.title}`}
          width={300}
          height={300}
          className="cardZoom w-full"
          src={product.image}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 py-2 text-start">
        <p className="font-bold text-black">{product.title}</p>
        <p className="text-textGrey">{product.brand}</p>
        <div className="flex flex-row flex-wrap items-center justify-start gap-2">
          <Rating value={product.rating} />
          <p className="text-textGrey">{product.rating}</p>
        </div>
        <div className="flex flex-row items-center justify-start gap-[2px] sm:gap-3">
          <p className="text-base text-red-600 sm:text-lg">
            ${" "}
            {(product.price - product.price * (product.discount / 100)).toFixed(
              2,
            )}
          </p>
          <p className="text-sm text-textGrey line-through sm:text-base">
            $ {product.price}
          </p>
          <div className="rounded-md bg-red-600 px-[1px] py-[2px] text-[10px] text-white sm:p-1 sm:text-base">
            <p>- {product.discount} %</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FreshSalesCard;

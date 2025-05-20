import FavoriteBorderSVG from "@/app/_icons/FavoriteBorderSVG";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "../AddToCartBtn";
import Rating from "../Rating";

function MainProductsCard({ product }: { product: any }) {
  return (
    <div className="flashSalesCard relative flex min-w-36 flex-col rounded-md shadow-[0px_0px_2px_3px_#F3F3F3]">
      {product.stock === 0 ? (
        <div className="absolute left-[-5px] top-8 z-10 w-[110px] -rotate-45 transform bg-red-600 py-1 text-center text-sm font-semibold text-white shadow-md">
          Out of Stock
        </div>
      ) : null}
      <div className="overflow-hidden p-2 text-center sm:p-4">
        <Image
          width={300}
          height={300}
          alt={product.title}
          className="cardZoom w-full"
          src={product.image}
          priority={true}
        />
      </div>
      <div className="flex flex-col items-center justify-between gap-2 p-2 sm:flex-row sm:p-4">
        <div className="flex flex-col items-start justify-center gap-2 text-start">
          <Link
            href={`/product/${product.productId}`}
            className="cursor-pointer whitespace-break-spaces text-wrap text-sm font-bold text-black hover:underline"
          >
            {product.title}
          </Link>
          <p className="text-xs text-textGrey">{product.brand}</p>
          <div className="flex flex-row flex-wrap items-center justify-start gap-2">
            <Rating ratingValue={product.rating} />
            <p className="text-textGrey">{product.rating}</p>
          </div>
          <div className="flex w-full flex-row items-center justify-start gap-[2px] sm:gap-3">
            <p className="text-base text-red-600 sm:text-lg">
              ${" "}
              {product.price - product.price * ((product.discount ?? 0) / 100)}
            </p>

            {product.discount !== 0 ? (
              <p className="text-sm text-textGrey line-through sm:text-base">
                $ {product.price}
              </p>
            ) : null}
            <div className="rounded-md px-[1px] py-[2px] text-[10px] text-xs text-red-600 sm:p-1 sm:text-sm">
              {product.discount !== 0 ? <p>- {product.discount}%</p> : null}
            </div>
          </div>
        </div>
        <div className="flex h-full flex-row items-center justify-center gap-5 sm:flex-col sm:justify-start">
          <div className="cursor-pointer text-black hover:text-sky-500">
            <FavoriteBorderSVG />
          </div>
          <AddToCartBtn productId={product.productId} stock={product.stock} />
        </div>
      </div>
    </div>
  );
}

export default MainProductsCard;

import { FavoriteBorder } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import Rating from "../Rating";

function MainProductsCard({ product }: { product: any }) {
  return (
    <div className="flex flex-col shadow-[0px_0px_2px_3px_#F3F3F3]  min-w-36  rounded-md  flashSalesCard ">
      <div className=" overflow-hidden text-center p-2 sm:p-4">
        <Image
          width={300}
          height={300}
          alt={product.title}
          className="w-full cardZoom"
          src={product.image}
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2 sm:p-4 ">
        <div className="flex flex-col items-start justify-center gap-2 text-start ">
          <Link
            href={`/product/${product.productId}`}
            className="text-sm font-bold text-black hover:underline cursor-pointer whitespace-break-spaces text-wrap"
          >
            {product.title}
          </Link>
          <p className="text-xs text-textGrey">{product.brand}</p>
          <div className="flex flex-row flex-wrap items-center justify-start gap-2">
            <Rating ratingValue={product.rating} />
            <p className="text-textGrey">{product.rating}</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-[2px] sm:gap-3 w-full">
            <p className="text-base text-red-600 sm:text-lg">
              ${" "}
              {product.price - product.price * ((product.discount ?? 0) / 100)}
            </p>

            {product.discount !== 0 ? (
              <p className="text-sm line-through  text-textGrey sm:text-base">
                $ {product.price}
              </p>
            ) : null}
            <div className="sm:p-1 py-[2px] px-[1px] text-[10px] sm:text-sm text-xs text-red-600 rounded-md">
              {product.discount !== 0 ? <p>- {product.discount}%</p> : null}
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

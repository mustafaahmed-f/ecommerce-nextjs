import { getRandomRating } from "@/app/_lib/getRating";
import { FavoriteBorder } from "@mui/icons-material";
import Image from "next/image";
import Rating from "../Rating";
import Link from "next/link";

function MainProductsCard({ product }: { product: any }) {
  const rating = getRandomRating();
  return (
    <div className="flex flex-col shadow-[0px_0px_2px_3px_#F3F3F3]  min-w-48  rounded-md  flashSalesCard ">
      <div className=" overflow-hidden text-center">
        <Image
          width={300}
          height={300}
          alt={product.title}
          className="w-full cardZoom"
          src={product.image}
        />
      </div>
      <div className="flex flex-row items-center justify-between gap-2 p-2 sm:p-4 ">
        <div className="flex flex-col items-start justify-center gap-2 text-start ">
          <Link
            href={`/product/${product.id}`}
            className="text-sm font-bold text-black hover:underline cursor-pointer"
          >
            {product.title}
          </Link>
          <p className="text-xs text-textGrey">{product.brand}</p>
          <div className="flex flex-row flex-wrap items-center justify-start gap-2">
            <Rating ratingValue={rating} />
            <p className="text-textGrey">{rating}</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-[2px] sm:gap-3 w-full">
            <p className="text-base text-red-600 sm:text-lg">
              $ {product.price - product.price * (product.discount ?? 0 / 100)}
            </p>

            {product.discount && (
              <p className="text-sm line-through text-textGrey sm:text-base">
                $ {product.price}
              </p>
            )}
            <div className="sm:p-1 py-[2px] px-[1px] text-[10px] sm:text-sm text-xs text-red-600 rounded-md">
              {product.discount && <p>- {product.discount}%</p>}
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

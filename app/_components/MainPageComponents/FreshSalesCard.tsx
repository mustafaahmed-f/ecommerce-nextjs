import Image from "next/image";

function FreshSalesCard({ product }: { product: any }) {
  return (
    <div className="flex flex-col min-w-48 sm:px-5 px-2 py-2 shadow-[0px_0px_2px_3px_#F3F3F3]  rounded-md cursor-pointer FreshSalesCard">
      <div className="flex flex-col items-center justify-center gap-2 py-2 text-center">
        <p className="mb-0 font-bold text-textGrey">Deal of the day</p>
        <p className="w-full font-semibold">12 : 43 : 12</p>
        <div className="flex flex-row items-center justify-between w-full text-sm text-neutral-400">
          <p>hour</p>
          <p>min</p>
          <p>sec</p>
        </div>
      </div>
      <div className="py-2 text-center ">
        <Image
          alt={`photo bag ${product.title}`}
          width={300}
          height={300}
          className="w-full cardZoom "
          src={product.image}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 py-2 text-start ">
        <p className="font-bold text-black">{product.title}</p>
        <p className="text-textGrey">{product.brand}</p>
        <div className="flex flex-row flex-wrap items-center justify-start gap-2">
          <div className="flex items-start justify-start text-sm">
            <p>⭐</p>
            <p>⭐</p>
            <p>⭐</p>
            <p>⭐</p>
          </div>
          <p className="text-textGrey">{"( 54 )"}</p>
        </div>
        <div className="flex flex-row items-center justify-start gap-[2px] sm:gap-3 ">
          <p className="text-base text-red-600 sm:text-lg">$69.99</p>
          <p className="text-sm line-through text-textGrey sm:text-base">
            {product.price}
          </p>
          <div className="sm:p-1 py-[2px] px-[1px] text-[10px] sm:text-base text-white bg-red-600 rounded-md">
            <p>- 40%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreshSalesCard;

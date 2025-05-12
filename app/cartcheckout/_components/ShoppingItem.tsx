import DeleteProductIcon from "@/app/_icons/DeleteProductIcon";
import { colorMap } from "@/app/_lib/colorsArray";
import { CartProduct } from "@/app/cart/_types/CartType";
import ColorIndicator from "@/app/products/_components/ColorIndicator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

interface ShoppingItemProps extends CartProduct {
  isOrdered?: boolean;
}

function ShoppingItem({
  image,
  title,
  color,
  quantity,
  unitPaymentPrice,
  discount,
  productID,
  isOrdered,
}: ShoppingItemProps) {
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const router = useRouter();
  function RemoveProduct() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        //// Logic here
        router.refresh();
        setIsLoading(false);
        Swal.fire({
          title: "Removed !",
          text: "Product has been removed successfully !!",
          icon: "success",
        });
      }
    });
  }

  return (
    <div
      className={`grid w-full grid-cols-2 gap-2 sm:gap-4 ${isLoading ? "pointer-events-none opacity-40" : ""}`}
    >
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
        {isOrdered && (
          <button onClick={RemoveProduct} className="mt-3 cursor-pointer">
            <DeleteProductIcon />
          </button>
        )}
      </div>
    </div>
  );
}

export default ShoppingItem;

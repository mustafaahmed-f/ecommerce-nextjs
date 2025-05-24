import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/shadcn/alert-dialog";
import { Button } from "@/app/_components/shadcn/button";
import DeleteProductIcon from "@/app/_icons/DeleteProductIcon";
import { instance } from "@/app/_lib/axiosInstance";
import { colorMap } from "@/app/_lib/colorsArray";
import { getAxiosErrMsg } from "@/app/_lib/getAxiosErrMsg";
import { orderStatus } from "@/app/_lib/OrderStatus";
import { CartProduct } from "@/app/cart/_types/CartType";
import ColorIndicator from "@/app/products/_components/ColorIndicator";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ShoppingItemProps extends CartProduct {
  isOrdered?: boolean;
  orderStatus?: keyof typeof orderStatus;
  orderId?: string;
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
  orderStatus,
  orderId,
}: ShoppingItemProps) {
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const { 0: confirmDialogOpen, 1: setConfirmDialogOpen } = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div
      className={`my-3 grid w-full grid-cols-2 gap-2 sm:gap-4 ${isLoading ? "pointer-events-none opacity-40" : ""}`}
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
        {isOrdered &&
          (orderStatus === "pending" || orderStatus === "confirmed") && (
            <AlertDialog
              open={confirmDialogOpen}
              onOpenChange={setConfirmDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <button
                  onClick={() => {
                    setConfirmDialogOpen(true);
                  }}
                  className="mt-3 cursor-pointer"
                >
                  <DeleteProductIcon />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Product</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove this product ?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setConfirmDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      try {
                        setIsLoading(true);
                        await instance.put(
                          `/api/order/removeProduct?orderId=${orderId}&productId=${productID}`,
                        );
                        router.refresh();
                        setIsLoading(false);
                        setConfirmDialogOpen(false);
                        toast({
                          title: "Success",
                          description: "Product removed successfully",
                          variant: "success",
                        });
                      } catch (error) {
                        console.log("Error removing product: ", error);
                        const errMsg = getAxiosErrMsg(error);
                        console.log("Err msg : ", errMsg);
                        setIsLoading(false);
                        setConfirmDialogOpen(false);
                        toast({
                          title: "Error",
                          description: errMsg,
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    Confirm
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
      </div>
    </div>
  );
}

export default ShoppingItem;

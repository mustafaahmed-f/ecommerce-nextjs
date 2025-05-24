"use client";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../_components/shadcn/alert-dialog";
import { Button } from "../_components/shadcn/button";
import { useCart } from "../_context/CartProvider";
import DeleteProductIcon from "../_icons/DeleteProductIcon";
import {
  emptyUserCart,
  removeFromUserCart,
  updateProductQuantityOfUserCart,
} from "../_lib/APIs/loggedInCartAPIs";
import {
  emptyOfflineCart,
  removeFromOfflineCart,
  updateProductQuantityOfOfflineCart,
} from "../_lib/APIs/offlineCartAPIs";
import { useAppSelector } from "../_lib/store/store";
import { CartProduct } from "./_types/CartType";

interface PageProps {}

function Page({}: PageProps) {
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const { cart, setCart } = useCart();
  const { 0: quantityObj, 1: setQuantityObj } = useState<
    Record<number, number>
  >(() => {
    const initial: Record<number, number> = {};
    cart.products.forEach((product: CartProduct) => {
      initial[product.productID] = product.quantity;
    });
    return initial;
  });
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { 0: emptyCartDialogOpen, 1: setEmptyCartDialogOpen } = useState(false);
  const { 0: selectedProductID, 1: setSelectedProductID } = useState<
    number | null
  >(null);
  const router = useRouter();

  const user = useAppSelector((state) => state.user);
  const isAuth: boolean = user.email.length > 0 || user.userName.length > 0;
  const cartItems = cart.products;

  const quantityRef = useRef(quantityObj); //// <= this ref is used to store last confirmed quantity
  const quantityChangeTimeOut = useRef<NodeJS.Timeout | null>(null);

  const updateQuantityMethod: (
    cartId: string,
    productId: string,
    quantity: number,
  ) => Promise<any> = isAuth
    ? updateProductQuantityOfUserCart
    : updateProductQuantityOfOfflineCart;

  useEffect(() => {
    return () => {
      if (quantityChangeTimeOut.current) {
        clearTimeout(quantityChangeTimeOut.current);
      }
    };
  }, []);

  const emptyCartMethod: (cartId: string) => Promise<any> = isAuth
    ? emptyUserCart
    : emptyOfflineCart;

  const deleteMethod: (cartId: string, productId: string) => Promise<any> =
    isAuth ? removeFromUserCart : removeFromOfflineCart;

  const handleQtyChange = async (productId: number, qty: number) => {
    setQuantityObj((prev) => ({
      ...prev,
      [productId]: qty,
    }));

    if (quantityChangeTimeOut.current)
      clearTimeout(quantityChangeTimeOut.current!);
    quantityChangeTimeOut.current = setTimeout(async () => {
      const response = await updateQuantityMethod(
        cart._id!,
        String(productId),
        qty,
      );
      if (!response.success) {
        toast({
          description: response.error,
          variant: "destructive",
        });
        setQuantityObj(quantityRef.current!);
      } else {
        setCart(response.cart);
        quantityRef.current = { ...quantityObj, [productId]: qty };
      }
      router.refresh();
    }, 1500);
  };

  const incrementQty = async (productId: number) => {
    setQuantityObj({
      ...quantityObj,
      [productId]: quantityObj[productId] + 1,
    });

    // handleQtyChange(index, cartItems[index].quantity + 1);
    const response = await updateQuantityMethod(
      cart._id!,
      String(productId),
      quantityObj[productId] + 1,
    );
    if (!response.success) {
      toast({
        description: response.error,
        variant: "destructive",
      });
      setQuantityObj(quantityRef.current!);
    } else {
      setCart(response.cart);
      quantityRef.current = {
        ...quantityObj,
        [productId]: quantityObj[productId] + 1,
      };
    }
    router.refresh();
  };

  const decrementQty = async (productId: number) => {
    if (quantityObj[productId] === 1) return;
    setQuantityObj({
      ...quantityObj,
      [productId]: quantityObj[productId] - 1,
    });
    const response = await updateQuantityMethod(
      cart._id!,
      String(productId),
      quantityObj[productId] - 1,
    );
    if (!response.success) {
      toast({
        description: response.error,
        variant: "destructive",
      });
      setQuantityObj(quantityRef.current!);
    } else {
      setCart(response.cart);
      quantityRef.current = {
        ...quantityObj,
        [productId]: quantityObj[productId] - 1,
      };
    }
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-4xl p-4 py-8">
      <div className="mb-6">
        <h1 className="text-center text-4xl font-bold">Shopping Cart</h1>
        <p className="text- mt-3 text-center">
          Your cart has{" "}
          <span className="text-sky-600">{cart.products.length} items</span>
        </p>
      </div>
      <div
        className={`space-y-6 ${isLoading ? "pointer-events-none opacity-40" : ""}`}
      >
        {cartItems.map((item) => {
          const discountedPrice = item.unitPaymentPrice - item.discount!;
          const hasDiscount = (item.discount ?? 0) > 0;

          return (
            <div
              key={item.productID}
              className="flex flex-col items-center gap-6 border-b pb-4 sm:flex-row"
            >
              <div className="relative h-32 w-32">
                <Image
                  src={item?.image ?? ""}
                  alt={item.title || "Product Image"}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="w-full flex-1 space-y-2 md:w-auto">
                <Link href={`/product/${item.productID}`}>
                  <h2 className="text-lg font-semibold hover:underline">
                    {item.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <div className="text-gray-700">
                  {hasDiscount ? (
                    <div className="space-x-2">
                      <span className="text-lg font-bold text-red-500">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${item.unitPaymentPrice.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold">
                      ${item.unitPaymentPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-row items-center gap-4 max-sm:w-full max-sm:justify-between sm:flex-col">
                <div className="flex items-center gap-2">
                  <button
                    className="cursor-pointer rounded border px-3 py-1"
                    onClick={() => decrementQty(item.productID)}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className="w-14 rounded border py-1 text-center"
                    value={quantityObj[item.productID] ?? 1}
                    min={1}
                    minLength={1}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        handleQtyChange(
                          item.productID,
                          Math.max(1, Number(val)),
                        );
                      }
                    }}
                  />
                  <button
                    className="cursor-pointer rounded border px-3 py-1"
                    onClick={() => incrementQty(item.productID)}
                  >
                    +
                  </button>
                </div>
                <AlertDialog
                  open={open}
                  onOpenChange={setOpen}
                  key={item.productID}
                >
                  <AlertDialogTrigger asChild>
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        console.log("Product ID : ", item.productID);
                        setSelectedProductID(item.productID);
                        setOpen(true);
                      }}
                    >
                      <DeleteProductIcon />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this product?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          console.log(
                            "Product ID before confirm : ",
                            selectedProductID,
                          );
                          setSelectedProductID(null);
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          console.log(
                            "Product ID after confirm : ",
                            selectedProductID,
                          );
                          setIsLoading(true);
                          const response = await deleteMethod(
                            cart._id!,
                            String(selectedProductID),
                          );

                          if (!response.success) {
                            toast({
                              description: response.error,
                              variant: "destructive",
                            });
                            setIsLoading(false);
                          }
                          console.log("Response cart : ", response.cart);
                          setCart(response.cart);

                          const newQuantityObj = { ...quantityObj };
                          delete newQuantityObj[selectedProductID!];
                          setQuantityObj(newQuantityObj);

                          router.refresh();
                          setIsLoading(false);
                          setOpen(false);
                          toast({
                            description:
                              "Product has been removed successfully !!",
                            variant: "success",
                          });
                        }}
                      >
                        Confirm
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          );
        })}
      </div>

      {cartItems.length ? (
        <div
          className={`mt-8 flex flex-col items-end ${isLoading ? "pointer-events-none opacity-40" : ""}`}
        >
          <div className="mb-4 text-xl font-semibold">
            Total: ${cart.subTotal.toFixed(2)}
          </div>
          <div className="flex gap-4">
            <AlertDialog
              open={emptyCartDialogOpen}
              onOpenChange={setEmptyCartDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <button
                  className="cursor-pointer rounded bg-red-500 px-6 py-2 text-white transition hover:bg-red-600"
                  onClick={() => {
                    setEmptyCartDialogOpen(true);
                  }}
                >
                  Empty Cart
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Empty cart</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to empty your cart ?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEmptyCartDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      setIsLoading(true);
                      const response = await emptyCartMethod(cart._id!);
                      if (!response.success) {
                        toast({
                          description: response.error,
                          variant: "destructive",
                        });
                        setIsLoading(false);
                      } else {
                        setCart(response.cart);
                        setQuantityObj({});
                      }
                      setIsLoading(false);
                      router.refresh();
                      setEmptyCartDialogOpen(false);
                      toast({
                        description: "Cart has been emptied successfully !!",
                        variant: "success",
                      });
                    }}
                  >
                    Confirm
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Link
              href={"/cartcheckout"}
              className="rounded bg-black px-6 py-2 text-white transition hover:bg-gray-800"
            >
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-2xl">Your cart is empty !!</p>
      )}
    </div>
  );
}

export default Page;

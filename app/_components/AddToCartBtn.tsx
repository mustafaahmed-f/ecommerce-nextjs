"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "../_context/CartProvider";
import AddToBasketIcon from "../_icons/AddToBasketIcon";
import CartCheckIcon from "../_icons/CartCheckIcon";
import CartPlusIcon from "../_icons/CartPlusIcon";
import InCartBasketIcon from "../_icons/InCartBasketIcon";
import {
  addToUserCart,
  removeFromUserCart,
} from "../_lib/APIs/loggedInCartAPIs";
import {
  addToOfflineCart,
  removeFromOfflineCart,
} from "../_lib/APIs/offlineCartAPIs";
import { storeCart } from "../_lib/store/slices/cartSlice/cartSlice";
import { useAppDispatch, useAppSelector } from "../_lib/store/store";
import { CartProduct } from "../cart/_types/CartType";

interface AddToCartBtnProps {
  productId: number;
  stock: number;
  isSingleProduct?: boolean;
}

function AddToCartBtn({
  productId,
  stock,
  isSingleProduct = false,
}: AddToCartBtnProps) {
  const { cart, setCart } = useCart();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isAuth: boolean = user.email.length > 0 || user.userName.length > 0;
  const router = useRouter();
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const { toast } = useToast();

  const addMethod: (cartId: string, productId: string) => Promise<any> = isAuth
    ? addToUserCart
    : addToOfflineCart;
  const deleteMethod: (cartId: string, productId: string) => Promise<any> =
    isAuth ? removeFromUserCart : removeFromOfflineCart;
  const productExistsInCart: boolean = cart.products.some(
    (p: CartProduct) => p.productID === productId,
  );

  async function handleClick(
    isAdd: boolean,
    cartId: string,
    productId: string,
  ) {
    setIsLoading(true);
    const response = isAdd
      ? await addMethod(cartId, productId)
      : await deleteMethod(cartId, productId);
    if (!response.success) {
      toast({
        description: `Failed to ${isAdd ? "add" : "remove"} product to cart : ${response.error}`,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    setCart(response.cart);
    dispatch(storeCart(response.cart));

    toast({
      description: isAdd
        ? "Product has bee added to cart"
        : "Product has been removed from cart",
      variant: "success",
    });
    setIsLoading(false);
    router.refresh();
  }

  return !isSingleProduct ? (
    <div>
      {!productExistsInCart ? (
        <button
          className={`flex cursor-pointer items-center overflow-visible hover:text-sky-500 ${stock === 0 || isLoading ? "pointer-events-none opacity-50" : ""}`}
          onClick={() => handleClick(true, cart._id!, productId.toString())}
        >
          <CartPlusIcon />
        </button>
      ) : (
        <button
          className={`cursor-pointer ${isLoading ? "pointer-events-none opacity-50" : ""} hover:text-sky-500`}
          onClick={() => handleClick(false, cart._id!, productId.toString())}
        >
          <CartCheckIcon />
        </button>
      )}
    </div>
  ) : !productExistsInCart ? (
    <button
      onClick={() => handleClick(true, cart._id!, productId.toString())}
      className={`flex flex-1 items-center ${stock === 0 || isLoading ? "pointer-events-none opacity-30" : ""} justify-center gap-1 rounded-lg border-[1px] border-[#434343] px-[2px] py-2 text-center text-[#555555] hover:bg-[#f5f5f5] md:gap-2`}
    >
      <AddToBasketIcon />
      <span className="uppercase max-md:w-fit">Add to cart</span>
    </button>
  ) : (
    <button
      onClick={() => handleClick(false, cart._id!, productId.toString())}
      className={`flex flex-1 items-center ${isLoading ? "pointer-events-none opacity-30" : ""} justify-center gap-1 rounded-lg border-[1px] border-[#434343] px-[2px] py-2 text-center text-[#555555] hover:bg-[#f5f5f5] md:gap-2`}
    >
      <InCartBasketIcon />
      <span className="uppercase max-md:w-fit">In cart</span>
    </button>
  );
}

export default AddToCartBtn;

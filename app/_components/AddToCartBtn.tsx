"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "../_context/CartProvider";
import CartCheckIcon from "../_icons/CartCheckIcon";
import CartPlusIcon from "../_icons/CartPlusIcon";
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
import { ErrorToast, SuccessToast } from "../_lib/toasts";
import { CartProduct } from "../cart/_types/CartType";

interface AddToCartBtnProps {
  productId: number;
  stock: number;
}

function AddToCartBtn({ productId, stock }: AddToCartBtnProps) {
  const { cart, setCart } = useCart();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isAuth: boolean = user.email.length > 0 || user.userName.length > 0;
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const router = useRouter();

  //TODO : use useOptimistic instead of loading state to show product is added while add operation is done in background

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
    const response = isAdd
      ? await addMethod(cartId, productId)
      : await deleteMethod(cartId, productId);
    if (!response.success) {
      ErrorToast.fire({
        title: `Failed to ${isAdd ? "add" : "remove"} product to cart : ${response.error}`,
      });
      return;
    }
    setCart(response.cart);
    dispatch(storeCart(response.cart));
    SuccessToast.fire({
      title: `Product ${isAdd ? "added" : "removed"} successfully`,
    });

    router.refresh();
  }

  return (
    <div>
      {!productExistsInCart ? (
        <button
          className={`flex cursor-pointer items-center overflow-visible hover:text-sky-500 ${stock === 0 ? "pointer-events-none opacity-50" : ""}`}
          onClick={() => handleClick(true, cart._id!, productId.toString())} //TODO : use useOptimistic(cart._id!, productId.toString())}
        >
          <CartPlusIcon />
        </button>
      ) : (
        <button
          className="cursor-pointer hover:text-sky-500"
          onClick={() => handleClick(false, cart._id!, productId.toString())} //TODO : use useOptimistic(cart._id!, productId.toString())}
        >
          <CartCheckIcon />
        </button>
      )}
    </div>
  );
}

export default AddToCartBtn;

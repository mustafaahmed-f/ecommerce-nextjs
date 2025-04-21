"use client";

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
import { useAppDispatch, useAppSelector } from "../_lib/store/store";
import { CartProduct, ICart } from "../cart/_types/CartType";
import { ErrorToast, SuccessToast } from "../_lib/toasts";
import { storeCart } from "../_lib/store/slices/cartSlice/cartSlice";

interface AddToCartBtnProps {
  productId: number;
}

function AddToCartBtn({ productId }: AddToCartBtnProps) {
  const { cart, setCart } = useCart();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isAuth: boolean = user.email.length > 0 || user.userName.length > 0;
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);

  //TODO : use useOptimistic instead of loading state to show product is added while add operation is done in background

  const mockCart: ICart = {
    _id: "mock-cart-123",
    userID: "user-456",
    products: [
      {
        productID: 1,
        title: "Test Product",
        unitPaymentPrice: 100,
        discount: 10,
        quantity: 1,
        color: "Red",
        category: "Electronics",
        brand: "TestBrand",
      },
    ],
    subTotal: 90, // 100 - 10 discount
    createdAt: new Date(),
    updatedAt: new Date(),
  };

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
  }

  return (
    <div>
      {!productExistsInCart ? (
        <button
          className="flex cursor-pointer items-center overflow-visible hover:text-sky-500"
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

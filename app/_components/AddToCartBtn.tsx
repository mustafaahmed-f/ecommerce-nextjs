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
import { useAppSelector } from "../_lib/store/store";
import { CartProduct, ICart } from "../cart/_types/CartType";

interface AddToCartBtnProps {
  productId: number;
}

function AddToCartBtn({ productId }: AddToCartBtnProps) {
  const { cart } = useCart();
  const user = useAppSelector((state) => state.user);
  const isAuth: boolean = user.email.length > 0 || user.userName.length > 0;
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
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
  const productExistsInCart: boolean = mockCart.products.some(
    (p: CartProduct) => p.productID === productId,
  );

  return (
    <div>
      {!productExistsInCart ? (
        <button
          className="flex cursor-pointer items-center overflow-visible hover:text-sky-500"
          onClick={() => addMethod(cart._id!, productId.toString())}
        >
          <CartPlusIcon />
        </button>
      ) : (
        <button
          className="cursor-pointer hover:text-sky-500"
          onClick={() => deleteMethod(cart._id!, productId.toString())}
        >
          <CartCheckIcon />
        </button>
      )}
    </div>
  );
}

export default AddToCartBtn;

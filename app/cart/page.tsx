"use client";
import Image from "next/image";
import Button from "../_components/Button";
import { useState } from "react";
import { useCart } from "../_context/CartProvider";
import { useAppSelector } from "../_lib/store/store";
import { CartProduct } from "./_types/CartType";
import { initial } from "lodash";
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
import { ErrorToast, SuccessToast } from "../_lib/toasts";
import DeleteProductIcon from "../_icons/DeleteProductIcon";
import { useRouter } from "next/navigation";

interface PageProps {}

function Page({}: PageProps) {
  //TODO : use useOptimistic for updating quantity and deleting products
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

  const router = useRouter();

  const user = useAppSelector((state) => state.user);
  const isAuth: boolean = user.email.length > 0 || user.userName.length > 0;
  const cartItems = cart.products;

  const updateQuantityMethod: (
    cartId: string,
    productId: string,
    quantity: number,
  ) => Promise<any> = isAuth
    ? updateProductQuantityOfUserCart
    : updateProductQuantityOfOfflineCart;

  const emptyCartMethod: (cartId: string) => Promise<any> = isAuth
    ? emptyUserCart
    : emptyOfflineCart;

  const deleteMethod: (cartId: string, productId: string) => Promise<any> =
    isAuth ? removeFromUserCart : removeFromOfflineCart;

  const handleQtyChange = async (productId: number, qty: number) => {
    const response = await updateQuantityMethod(
      cart._id!,
      String(productId),
      qty,
    );
    if (!response.success) {
      ErrorToast.fire({
        title: response.error,
      });
    } else {
      setCart(response.cart);
      setQuantityObj({
        ...quantityObj,
        [productId]: qty,
      });
    }
    router.refresh();
  };

  const incrementQty = async (productId: number) => {
    // handleQtyChange(index, cartItems[index].quantity + 1);
    const response = await updateQuantityMethod(
      cart._id!,
      String(productId),
      quantityObj[productId] + 1,
    );
    if (!response.success) {
      ErrorToast.fire({
        title: response.error,
      });
    } else {
      setCart(response.cart);
      setQuantityObj({
        ...quantityObj,
        [productId]: quantityObj[productId] + 1,
      });
    }
    router.refresh();
  };

  const decrementQty = async (productId: number) => {
    if (quantityObj[productId] === 1) return;
    const response = await updateQuantityMethod(
      cart._id!,
      String(productId),
      quantityObj[productId] - 1,
    );
    if (!response.success) {
      ErrorToast.fire({
        title: response.error,
      });
    } else {
      setCart(response.cart);
      setQuantityObj({
        ...quantityObj,
        [productId]: quantityObj[productId] - 1,
      });
    }
    router.refresh();
  };

  async function emptyCart() {
    const response = await emptyCartMethod(cart._id!);
    if (!response.success) {
      ErrorToast.fire({
        title: response.error,
      });
    } else {
      setCart(response.cart);
      setQuantityObj({});
    }
    router.refresh();
  }

  async function RemoveProduct(productId: number) {
    const response = await deleteMethod(cart._id!, String(productId));
    if (!response.success) {
      ErrorToast.fire({
        title: response.error,
      });
    } else {
      setCart(response.cart);
      //// remove product from quantity object :
      const newQuantityObj = { ...quantityObj };
      delete newQuantityObj[productId];
      setQuantityObj(newQuantityObj);
      SuccessToast.fire({
        title: "Product removed successfully",
      });
    }
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl p-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold">Shopping Cart</h1>
      <div className="space-y-6">
        {cartItems.map((item, index) => {
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
                <h2 className="text-lg font-semibold">{item.title}</h2>
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
                    className="rounded border px-3 py-1"
                    onClick={() => decrementQty(item.productID)}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className="w-14 rounded border py-1 text-center"
                    value={item.quantity}
                    min={1}
                    minLength={1}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        return;
                      } else if (Number(e.target.value) === 0) {
                        handleQtyChange(item.productID, 1);
                      } else {
                        handleQtyChange(item.productID, Number(e.target.value));
                      }
                    }}
                  />
                  <button
                    className="rounded border px-3 py-1"
                    onClick={() => incrementQty(item.productID)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => RemoveProduct(item.productID)}
                  className="cursor-pointer"
                >
                  <DeleteProductIcon />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {cartItems.length ? (
        <div className="mt-8 flex flex-col items-end">
          <div className="mb-4 text-xl font-semibold">
            Total: ${cart.subTotal.toFixed(2)}
          </div>
          <div className="flex gap-4">
            <button
              onClick={emptyCart}
              className="rounded bg-red-500 px-6 py-2 text-white transition hover:bg-red-600"
            >
              Empty Cart
            </button>
            <button className="rounded bg-black px-6 py-2 text-white transition hover:bg-gray-800">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-2xl">Your cart is empty !!</p>
      )}
    </div>
  );
}

export default Page;

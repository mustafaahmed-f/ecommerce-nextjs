"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
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
import { ErrorToast } from "../_lib/toasts";
import { CartProduct } from "./_types/CartType";
import Link from "next/link";

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
        ErrorToast.fire({
          title: response.error,
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
      ErrorToast.fire({
        title: response.error,
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
      ErrorToast.fire({
        title: response.error,
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

  async function emptyCart() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, empty it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const response = await emptyCartMethod(cart._id!);
        if (!response.success) {
          ErrorToast.fire({
            title: response.error,
          });
          setIsLoading(false);
        } else {
          setCart(response.cart);
          setQuantityObj({});
        }
        setIsLoading(false);
        router.refresh();
        Swal.fire({
          title: "Emptied !",
          text: "Your cart is now empty !!",
          icon: "success",
        });
      }
    });
  }

  async function RemoveProduct(productId: number) {
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
        const response = await deleteMethod(cart._id!, String(productId));
        if (!response.success) {
          ErrorToast.fire({
            title: response.error,
          });
          setIsLoading(false);
        } else {
          setCart(response.cart);
          //// remove product from quantity object :
          const newQuantityObj = { ...quantityObj };
          delete newQuantityObj[productId];
          setQuantityObj(newQuantityObj);
        }
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
                    className="rounded border px-3 py-1"
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
        <div
          className={`mt-8 flex flex-col items-end ${isLoading ? "pointer-events-none opacity-40" : ""}`}
        >
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

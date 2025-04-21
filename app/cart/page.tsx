"use client";
import Image from "next/image";
import Button from "../_components/Button";
import { useState } from "react";
import { useCart } from "../_context/CartProvider";

interface PageProps {}

function Page({}: PageProps) {
  const { cart, setCart } = useCart();
  const cartItems = cart.products;

  const handleQtyChange = (index: number, qty: number) => {};

  const incrementQty = (index: number) => {
    handleQtyChange(index, cartItems[index].quantity + 1);
  };

  const decrementQty = (index: number) => {
    handleQtyChange(index, cartItems[index].quantity - 1);
  };

  function emptyCart() {}

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

              <div className="flex items-center gap-2">
                <button
                  className="rounded border px-3 py-1"
                  onClick={() => decrementQty(index)}
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
                    if (isNaN(Number(e.target.value))) return;
                    handleQtyChange(index, Number(e.target.value));
                  }}
                />
                <button
                  className="rounded border px-3 py-1"
                  onClick={() => incrementQty(index)}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

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
    </div>
  );
}

export default Page;

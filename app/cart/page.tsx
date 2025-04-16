"use client";
import Image from "next/image";
import Button from "../_components/Button";
import { useState } from "react";

interface PageProps {}

function Page({}: PageProps) {
  const initialCart = [
    {
      productID: "1",
      title: "Gaming Laptop",
      image: "/images/laptop.jpg",
      unitPaymentPrice: 1500,
      discount: 10,
      quantity: 1,
      category: "electronics",
      brand: "AlienTech",
    },
    {
      productID: "2",
      title: "Bluetooth Speaker",
      image: "/images/speaker.jpg",
      unitPaymentPrice: 200,
      discount: 0,
      quantity: 2,
      category: "audio",
      brand: "SoundBoom",
    },
  ];

  const [cartItems, setCartItems] = useState(initialCart);

  const handleQtyChange = (index: number, qty: number) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, qty) } : item,
      ),
    );
  };

  const incrementQty = (index: number) => {
    handleQtyChange(index, cartItems[index].quantity + 1);
  };

  const decrementQty = (index: number) => {
    handleQtyChange(index, cartItems[index].quantity - 1);
  };

  const getTotal = () =>
    cartItems.reduce((acc, item) => {
      const discounted =
        item.unitPaymentPrice * (1 - (item.discount ?? 0) / 100);
      return acc + discounted * item.quantity;
    }, 0);

  return (
    <div className="mx-auto max-w-4xl p-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold">Shopping Cart</h1>
      <div className="space-y-6">
        {cartItems.map((item, index) => {
          const discountedPrice =
            item.unitPaymentPrice * (1 - (item.discount ?? 0) / 100);
          const hasDiscount = (item.discount ?? 0) > 0;

          return (
            <div
              key={item.productID}
              className="flex flex-col items-center gap-6 border-b pb-4 sm:flex-row"
            >
              <div className="relative h-32 w-32">
                <Image
                  src={item.image}
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
          Total: ${getTotal().toFixed(2)}
        </div>
        <button className="rounded bg-black px-6 py-2 text-white transition hover:bg-gray-800">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Page;

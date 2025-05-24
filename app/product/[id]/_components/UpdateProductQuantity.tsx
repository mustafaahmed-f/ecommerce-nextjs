"use client";

import { useCart } from "@/app/_context/CartProvider";
import DecreaseQuantity from "@/app/_icons/DecreaseQuantity";
import IncreaseQuantity from "@/app/_icons/IncreaseQuantity";
import { updateProductQuantityOfUserCart } from "@/app/_lib/APIs/loggedInCartAPIs";
import { updateProductQuantityOfOfflineCart } from "@/app/_lib/APIs/offlineCartAPIs";
import { useAppSelector } from "@/app/_lib/store/store";
import { CartProduct } from "@/app/cart/_types/CartType";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface UpdateProductQuantityProps {
  productId: number;
}

function UpdateProductQuantity({ productId }: UpdateProductQuantityProps) {
  const { cart, setCart } = useCart();
  const { toast } = useToast();
  const { 0: quantity, 1: setQuantity } = useState(() => {
    const product = cart.products.find(
      (p: CartProduct) => p.productID === productId,
    );
    return product ? product.quantity : 1;
  });

  const quantityRef = useRef(quantity); //// <= this ref is used to store last confirmed quantity
  const quantityChangeTimeOut = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const product = cart.products.find(
      (p: CartProduct) => p.productID === productId,
    );
    setQuantity(product ? product.quantity : 1);
  }, [cart, setQuantity]);

  const router = useRouter();

  const user = useAppSelector((state) => state.user);
  const isAuth: boolean = user.email.length > 0 || user.userName.length > 0;

  const updateQuantityMethod: (
    cartId: string,
    productId: string,
    quantity: number,
  ) => Promise<any> = isAuth
    ? updateProductQuantityOfUserCart
    : updateProductQuantityOfOfflineCart;

  const productExistsInCart: boolean = cart.products.some(
    (p: CartProduct) => p.productID === productId,
  );

  const handleQtyChange = async (productId: number, qty: number) => {
    setQuantity(qty);
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
        setQuantity(quantityRef.current!);
      } else {
        setCart(response.cart);
        quantityRef.current = qty;
      }
      router.refresh();
    }, 1500);
  };

  const incrementQty = async (productId: number) => {
    setQuantity((prev) => prev + 1);
    // handleQtyChange(index, cartItems[index].quantity + 1);
    const response = await updateQuantityMethod(
      cart._id!,
      String(productId),
      quantity + 1,
    );
    if (!response.success) {
      toast({
        description: response.error,
        variant: "destructive",
      });
      setQuantity(quantityRef.current!);
    } else {
      setCart(response.cart);
      quantityRef.current = quantity + 1;
    }
    router.refresh();
  };

  const decrementQty = async (productId: number) => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
    const response = await updateQuantityMethod(
      cart._id!,
      String(productId),
      quantity - 1,
    );
    if (!response.success) {
      toast({
        description: response.error,
        variant: "destructive",
      });
      setQuantity(quantityRef.current!);
    } else {
      setCart(response.cart);
      quantityRef.current = quantity - 1;
    }
    router.refresh();
  };

  return (
    <div
      className={`flex w-fit ${!productExistsInCart ? "pointer-events-none opacity-30" : ""} items-center gap-2 rounded-md border-[1px] border-[#C4C4C4] px-3 py-2 text-center`}
    >
      <button onClick={() => incrementQty(productId)}>
        <IncreaseQuantity />
      </button>
      <input
        type="text"
        className="w-14 rounded border-0 text-center"
        value={quantity}
        min={1}
        minLength={1}
        onChange={(e) => {
          if (isNaN(Number(e.target.value))) {
            return;
          } else if (Number(e.target.value) === 0) {
            handleQtyChange(productId, 1);
          } else {
            handleQtyChange(productId, Number(e.target.value));
          }
        }}
      />
      <button onClick={() => decrementQty(productId)}>
        <DecreaseQuantity />
      </button>
    </div>
  );
}

export default UpdateProductQuantity;

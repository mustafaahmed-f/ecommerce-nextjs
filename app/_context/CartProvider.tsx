"use client";
import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeCart } from "../_lib/store/slices/cartSlice/cartSlice";
import { ICart } from "../cart/_types/CartType";

interface initialStateType {
  cart: ICart;
  setCart: React.Dispatch<React.SetStateAction<ICart>>;
}

let initialState: initialStateType = {
  cart: {
    _id: "",
    userID: "",
    products: [],
    subTotal: 0,
  },
  setCart: () => {},
};

const cartContext = createContext<initialStateType>(initialState);

interface CartProviderProps {
  cart: ICart;
  isMerged: boolean;
  children: React.ReactNode;
}

function CartProvider({
  cart: fetchedCart,
  children,
  isMerged,
}: CartProviderProps) {
  const { 0: cart, 1: setCart } = useState<ICart>(initialState.cart);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const isFirstRender = useRef<boolean>(true);
  const { toast } = useToast();

  if (isFirstRender.current) {
    isFirstRender.current = false;
    setCart(fetchedCart);
    dispatch(storeCart(fetchedCart));
  }

  useEffect(() => {
    setCart(fetchedCart);
    dispatch(storeCart(fetchedCart));
  }, [user, fetchedCart, setCart, dispatch]);

  useEffect(() => {
    dispatch(storeCart(cart));
  }, [cart, dispatch]);

  useEffect(() => {
    async function removeOfflineCartCookie() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cart/deleteCookie`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        toast({
          title: "Success",
          description:
            "Your cart has been merged successfully with the offline cart !!",
          variant: "success",
        });
      } catch (error) {
        console.error("Error removing offline cart cookie:", error);
        toast({
          title: "Error",
          description: "Error while merging your cart with the offline cart !!",
          variant: "destructive",
        });
        // You might want to display an error message to the user here
      }
    }

    if (isMerged) {
      removeOfflineCartCookie();
    }
  }, []);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;

export function useCart() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("Can't use cart context outside cart provider !!");
  }
  return context;
}

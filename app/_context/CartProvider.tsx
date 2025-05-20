"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
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
  children: React.ReactNode;
  isMerged: boolean;
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

        Swal.fire({
          title: "Your cart",
          text: "Your cart has been merged successfully with the offline cart !!",
          icon: "success",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
      } catch (error) {
        console.error("Error removing offline cart cookie:", error);
        Swal.fire({
          title: "Error",
          text: "Error removing offline cart cookie !!",
          icon: "error",
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

"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICart } from "../cart/_types/CartType";
import { storeCart } from "../_lib/store/slices/cartSlice/cartSlice";

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
}

function CartProvider({ cart: fetchedCart, children }: CartProviderProps) {
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

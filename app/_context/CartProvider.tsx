import { createContext, useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cart } from "../_lib/store/slices/cartSlice/cartSlice.types";

interface initialStateType {
  cart: Cart[];
}

const cartContext = createContext<initialStateType>({
  cart: [],
});

interface CartProviderProps {}

function CartProvider({}: CartProviderProps) {
  const { 0: cart, 1: setCart } = useState<Cart[]>([]);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const isFirstRender = useRef<boolean>(true);

  return <cartContext.Provider value={{ cart }}></cartContext.Provider>;
}

export default CartProvider;

export function useCart() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("Can't use cart context outside cart provider !!");
  }
  return context;
}

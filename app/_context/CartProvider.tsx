import { createContext, useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

interface CartProviderProps {}

function CartProvider({}: CartProviderProps) {
  const { 0: cart, 1: setCart } = useState<ICart>(initialState.cart);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const isFirstRender = useRef<boolean>(true);

  return (
    <cartContext.Provider value={{ cart, setCart }}></cartContext.Provider>
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

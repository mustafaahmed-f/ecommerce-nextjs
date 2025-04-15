import { createContext, useContext } from "react";

const cartContext = createContext<any>({});

interface CartProviderProps {}

function CartProvider({}: CartProviderProps) {
  return <cartContext.Provider value={{}}></cartContext.Provider>;
}

export default CartProvider;

export function useCart() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("Can't use cart context outside cart provider !!");
  }
  return context;
}

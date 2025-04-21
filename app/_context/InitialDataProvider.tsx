import { cookies } from "next/headers";
import { getCategories } from "../_lib/APIs/categoriesAPIs";
import { getAllProducts } from "../_lib/APIs/productsAPIs";
import { getUserCart } from "../_lib/APIs/loggedInCartAPIs";
import { getOfflineCart } from "../_lib/APIs/offlineCartAPIs";
import { Providers } from "../Providers";
import UserProvider from "./UserProvider";
import CartProvider from "./CartProvider";
import { ICart } from "../cart/_types/CartType";

interface InitialDataProviderProps {
  user: any;
  children: React.ReactNode;
}

async function InitialDataProvider({
  user,
  children,
}: InitialDataProviderProps) {
  const isAuth: boolean = user ? true : false;
  const cookieStore = cookies();

  const offLineCartId = cookieStore.get(
    process.env.NEXT_PUBLIC_OFFLINE_CART_KEY!,
  )?.value;

  const cookieHeader = {
    Cookie: cookieStore.toString(), // this includes next_ecommerce_token
  };

  const getCartMethod = isAuth
    ? async () => await getUserCart(cookieHeader)
    : offLineCartId
      ? async () => await getOfflineCart(offLineCartId)
      : async () => await Promise.resolve();

  const initalCart: ICart = {
    _id: "",
    userID: "",
    products: [],
    subTotal: 0,
  };

  const {
    0: categories,
    1: products,
    2: cart,
  } = await Promise.all([getCategories(), getAllProducts(), getCartMethod()]);
  return (
    <Providers
      intitialCategories={categories.success ? categories : { categories: [] }}
      initialProducts={products.success ? products.products : []}
    >
      <UserProvider user={user}>
        <CartProvider cart={cart ? cart.cart : initalCart}>
          {children}
        </CartProvider>
      </UserProvider>
    </Providers>
  );
}

export default InitialDataProvider;

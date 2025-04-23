import { cookies } from "next/headers";
import { getCategories } from "../_lib/APIs/categoriesAPIs";
import { getUserCart, mergeCarts } from "../_lib/APIs/loggedInCartAPIs";
import { getOfflineCart } from "../_lib/APIs/offlineCartAPIs";
import { getAllProducts } from "../_lib/APIs/productsAPIs";
import { mergeCartsFn } from "../_lib/MergeCarts";
import { ICart } from "../cart/_types/CartType";
import { Providers } from "../Providers";
import CartProvider from "./CartProvider";
import UserProvider from "./UserProvider";

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
  const getAuthCartMethod = isAuth
    ? async () => await getUserCart(cookieHeader)
    : async () => await Promise.resolve();
  const getOfflineCartMethod = offLineCartId
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
    2: AuthCart,
    3: OfflineCart,
  } = await Promise.all([
    getCategories(),
    getAllProducts(),
    getAuthCartMethod(),
    getOfflineCartMethod(),
  ]);

  let isMerged: boolean = false;
  let finalCart: ICart = initalCart;

  try {
    if (isAuth && offLineCartId) {
      let mergedCart: ICart = mergeCartsFn(AuthCart.cart, OfflineCart.cart);
      let response = await mergeCarts(
        AuthCart.cart._id,
        mergedCart,
        cookieHeader,
      );
      if (response.success) {
        finalCart = response.cart;
        isMerged = true;
      } else {
        finalCart = AuthCart.cart;
      }
    } else if (isAuth || offLineCartId) {
      finalCart = isAuth ? AuthCart.cart : OfflineCart.cart;
    } else {
      finalCart = initalCart;
    }
  } catch (error: any) {
    console.log(`Error during merging carts : ${error.message}`);
    finalCart = initalCart;
  }

  return (
    <Providers
      intitialCategories={categories.success ? categories : { categories: [] }}
      initialProducts={products.success ? products.products : []}
    >
      <UserProvider user={user}>
        <CartProvider cart={finalCart} isMerged={isMerged}>
          {children}
        </CartProvider>
      </UserProvider>
    </Providers>
  );
}

export default InitialDataProvider;

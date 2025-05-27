import { cookies } from "next/headers";
import { getCategories } from "../_lib/APIs/categoriesAPIs";
import { getUserCart, mergeCarts } from "../_lib/APIs/loggedInCartAPIs";
import { getOfflineCart } from "../_lib/APIs/offlineCartAPIs";
import { getAllProducts } from "../_lib/APIs/productsAPIs";
import { mergeCartsFn } from "../_lib/MergeCarts";
import { ICart } from "../cart/_types/CartType";
import Providers from "./Providers";

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
    ? () => getUserCart(cookieHeader)
    : () => Promise.resolve();
  const getOfflineCartMethod = offLineCartId
    ? () => getOfflineCart(offLineCartId)
    : () => Promise.resolve();

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
      initialCategories={categories.success ? categories : [{ categories: [] }]}
      initialProducts={products.success ? products.products : []}
      user={user}
      cart={finalCart}
      isMerged={isMerged}
    >
      {children}
    </Providers>
  );
}

export default InitialDataProvider;

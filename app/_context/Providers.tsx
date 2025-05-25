// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { Provider } from "react-redux";
import AlertContextProvider from "./AlertProvider";
import CategoriesProvider from "./CategoriesProvider";
import NextNavigationProvider from "./NextNavigationProvider";
import ProductsProvider from "./ProductsProvider";
import { store } from "../_lib/store/store";
import { ICart } from "../cart/_types/CartType";
import UserProvider from "./UserProvider";
import CartProvider from "./CartProvider";

interface ProvidersProps {
  children: React.ReactNode;
  initialCategories: any;
  initialProducts: any[];
  user: any;
  cart: ICart;
  isMerged: boolean;
}

function Providers({
  children,
  initialCategories,
  initialProducts,
  user,
  cart,
  isMerged,
}: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24,
          },
        },
      }),
  );

  return (
    <Provider store={store}>
      <UserProvider user={user}>
        <CartProvider cart={cart} isMerged={isMerged}>
          <QueryClientProvider client={queryClient}>
            <CategoriesProvider intitialCategories={initialCategories}>
              <ProductsProvider
                intitialCategories={initialCategories}
                initialProducts={initialProducts}
              >
                <AlertContextProvider>
                  <NextNavigationProvider>{children}</NextNavigationProvider>
                </AlertContextProvider>
              </ProductsProvider>
            </CategoriesProvider>
          </QueryClientProvider>
        </CartProvider>
      </UserProvider>
    </Provider>
  );
}

export default Providers;

// app/providers.tsx
"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import AlertContextProvider from "./_context/AlertProvider";
import CategoriesProvider from "./_context/CategoriesProvider";
import { store } from "./_lib/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsProvider from "./_context/ProductsProvider";
import NextNavigationProvider from "./_context/NextNavigationProvider";

interface ProvidersProps {
  children: React.ReactNode;
  intitialCategories: any;
  initialProducts: any[];
}

export function Providers({
  children,
  intitialCategories,
  initialProducts,
}: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CategoriesProvider intitialCategories={intitialCategories}>
          <ProductsProvider
            intitialCategories={intitialCategories}
            initialProducts={initialProducts}
          >
            <AlertContextProvider>
              <NextNavigationProvider>{children}</NextNavigationProvider>
            </AlertContextProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </QueryClientProvider>
    </Provider>
  );
}

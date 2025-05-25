// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { Provider } from "react-redux";
import AlertContextProvider from "./_context/AlertProvider";
import CategoriesProvider from "./_context/CategoriesProvider";
import NextNavigationProvider from "./_context/NextNavigationProvider";
import ProductsProvider from "./_context/ProductsProvider";
import { store } from "./_lib/store/store";

interface ProvidersProps {
  children: React.ReactNode;
  intitialCategories: any;
  initialProducts: any[];
}

function Providers({
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
      }),
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

export default Providers;

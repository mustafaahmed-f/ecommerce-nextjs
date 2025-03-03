// app/providers.tsx
"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import AlertContextProvider from "./_context/AlertProvider";
import CategoriesProvider from "./_context/CategoriesProvider";
import { store } from "./_lib/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CategoriesProvider
          intitialCategories={intitialCategories}
          initialProducts={initialProducts}
        >
          <AlertContextProvider>{children}</AlertContextProvider>
        </CategoriesProvider>
      </QueryClientProvider>
    </Provider>
  );
}

// app/providers.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./_lib/store/store";
import AlertContextProvider from "./_context/AlertProvider";
import CategoriesProvider from "./_context/CategoriesProvider";

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
  return (
    <Provider store={store}>
      <CategoriesProvider
        intitialCategories={intitialCategories}
        initialProducts={initialProducts}
      >
        <AlertContextProvider>{children}</AlertContextProvider>
      </CategoriesProvider>
    </Provider>
  );
}

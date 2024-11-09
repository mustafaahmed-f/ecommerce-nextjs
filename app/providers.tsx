// app/providers.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./_lib/store/store";
import AlertContextProvider from "./_context/AlertProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AlertContextProvider>{children}</AlertContextProvider>
    </Provider>
  );
}

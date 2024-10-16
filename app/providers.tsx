// app/providers.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import { wrapper } from "./_lib/store/store"; // Adjust the path to your store
import { AppProps } from "next/app";

export function Providers({ children }: { children: React.ReactNode }) {
  const { store } = wrapper.useWrappedStore({} as AppProps);
  // const store = wrapper.getStore();

  return <Provider store={store}>{children}</Provider>;
}

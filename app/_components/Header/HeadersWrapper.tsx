"use client";

import CategoriesProvider from "@/app/_context/CategoriesProvider";
import { signIn } from "@/app/_lib/store/slices/userSlice/userSlice";
import { store } from "@/app/_lib/store/store";
import { Providers } from "@/app/Providers";
import { useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeadersWrapperProps {
  categories: any[];
  products: any;
  loggedUser: any | null;
}

function HeadersWrapper({
  categories,
  products,
  loggedUser = null,
}: HeadersWrapperProps) {
  useEffect(() => {
    if (loggedUser && store.getState().user.email === "") {
      store.dispatch(signIn(loggedUser));
    }
  }, [loggedUser]);

  return (
    <Providers>
      <CategoriesProvider
        intitialCategories={categories}
        initialProducts={products?.products}
      >
        <DesktopHeader />
        <MobileHeader />
      </CategoriesProvider>
    </Providers>
  );
}

export default HeadersWrapper;

"use client";

import CategoriesProvider from "@/app/_context/CategoriesProvider";
import React, { useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useAppDispatch, useAppSelector } from "@/app/_lib/store/store";
import { Providers } from "@/app/Providers";
import { signIn } from "@/app/_lib/store/slices/userSlice/userSlice";

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
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (loggedUser) {
      dispatch(signIn(loggedUser));
    }
  }, [loggedUser, dispatch]);

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

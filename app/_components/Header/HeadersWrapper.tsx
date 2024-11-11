"use client";

import CategoriesProvider from "@/app/_context/CategoriesProvider";
import React from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useAppSelector } from "@/app/_lib/store/store";
import { Providers } from "@/app/Providers";

interface HeadersWrapperProps {
  categories: any[];
  products: any;
}

function HeadersWrapper({ categories, products }: HeadersWrapperProps) {
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

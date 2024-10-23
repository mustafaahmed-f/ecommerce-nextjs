"use client";

import CategoriesProvider from "@/app/_context/CategoriesProvider";
import React from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeadersWrapperProps {
  categories: any[];
  products: any;
}

function HeadersWrapper({ categories, products }: HeadersWrapperProps) {
  return (
    <CategoriesProvider
      intitialCategories={categories}
      initialProducts={products?.products}
    >
      <DesktopHeader />
      <MobileHeader />
    </CategoriesProvider>
  );
}

export default HeadersWrapper;

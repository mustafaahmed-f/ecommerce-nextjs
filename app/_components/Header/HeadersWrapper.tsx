"use client";

import CategoriesProvider from "@/app/_context/CategoriesProvider";
import React from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeadersWrapperProps {
  categories: any;
}

function HeadersWrapper({ categories }: HeadersWrapperProps) {
  return (
    <CategoriesProvider categories={categories}>
      <DesktopHeader />
      <MobileHeader />
    </CategoriesProvider>
  );
}

export default HeadersWrapper;

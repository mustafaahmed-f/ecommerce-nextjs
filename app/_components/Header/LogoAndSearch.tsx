import React from "react";
import MainLogo from "../MainLogo";
import ProductSearchDiv from "./ProductSearchDiv";

interface LogoAndSearchProps {}

function LogoAndSearch({}: LogoAndSearchProps) {
  return (
    <div className="flex items-center md:gap-40 sm:justify-between md:justify-start">
      <MainLogo />
      <ProductSearchDiv />
    </div>
  );
}

export default LogoAndSearch;

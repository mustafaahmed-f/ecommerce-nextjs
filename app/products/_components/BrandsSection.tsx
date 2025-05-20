import React from "react";
import BrandsSectionClients from "./BrandsSectionClients";

interface BrandsSectionProps {
  brands: any[];
}

function BrandsSection({ brands }: BrandsSectionProps) {
  return <BrandsSectionClients brands={brands} />;
}

export default BrandsSection;

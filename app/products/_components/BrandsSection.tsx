import React from "react";
import BrandsSectionClients from "./BrandsSectionClients";

interface BrandsSectionProps {
  brands: any[];
}

function BrandsSection({ brands }: BrandsSectionProps) {
  // const brands: { success: boolean; brands: string[] } = await getBrands();
  return <BrandsSectionClients brands={brands} />;
}

export default BrandsSection;

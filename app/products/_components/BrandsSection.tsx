import React from "react";

interface BrandsSectionProps {
  brands: string[];
  isSelected?: boolean;
}

function BrandsSection({ brands, isSelected = false }: BrandsSectionProps) {
  return (
    <div className="filter-sections">
      <p className="font-semibold">Brands</p>
      <div className="flex flex-wrap items-center">
        {brands.map((el, i) => (
          <div
            className={`py-1 px-2 border-2 border-[#D9D9D9] rounded-sm m-1 font-semibold${
              isSelected ? "bg-[#D1E2EB]" : ""
            }`}
            key={i}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandsSection;

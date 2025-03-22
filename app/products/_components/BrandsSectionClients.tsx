"use client";

import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { useState } from "react";
import SingleBrands from "./SingleBrands";

interface BrandsSectionClientsProps {
  brands: string[];
}

function BrandsSectionClients({
  brands: fetchedBrands,
}: BrandsSectionClientsProps) {
  const { searchParams, pathName, router } = useNextNavigation();
  const brandsArray = searchParams.get("brand")?.split("/") ?? [];
  const { 0: brands, 1: setBrands } = useState<string[]>(brandsArray);

  function handleSelectBrand(brand: string) {
    let params = new URLSearchParams(searchParams);
    if (brands.includes(brand)) {
      let newBrands = brands.filter((el) => el !== brand);
      params.set("brand", newBrands.join("/"));
      setBrands(newBrands);
    } else {
      params.set("brand", [...brands, brand].join("/"));
      setBrands([...brands, brand]);
    }
    params.set("page", "1");
    router.replace(`${pathName}?${params.toString()}`);
  }
  // console.log("Brands : ", brands);
  let brandsLength = brands.length
    ? brands[0] === ""
      ? brands.length - 1
      : brands.length
    : 0;
  return (
    <div className="filter-sections">
      <div className="flex gap-3">
        <h6 className="font-semibold text-base uppercase">Brands</h6>
        {brandsLength ? (
          <span className="text-sm text-gray-400">{brandsLength} selected</span>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 max-h-64 overflow-y-scroll overflow-x-hidden brands-section">
        {fetchedBrands?.map((el, i) => (
          <SingleBrands
            key={i}
            checked={brands.includes(el)}
            brandName={el}
            onSelect={handleSelectBrand}
          />
        ))}
      </div>
    </div>
  );
}

export default BrandsSectionClients;

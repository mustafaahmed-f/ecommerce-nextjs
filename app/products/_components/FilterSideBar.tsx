"use client";

import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import AllCategoriesSVG from "@/app/_icons/AllCategoriesSVG";
import Link from "next/link";
import BrandsSection from "./BrandsSection";
import ColorsSection from "./ColorsSection";
import PriceRange from "./PriceRange";

interface FilterSideBarProps {
  brands: any[];
}

function FilterSideBar({ brands }: FilterSideBarProps) {
  const { searchParams, pathName, router } = useNextNavigation();

  const isFilter = searchParams.get("filter") ?? "";

  function handleCloseSideBar() {
    let params = new URLSearchParams(searchParams);
    params.set("filter", "false");
    router.replace(`${pathName}?${params.toString()}`);
  }

  return (
    <div
      className={`${
        isFilter === "true"
          ? "block max-sm:absolute max-sm:bottom-0 max-sm:left-0 max-sm:top-0 max-sm:z-50"
          : "hidden"
      } sm:block`}
    >
      <div className="flex min-h-full max-w-[320px] flex-col items-center gap-5 bg-slate-50 px-3 py-4">
        <div className="flex w-full items-center p-4 max-sm:justify-between sm:justify-center">
          <div className="sidebar-item flex items-center justify-start gap-3">
            <AllCategoriesSVG />
            <Link
              href={`/products?${searchParams.toString()}`}
              className="text-base font-bold"
            >
              All Categories
            </Link>
          </div>
          <button
            className="hidden cursor-pointer max-sm:block"
            onClick={handleCloseSideBar}
          >
            X
          </button>
        </div>
        <BrandsSection brands={brands} />
        <ColorsSection />
        <PriceRange />
      </div>
    </div>
  );
}

export default FilterSideBar;

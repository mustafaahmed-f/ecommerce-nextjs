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

  console.log("isFilter", isFilter);

  function handleCloseSideBar() {
    let params = new URLSearchParams(searchParams);
    params.set("filter", "false");
    router.replace(`${pathName}?${params.toString()}`);
  }

  return (
    <div
      className={`${
        isFilter === "true"
          ? "block max-sm:absolute max-sm:top-0 max-sm:bottom-0 max-sm:left-0 max-sm:z-50"
          : "hidden"
      } sm:block`}
    >
      <div className="flex flex-col bg-slate-50 items-center min-h-full gap-5 max-w-[320px] py-4 px-3 ">
        <div className="flex items-center sm:justify-center max-sm:justify-between w-full p-4 ">
          <div className="flex items-center justify-start gap-3 sidebar-item">
            <AllCategoriesSVG />
            <Link
              href={`/products?${searchParams.toString()}`}
              className="font-bold text-base"
            >
              All Categories
            </Link>
          </div>
          <button
            className="cursor-pointer max-sm:block hidden"
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

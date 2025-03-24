"use client";

import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import AllCategoriesSVG from "@/app/_icons/AllCategoriesSVG";
import Link from "next/link";
import BrandsSection from "./BrandsSection";
import ColorsSection from "./ColorsSection";
import PriceRange from "./PriceRange";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FilterSideBarProps {
  brands: any[];
}

function FilterSideBar({ brands }: FilterSideBarProps) {
  const { searchParams, pathName, router } = useNextNavigation();
  const { 0: isMobileDevice, 1: setIsMobileDevice } = useState(
    window.innerWidth <= 640,
  );

  const isFilter = searchParams.get("filter") === "true";

  function handleCloseSideBar() {
    let params = new URLSearchParams(searchParams);
    params.set("filter", "false");
    router.replace(`${pathName}?${params.toString()}`);
  }

  useEffect(() => {
    function handleScreenSizeChangeHandler() {
      setIsMobileDevice(window.innerWidth <= 640);
    }

    window.addEventListener("resize", handleScreenSizeChangeHandler);

    return () =>
      window.removeEventListener("resize", handleScreenSizeChangeHandler);
  }, []);

  return (
    <>
      {isMobileDevice && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isFilter ? "0%" : "-100%" }}
          transition={{ type: "tween", duration: 0.4 }}
          // exit={{ x: "-100%" }}
          className={`max-sm:absolute max-sm:bottom-0 max-sm:left-0 max-sm:top-0 max-sm:z-50`}
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
        </motion.div>
      )}
      {!isMobileDevice && (
        <div className={`hidden sm:block`}>
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
      )}
    </>
  );
}

export default FilterSideBar;

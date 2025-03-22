"use client";

import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import React from "react";
import MinimumDistanceSlider from "./MinimumDistanceSlider";

interface PriceRangeProps {}

const minDistance = 10;

function PriceRange({}: PriceRangeProps) {
  const { searchParams, pathName, router } = useNextNavigation();
  let params = new URLSearchParams(searchParams);
  let minPrice = params.get("priceMin");
  let maxPrice = params.get("priceMax");
  const [value, setValue] = React.useState<number[]>([
    !parseInt(minPrice!) || parseInt(minPrice!) < 0 ? 0 : parseInt(minPrice!),
    !parseInt(maxPrice!) ||
    parseInt(maxPrice!) < 0 ||
    parseInt(maxPrice!) > 10000
      ? 10000
      : parseInt(maxPrice!),
  ]);
  const timeOut = React.useRef<NodeJS.Timeout | null>(null);

  function handleMinValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") return;
    if (timeOut.current) clearTimeout(timeOut.current);
    let params = new URLSearchParams(searchParams);
    setValue([parseInt(e.target.value), value[1]]);
    timeOut.current = setTimeout(() => {
      params.set(
        "priceMin",
        Math.min(parseInt(e.target.value), value[1] - minDistance).toString()
      );
      params.set("page", "1");
      router.replace(`${pathName}?${params.toString()}`);
    }, 1000);
  }

  function handleMaxValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") return;
    if (timeOut.current) clearTimeout(timeOut.current);
    let params = new URLSearchParams(searchParams);
    setValue([value[0], parseInt(e.target.value)]);
    timeOut.current = setTimeout(() => {
      params.set(
        "priceMax",
        Math.max(parseInt(e.target.value), value[0] + minDistance).toString()
      );
      params.set("page", "1");
      router.replace(`${pathName}?${params.toString()}`);
    }, 1000);
  }

  return (
    <div className="filter-sections">
      <p className="font-semibold uppercase">Price</p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-nowrap items-center justify-between">
          <div className=" border-[#D9D9D9] border-2 rounded-md px-4 py-3 w-[87px] h-[40px] flex items-center justify-center">
            <span className="mr-1">$</span>
            <input
              value={value[0]}
              className="border-0 bg-slate-200 text-center focus:outline-none  max-w-full"
              onChange={(e) => handleMinValueChange(e)}
            />
          </div>
          <span>-</span>
          <div className=" border-[#D9D9D9] border-2 rounded-md px-4 py-3 w-[87px] h-[40px] flex items-center justify-center">
            <span className="mr-1">$</span>
            <input
              value={value[1]}
              className="border-0 bg-slate-200 focus:outline-none text-center max-w-full"
              onChange={(e) => handleMaxValueChange(e)}
            />
          </div>
        </div>
        <MinimumDistanceSlider value={value} setValue={setValue} />
      </div>
      <div>
        <div className="flex flex-col gap-2 items-center justify-between mb-3 text-[#9D9D9D]">
          <p>Minimum $ 0</p>
          <p>Maximum $ 10000</p>
        </div>
      </div>
    </div>
  );
}

export default PriceRange;

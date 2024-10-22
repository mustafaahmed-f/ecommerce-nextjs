"use client";

import React from "react";
import MinimumDistanceSlider from "./MinimumDistanceSlider";

interface PriceRangeProps {}

function PriceRange({}: PriceRangeProps) {
  const [value, setValue] = React.useState<number[]>([10, 50]);
  return (
    <div className="filter-sections">
      <p className="font-semibold">Price</p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-nowrap items-center justify-between">
          <div className=" border-[#D9D9D9] border-2 rounded-md px-4 py-3">
            $ 0
          </div>
          <span>-</span>
          <div className=" border-[#D9D9D9] border-2 rounded-md px-4 py-3">
            $ 8000
          </div>
        </div>
        <MinimumDistanceSlider value={value} setValue={setValue} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-3 text-[#9D9D9D]">
          <p>Minimum $ 0</p>
          <p>Maximum $ 8000</p>
        </div>
        <p>878 products found</p>
      </div>
    </div>
  );
}

export default PriceRange;

import ArrowDown from "@/app/_icons/ArrowDown";
import React from "react";

interface SortBtnProps {}

function SortBtn({}: SortBtnProps) {
  return (
    <button className="border border-[#7B7B7B] text-[#555555] flex items-center justify-center gap-2 px-2 px-3">
      Sort by order
      <ArrowDown />
    </button>
  );
}

export default SortBtn;

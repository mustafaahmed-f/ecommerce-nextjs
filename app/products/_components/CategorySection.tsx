import React from "react";
import SortBtn from "./SortBtn";

interface CategorySectionProps {}

function CategorySection({}: CategorySectionProps) {
  return (
    <div className="py-6 px-12 bg-bgGrey flex items-center justify-between">
      <div className="flex items-center gap-3">
        <p className="font-semibold text-black">Woman</p>
        <p className="text-[#555555]">110 items</p>
      </div>
      <SortBtn />
    </div>
  );
}

export default CategorySection;

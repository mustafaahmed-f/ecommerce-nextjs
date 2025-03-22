"use client";

import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import FilterIcon from "@/app/_icons/FilterIcon";

interface FilterBtnProps {}

function FilterBtn({}: FilterBtnProps) {
  const { searchParams, pathName, router } = useNextNavigation();
  function handleOpenFilter() {
    let params = new URLSearchParams(searchParams);
    params.set("filter", "true");
    router.replace(`${pathName}?${params.toString()}`);
  }
  return (
    <button
      className="flex cursor-pointer items-center justify-center gap-2 border border-[#7B7B7B] px-2 py-3 text-[#555555] hover:bg-slate-50 sm:hidden"
      onClick={handleOpenFilter}
    >
      Filter
      <FilterIcon />
    </button>
  );
}

export default FilterBtn;

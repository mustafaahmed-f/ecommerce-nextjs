"use client";
import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import ArrowDown from "@/app/_icons/ArrowDown";
import { useEffect, useState } from "react";
import SortDropList from "./SortDropList";
import SortPills from "./SortPills";

interface SortBtnProps {}

function SortBtn({}: SortBtnProps) {
  const { searchParams, pathName, router } = useNextNavigation();
  const sortArray = searchParams.get("sort")?.split("/");
  const { 0: selected, 1: setSelected } = useState<string[]>(
    sortArray
      ? sortArray.length === 1 && sortArray[0] === ""
        ? []
        : sortArray
      : [],
  );
  const { 0: descending, 1: setDescending } = useState<string[]>(
    searchParams
      .get("sort")
      ?.split("/")
      .filter((el) => /^-/.test(el)) ?? [],
  );
  const { 0: showDropList, 1: setShowDropList } = useState<boolean>(false);

  const sortOptions: string[] = ["title", "price", "rating"];

  function handleSelection(
    option: string,
    e: React.MouseEvent<HTMLDivElement>,
  ) {
    let params = new URLSearchParams(searchParams);
    const regex = new RegExp(`^-?${option}$`);
    let sortOption = `${descending.includes(option) ? "-" : ""}${option}`;
    const newSelections = selected.some((option) => regex.test(option))
      ? selected.filter((el) => !regex.test(el))
      : [...selected, sortOption];
    params.set("sort", newSelections.join("/"));
    router.replace(`${pathName}?${params.toString()}`);
    setSelected(newSelections);
  }

  function toggleDropList() {
    setShowDropList(!showDropList);
  }

  useEffect(() => {
    function closeDropList(e: MouseEvent) {
      // const btn = document.querySelector(".showDropListBtn");
      const dropList = document.querySelector("#sortDropList");
      if (dropList?.contains(e.target as Node)) return;
      else if (showDropList && !(e.target as HTMLElement).closest("#sortBtn"))
        setShowDropList((prev) => {
          if (prev) return false;
          return prev;
        });
    }
    document.addEventListener("click", closeDropList);
    return () => document.removeEventListener("click", closeDropList);
  }, [showDropList, setShowDropList]);

  return (
    <div className="relative">
      <button
        onClick={toggleDropList}
        id="sortBtn"
        className="showDropListBtn flex max-w-56 cursor-pointer items-center justify-center gap-2 border border-[#7B7B7B] px-2 py-3 text-[#555555] hover:bg-slate-50"
      >
        <div className="flex w-full flex-wrap items-center justify-center gap-1">
          <p>Sort by</p>
          {selected.length ? <span className="my-1">:</span> : null}
          {selected.length
            ? selected.map((select: string, i: number) => (
                <SortPills key={i}>{select}</SortPills>
              ))
            : ""}
        </div>
        <ArrowDown />
      </button>
      {showDropList && (
        <SortDropList
          options={sortOptions}
          descending={descending}
          setDescending={setDescending}
          selected={selected}
          setSelected={setSelected}
          handleSelection={handleSelection}
        />
      )}
    </div>
  );
}

export default SortBtn;

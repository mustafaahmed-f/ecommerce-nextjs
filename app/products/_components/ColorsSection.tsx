"use client";

import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { colorsArray } from "@/app/_lib/colorsArray";
import { useState } from "react";
import ColorIndicator from "./ColorIndicator";

function ColorsSection() {
  const { searchParams, pathName, router } = useNextNavigation();

  const { 0: selectedColors, 1: setSelectedColors } = useState<string[]>(
    searchParams.get("color")?.split("/") || []
  );

  function handleSelectColor(color: string) {
    let params = new URLSearchParams(searchParams);
    if (selectedColors.includes(color)) {
      let newColors = selectedColors.filter((el) => el !== color);
      params.set("color", newColors.join("/"));
      setSelectedColors(newColors);
    } else {
      params.set("color", [...selectedColors, color].join("/"));
      setSelectedColors([...selectedColors, color]);
    }
    params.set("page", "1");
    router.replace(`${pathName}?${params.toString()}`);
  }
  // console.log("Colors array :", colorsArray);
  return (
    <div className="filter-sections">
      <p className="font-semibold uppercase">Colors</p>
      <div className="flex flex-wrap gap-2 items-center">
        {colorsArray.map((el: { colorString: string; colorHex: string }, i) => (
          <div
            key={i}
            className="m-1"
            onClick={() => handleSelectColor(el.colorString)}
          >
            <ColorIndicator
              isSelected={selectedColors.includes(el.colorString)}
              colorHex={el.colorHex}
              colorString={el.colorString}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorsSection;

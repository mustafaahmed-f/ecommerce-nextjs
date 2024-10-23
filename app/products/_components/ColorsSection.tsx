import React from "react";
import ColorIndicator from "./ColorIndicator";
import { colorMap } from "@/app/_lib/colorsArray";

interface ColorsSectionProps {
  products: any[];
}

function ColorsSection({ products }: ColorsSectionProps) {
  const colors: string[] = products
    .map((el) => el.color ?? "black")
    .filter((el, i, arr) => arr.indexOf(el) === i);

  return (
    <div className="filter-sections">
      <p className="font-semibold">Colors</p>
      <div className="flex flex-wrap gap-2 items-center">
        {colors.map((el: string, i) => (
          <div key={i} className="my-1">
            <ColorIndicator color={colorMap.get(el) as string} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorsSection;

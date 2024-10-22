import React from "react";
import ColorIndicator from "./ColorIndicator";

interface ColorsSectionProps {
  colors: string[];
}

function ColorsSection({ colors }: ColorsSectionProps) {
  return (
    <div className="filter-sections">
      <p className="font-semibold">Colors</p>
      <div className="flex flex-wrap gap-2 items-center">
        {colors.map((el, i) => (
          <div key={i} className="my-1">
            <ColorIndicator color={el} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorsSection;

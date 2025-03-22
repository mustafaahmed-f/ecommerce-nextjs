import CheckIcon from "@/app/_icons/CheckIcon";
import React from "react";

interface ColorIndicatorProps {
  colorHex: string;
  colorString: string;
  isSelected?: boolean;
}

function ColorIndicator({
  colorHex,
  colorString,
  isSelected = false,
}: ColorIndicatorProps) {
  return (
    <div
      className={`color-indicator w-6 h-6 rounded-full cursor-pointer flex items-center justify-center relative`}
      style={{ backgroundColor: colorHex }}
      // title={colorString}
    >
      {isSelected && <CheckIcon isWhite={colorString === "white"} />}
      <span className="color-tooltip invisible absolute group-hover:visible transition-opacity bottom-full px-2 py-1 bg-black text-white text-xs rounded-md my-2">
        {colorString}
      </span>
    </div>
  );
}

export default ColorIndicator;

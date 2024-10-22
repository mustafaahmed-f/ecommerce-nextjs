import CheckIcon from "@/app/_icons/CheckIcon";
import React from "react";
import tinycolor from "tinycolor2";

interface ColorIndicatorProps {
  color: string;
  isSelected?: boolean;
}

function ColorIndicator({ color, isSelected = false }: ColorIndicatorProps) {
  let colorHex = tinycolor(color).toHexString();

  return (
    <div className={`w-6 h-6 rounded-full bg-${colorHex}`}>
      {isSelected && <CheckIcon isWhite={color === "white"} />}
    </div>
  );
}

export default ColorIndicator;

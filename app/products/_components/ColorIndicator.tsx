import CheckIcon from "@/app/_icons/CheckIcon";
import React from "react";

interface ColorIndicatorProps {
  color: string;
  isSelected?: boolean;
}

function ColorIndicator({ color, isSelected = false }: ColorIndicatorProps) {
  return (
    <div className={`w-6 h-6 rounded-full bg-${color}`}>
      {isSelected && <CheckIcon isWhite={color === "#FFFFFF"} />}
    </div>
  );
}

export default ColorIndicator;

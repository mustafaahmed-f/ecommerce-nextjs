import React from "react";

interface ChipProps {
  label: string;
  size?: "small" | "medium";
  className?: string;
  style?: React.CSSProperties;
}

export default function Chip({
  label,
  size = "medium",
  className = "",
  style,
}: ChipProps) {
  // Define size styles roughly like MUI's Chip small/medium
  const sizeStyles = {
    small: "text-xs px-2 py-0.5",
    medium: "text-sm px-3 py-1",
  };

  return (
    <span
      className={`inline-block rounded-full border font-medium capitalize ${sizeStyles[size]} ${className}`}
      style={style}
    >
      {label}
    </span>
  );
}

// components/icons/CartCheckIcon.tsx
import React from "react";

export default function CartCheckIcon({
  size = 24,
  className = "",
  checkColor = "#22c55e", // Tailwind's green-500
}: {
  size?: number;
  className?: string;
  checkColor?: string;
}) {
  const cartSize = size;
  const checkSize = size * 0.6;
  const checkOffset = size * 0.25;

  return (
    <svg
      className={className}
      width={size}
      height={size + 8} // Extra space for check mark
      viewBox="0 0 24 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Check Circle */}
      <circle
        cx="12"
        cy="6"
        r="4"
        fill="white"
        stroke={checkColor}
        strokeWidth="2"
      />
      <path d="M10.5 6.5l1.5 1.5 3-3" stroke={checkColor} strokeWidth="2" />

      {/* Cart */}
      <circle cx="9" cy="27" r="1" />
      <circle cx="20" cy="27" r="1" />
      <path d="M1 7h4l1.68 9.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 12H6" />
    </svg>
  );
}

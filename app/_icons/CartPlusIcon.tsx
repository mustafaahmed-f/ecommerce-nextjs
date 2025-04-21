// components/icons/CartPlusIcon.tsx
import React from "react";

export default function CartPlusIcon({
  size = 24,
  className = "my-auto",
  plusColor = "#3B82F6", // Tailwind's blue-500 as default
}: {
  size?: number;
  className?: string;
  plusColor?: string;
}) {
  const cartSize = size;
  const plusSize = size * 0.6;
  const plusOffset = size * 0.25;

  return (
    <svg
      className={className}
      width={size}
      height={size + 8} // Make room for the plus
      viewBox="0 0 24 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Plus Icon */}
      <g stroke={plusColor}>
        <line x1="12" y1="2" x2="12" y2="8" />
        <line x1="9" y1="5" x2="15" y2="5" />
      </g>

      {/* Cart */}
      <circle cx="9" cy="27" r="1" />
      <circle cx="20" cy="27" r="1" />
      <path d="M1 7h4l1.68 9.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 12H6" />
    </svg>
  );
}

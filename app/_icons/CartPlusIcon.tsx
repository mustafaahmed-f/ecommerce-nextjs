// components/icons/CartPlusIcon.tsx
import React from "react";

export default function CartPlusIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l1.68 9.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      <line x1="16" y1="3" x2="16" y2="9" />
      <line x1="13" y1="6" x2="19" y2="6" />
    </svg>
  );
}

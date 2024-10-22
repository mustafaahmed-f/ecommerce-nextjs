import React from "react";

interface ArrowDownProps {}

function ArrowDown({}: ArrowDownProps) {
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 0.9375L6 5.3125L11 0.9375"
        stroke="#7B7B7B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ArrowDown;

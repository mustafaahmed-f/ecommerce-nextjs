import React from "react";

interface HalfStarProps {}

function HalfStar({}: HalfStarProps) {
  return (
    <svg
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.3366 6.91521L21.7992 7.99206L16.3992 13.2192L17.674 20.6L10.9992 17.1152L4.32445 20.6L5.59922 13.2192L0.199219 7.99206L7.66184 6.91521L10.9992 0.199951L14.3366 6.91521Z"
        fill="#FFC000"
      />
    </svg>
  );
}

export default HalfStar;

import React from "react";

interface HalfStarProps {}

function HalfStar({}: HalfStarProps) {
  return (
    <div className="flex">
      <svg
        width="11"
        height="21"
        viewBox="0 0 11 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.9992 0.199951V17.1152L4.32445 20.6L5.59922 13.2192L0.199219 7.99206L7.66184 6.91521L10.9992 0.199951V0.199951Z"
          fill="#FFC000"
        />
      </svg>
      <svg
        width="11"
        height="21"
        viewBox="0 0 11 21"
        style={{
          transform: "rotateY(180deg)",
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.9992 0.199951V17.1152L4.32445 20.6L5.59922 13.2192L0.199219 7.99206L7.66184 6.91521L10.9992 0.199951V0.199951Z"
          stroke="#C4C4C4"
        />
      </svg>
    </div>
  );
}

export default HalfStar;

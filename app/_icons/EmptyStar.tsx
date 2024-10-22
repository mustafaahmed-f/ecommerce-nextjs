import React from "react";

interface EmptyStarProps {}

function EmptyStar({}: EmptyStarProps) {
  return (
    <svg
      width="17"
      height="15"
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5859 5.44728L15.25 6.12031L11.875 9.38725L12.6717 14.0002L8.5 11.8223L4.32827 14.0002L5.125 9.38725L1.75 6.12031L6.41414 5.44728L8.5 1.25024L10.5859 5.44728Z"
        fill="white"
        stroke="#C4C4C4"
      />
    </svg>
  );
}

export default EmptyStar;

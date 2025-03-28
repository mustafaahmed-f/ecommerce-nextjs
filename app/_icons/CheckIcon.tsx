import React from "react";

interface CheckIconProps {
  isWhite: boolean;
}

function CheckIcon({ isWhite }: CheckIconProps) {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.17062 8.41519L12.4881 0.994457C12.7768 0.701717 13.2448 0.701717 13.5335 0.994457C13.8222 1.2872 13.8222 1.76182 13.5335 2.05456L5.6933 10.0053C5.40463 10.2981 4.93661 10.2981 4.64794 10.0053L0.466501 5.76493C0.177833 5.47219 0.177833 4.99756 0.466501 4.70482C0.755169 4.41208 1.22319 4.41208 1.51186 4.70482L5.17062 8.41519Z"
        fill={!isWhite ? "white" : "#C4C4C4"}
      />
    </svg>
  );
}

export default CheckIcon;

/*
<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.17062 8.41519L12.4881 0.994457C12.7768 0.701717 13.2448 0.701717 13.5335 0.994457C13.8222 1.2872 13.8222 1.76182 13.5335 2.05456L5.6933 10.0053C5.40463 10.2981 4.93661 10.2981 4.64794 10.0053L0.466501 5.76493C0.177833 5.47219 0.177833 4.99756 0.466501 4.70482C0.755169 4.41208 1.22319 4.41208 1.51186 4.70482L5.17062 8.41519Z" fill="#C4C4C4"/>
</svg>


*/

import React from "react";

interface FacebookIconProps {}

function FacebookIcon({}: FacebookIconProps) {
  return (
    <svg
      width="12"
      height="18"
      viewBox="0 0 12 18"
      xmlns="http://www.w3.org/2000/svg"
      className="no-underline cursor-pointer hover:fill-sky-600 fill-neutral-400"
    >
      <path d="M12 0H9C6.23858 0 4 2.23858 4 5V7H0V11H4V18H8V11H12V7H8V5C8 4.44772 8.44771 4 9 4H12V0Z" />
    </svg>
  );
}

export default FacebookIcon;

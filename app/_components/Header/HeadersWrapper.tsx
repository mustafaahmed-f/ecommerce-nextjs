"use client";

import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeadersWrapperProps {}

function HeadersWrapper({}: HeadersWrapperProps) {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
}

export default HeadersWrapper;

"use client";

import { TooltipProvider } from "../shadcn/tooltip";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeadersWrapperProps {}

function HeadersWrapper({}: HeadersWrapperProps) {
  return (
    <>
      <TooltipProvider>
        <DesktopHeader />
        <MobileHeader />
      </TooltipProvider>
    </>
  );
}

export default HeadersWrapper;

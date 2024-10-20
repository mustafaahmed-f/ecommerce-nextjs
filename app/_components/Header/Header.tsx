import React from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeaderProps {}

function Header({}: HeaderProps) {
  return (
    <header>
      <DesktopHeader />
      <MobileHeader />
    </header>
  );
}

export default Header;

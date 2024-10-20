"use client";
import MainLogo from "../MainLogo";
import ProductSearchDiv from "./ProductSearchDiv";
import { Reorder, ShoppingBag } from "@mui/icons-material";

import { useEffect, useState } from "react";
import Menu from "./Menu";
import Link from "next/link";

function MobileHeader() {
  const { 0: showMenu, 1: setShowMenu } = useState(false);

  useEffect(
    function () {
      function eventListnerFunc() {
        if (window.innerWidth > 640) {
          setShowMenu(false);
        }
      }

      window.addEventListener("resize", eventListnerFunc);

      return window.removeEventListener("resize", eventListnerFunc);
    },
    [setShowMenu]
  );

  return (
    <div className="relative">
      {showMenu ? (
        <Menu setShowMenu={setShowMenu} />
      ) : (
        <div className="grid sm:hidden  grid-rows-[auto_auto] fixed z-50 w-full bg-white">
          {/* First section Logo,cart and menu */}

          <div className="flex items-center justify-between px-2 py-3 flex-nowrap">
            <div
              className="cursor-pointer hover:text-sky-600"
              onClick={() => setShowMenu(true)}
            >
              <Reorder />
            </div>
            <MainLogo />
            <div className="flex items-center gap-1 cursor-pointer hover:text-sky-600">
              <ShoppingBag />
              <Link href="">Cart</Link>
              <span className="flex items-center justify-center text-white bg-green-500 rounded-[50%] p-1 w-6 h-6">
                3
              </span>
            </div>
          </div>

          {/* Second section : search */}

          <div className="flex items-center justify-center px-2 py-4">
            <ProductSearchDiv />
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileHeader;

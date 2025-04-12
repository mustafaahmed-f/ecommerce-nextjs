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
    [setShowMenu],
  );

  return (
    <div className="relative">
      {showMenu ? (
        <Menu setShowMenu={setShowMenu} />
      ) : (
        <div className="fixed z-50 grid w-full grid-rows-[auto_auto] bg-white sm:hidden">
          {/* First section Logo,cart and menu */}

          <div className="flex flex-nowrap items-center justify-between px-2 py-3">
            <div
              className="cursor-pointer hover:text-sky-600"
              onClick={() => setShowMenu(true)}
            >
              <Reorder />
            </div>
            <MainLogo />
            <Link
              href="/cart"
              className="flex cursor-pointer items-center gap-1 hover:text-sky-600"
            >
              <ShoppingBag />
              <p>Cart</p>
              <span className="flex h-6 w-6 items-center justify-center rounded-[50%] bg-green-500 p-1 text-white">
                3
              </span>
            </Link>
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

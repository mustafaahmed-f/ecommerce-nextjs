import MainLogo from "../MainLogo";
import ProductSearchDiv from "./ProductSearchDiv";

import { useCart } from "@/app/_context/CartProvider";
import ReorderSVG from "@/app/_icons/ReorderSVG";
import ShoppingBagSVG from "@/app/_icons/ShoppingBagSVG";
import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "./Menu";

function MobileHeader() {
  const { 0: showMenu, 1: setShowMenu } = useState(false);
  const { cart } = useCart();

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
              <ReorderSVG />
            </div>
            <MainLogo />
            <Link
              href="/cart"
              className="flex cursor-pointer items-center gap-1 hover:text-sky-600"
            >
              <ShoppingBagSVG />
              <p>Cart</p>
              <span className="flex h-6 w-6 items-center justify-center rounded-[50%] bg-green-500 p-1 text-white">
                {cart.products.length}
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

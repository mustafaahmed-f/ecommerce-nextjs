"use client";

import { logOutAction } from "@/app/_actions/authActions";
import { useCategories } from "@/app/_context/CategoriesProvider";
import FavoriteBorderSVG from "@/app/_icons/FavoriteBorderSVG";
import Person2OutlinedSVG from "@/app/_icons/Person2OutlinedSVG";
import ReceiptIconSVG from "@/app/_icons/ReceiptIconSVG";
import SegmentSVG from "@/app/_icons/SegmentSVG";
import ShoppingBagSVG from "@/app/_icons/ShoppingBagSVG";
import { logOut } from "@/app/_lib/store/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/_lib/store/store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/shadcn/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/app/_components/shadcn/tooltip";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoAndSearch from "./LogoAndSearch";
import PagesLinks from "./PagesLinks";
import SocialLinks from "./SocialLinks";
import { Button } from "../shadcn/button";

const settings = ["Update Profile", "Logout"];

function DesktopHeader() {
  const { 0: loading, 1: setLoading } = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  const cart = useAppSelector((state) => state.cart);
  const { categories } = useCategories();
  const dispatch = useAppDispatch();

  const logOutFn = async () => {
    if (!user.email || !user.provider) return;
    setLoading(true);
    const response = await logOutAction(user.provider);
    if (
      (user.provider === "google" && response?.success) ||
      (user.provider === "system" && response?.success)
    ) {
      dispatch(logOut());
      window.location.href = "/";
    } else {
      console.log("Error logging out : ", response.error);
    }
    setLoading(false);
  };

  return (
    <div className="hidden sm:block">
      {/* ////First section for logo, search and main pages////  */}

      <div className="desktop-header-first-section">
        <LogoAndSearch />

        <div className="flex items-center sm:justify-between md:justify-end md:gap-32">
          <PagesLinks />

          <SocialLinks />
        </div>
      </div>

      {/* ////Second section for secondary pages ,favourites and cart//// */}

      <div className="grid bg-black py-3 text-white sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr]">
        <div className="flex items-center sm:gap-14 sm:px-7 md:gap-24 md:px-20">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" id="basic-button">
                  <div className="-scale-x-100">
                    <SegmentSVG />
                  </div>
                  <p className="font-semibold">Categories</p>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link
                    href="/products"
                    className="w-full text-center font-bold hover:text-sky-600"
                  >
                    All Categories
                  </Link>
                </DropdownMenuItem>

                {categories.categories.map((category: string, i: number) => (
                  <DropdownMenuItem className="cursor-pointer" key={i} asChild>
                    <Link
                      href={`/products/${category}`}
                      className="w-full text-center hover:text-sky-600"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {user.email || user.userName ? (
            <Link
              href="/orders"
              className="flex items-center gap-2 hover:text-sky-600"
            >
              <div className="-scale-x-100">
                <ReceiptIconSVG />
              </div>
              <p className="whitespace-nowrap font-semibold">My Orders</p>
            </Link>
          ) : null}
        </div>

        <div className="items-center justify-center border-s-[1px] border-s-neutral-400 sm:hidden md:flex">
          <Image
            alt="header photo"
            src="/header photo.png"
            className="h-16 w-16"
            width={300}
            height={300}
          />
          <div>
            <p>Weekly Men&apos;s Toiletries Coupons.</p>
            <p className="text-neutral-400">
              We extend exclusive discounts to our male clientele
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center border-s-[1px] border-s-neutral-400 sm:gap-4 md:gap-6">
          {user.userName || user.email ? (
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 p-0 hover:bg-transparent"
                        disabled={loading}
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={user.profileImage || "icons8-male-user-40.png"}
                            alt={user.firstName}
                          />
                          <AvatarFallback>
                            {user.firstName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="mb-0 text-lg font-normal text-white hover:text-sky-500">
                          Profile
                        </p>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className={`${loading ? "pointer-events-none opacity-50" : ""}`}
                    >
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href={`/updateprofile/${user.id}`}>
                          {settings[0]}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={logOutFn}
                      >
                        {settings[1]}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>Open settings</TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <div className="flex cursor-pointer items-center gap-2 hover:text-sky-600">
              <Person2OutlinedSVG />
              <Link href="/login">Sign in</Link>
            </div>
          )}
          <div className="flex cursor-pointer items-center gap-2 hover:text-sky-600">
            <FavoriteBorderSVG />
            <Link href="">Favorites</Link>
          </div>
          <Link
            href="/cart"
            className="flex cursor-pointer items-center gap-2 hover:text-sky-600"
          >
            <ShoppingBagSVG />
            <p>Cart</p>
            <span className="flex h-6 w-6 items-center justify-center rounded-[50%] bg-green-500 p-1 text-white">
              {cart.products.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DesktopHeader;

"use client";

import {
  FavoriteBorder,
  KeyboardArrowDownOutlined,
  Person2Outlined,
  Segment,
  ShoppingBag,
} from "@mui/icons-material";
// import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

import { logOutAction } from "@/app/_actions/authActions";
import { logOut } from "@/app/_lib/store/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/_lib/store/store";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoAndSearch from "./LogoAndSearch";
import PagesLinks from "./PagesLinks";
import SocialLinks from "./SocialLinks";

const settings = ["Update Profile", "Logout"];

function DesktopHeader() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { 0: loading, 1: setLoading } = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  const cart = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOutFn = async () => {
    if (!user.email || !user.provider) return;
    setLoading(true);
    const response = await logOutAction(user.provider);
    if (
      (user.provider === "google" && response?.success) ||
      (user.provider === "system" && response?.success)
    ) {
      dispatch(logOut());
      handleCloseUserMenu();
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
        <div className="flex items-center sm:gap-10 sm:px-7 md:gap-12 md:px-20">
          <div className="flex cursor-pointer gap-2 hover:text-sky-600">
            <div className="-scale-x-100">
              <Segment />
            </div>
            <p className="font-semibold">Categories</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="cursor-pointer hover:text-sky-600">
              USD
              <span>
                <KeyboardArrowDownOutlined />
              </span>
            </p>
            <p className="cursor-pointer hover:text-sky-600">
              English
              <span>
                <KeyboardArrowDownOutlined />
              </span>
            </p>
          </div>
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
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={user.profileImage || "icons8-male-user-40.png"}
                    sx={{ width: 23, height: 23 }}
                  />
                  <p
                    className="mb-0 ms-2 text-lg text-white"
                    style={{ fontWeight: "400" }}
                  >
                    Profile
                  </p>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  pointerEvents: loading ? "none" : "auto", // Prevent interactions
                  opacity: loading ? 0.5 : 1, // Visually indicate disabled state
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key={"update profile menu item"}
                  onClick={handleCloseUserMenu}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    <Link href={`/updateprofile/${user.id}`}>
                      {settings[0]}
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem key={"logout menu item"} onClick={logOutFn}>
                  <Typography sx={{ textAlign: "center" }}>
                    {settings[1]}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <div className="flex cursor-pointer items-center gap-2 hover:text-sky-600">
              <Person2Outlined />
              <Link href="/login">Sign in</Link>
            </div>
          )}
          <div className="flex cursor-pointer items-center gap-2 hover:text-sky-600">
            <FavoriteBorder />
            <Link href="">Favorites</Link>
          </div>
          <Link
            href="/cart"
            className="flex cursor-pointer items-center gap-2 hover:text-sky-600"
          >
            <ShoppingBag />
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

"use client";

import CategoriesProvider from "@/app/_context/CategoriesProvider";
import { signIn } from "@/app/_lib/store/slices/userSlice/userSlice";
import { store } from "@/app/_lib/store/store";
import { useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeadersWrapperProps {
  loggedUser: any | null;
}

function HeadersWrapper({ loggedUser = null }: HeadersWrapperProps) {
  useEffect(() => {
    if (loggedUser && store.getState().user.email === "") {
      store.dispatch(signIn(loggedUser));
    }
  }, [loggedUser]);

  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
}

export default HeadersWrapper;

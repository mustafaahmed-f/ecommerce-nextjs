"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../_lib/store/store";
import { logOut, signIn } from "../_lib/store/slices/userSlice/userSlice";

interface UserProviderProps {
  children: React.ReactNode;
  user: any;
}

function UserProvider({ children, user }: UserProviderProps) {
  const dispatch = useAppDispatch();
  const isFirstRender = useRef<boolean>(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    if (user) {
      dispatch(signIn(user));
    } else {
      dispatch(logOut());
    }
  }

  return <>{children}</>;
}

export default UserProvider;

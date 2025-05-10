"use client";
import { useEffect, useRef } from "react";
import { logOut, signIn } from "../_lib/store/slices/userSlice/userSlice";
import { useAppDispatch } from "../_lib/store/store";

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

  useEffect(() => {
    if (user) {
      dispatch(signIn(user));
    } else {
      dispatch(logOut());
    }
  }, [user, dispatch, isFirstRender]);

  return <>{children}</>;
}

export default UserProvider;

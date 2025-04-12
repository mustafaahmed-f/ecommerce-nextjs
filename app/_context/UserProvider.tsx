"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../_lib/store/store";
import { signIn } from "../_lib/store/slices/userSlice/userSlice";

interface UserProviderProps {
  children: React.ReactNode;
  user: any;
}

function UserProvider({ children, user }: UserProviderProps) {
  console.log("User provider called");
  const dispatch = useAppDispatch();
  // const reduxUser = useAppSelector((state) => state.user);

  if (user) {
    dispatch(signIn(user));
  }

  // useEffect(() => {
  //   if (user && (!reduxUser.email || !reduxUser.userName)) {
  //     dispatch(signIn(user));
  //   }
  // }, [user, dispatch, reduxUser]);

  return <>{children}</>;
}

export default UserProvider;

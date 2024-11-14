"use client";

import { useAppDispatch } from "@/app/_lib/store/store";
import { useEffect } from "react";

interface ClientDispatchComponentProps {
  user: any | null;
  provider: string;
}

///// Used to dipatch user to DB:

function ClientDispatchComponent({}: ClientDispatchComponentProps) {
  let finalUser: any | null = null;
  const dispatch = useAppDispatch();
  useEffect(() => {}, []);
  return <div></div>;
}

export default ClientDispatchComponent;

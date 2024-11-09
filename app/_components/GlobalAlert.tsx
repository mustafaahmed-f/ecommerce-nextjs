"use client";

import { useEffect } from "react";
import { useAlert } from "../_context/AlertProvider";
import SnackBar from "./SnackBar";

interface GlobalAlertProps {}

function GlobalAlert({}: GlobalAlertProps) {
  const { alertMessage, setAlertMessage, setIsError, isError } = useAlert();

  // useEffect(() => {
  //   console.log("alertMessage :", alertMessage);
  // }, [alertMessage]);

  // useEffect(() => {
  //   let timeOut: any = null;

  //   if (alertMessage) {
  //     timeOut = setTimeout(() => {
  //       setAlertMessage(null);
  //       setIsError(false);
  //     }, 3000);
  //   }

  //   return () => clearTimeout(timeOut);
  // }, [alertMessage, setAlertMessage, setIsError]);
  console.log("Global Alert : ", alertMessage);
  return alertMessage ? (
    <SnackBar message={alertMessage} severity={isError ? "error" : "success"} />
  ) : null;
}

export default GlobalAlert;

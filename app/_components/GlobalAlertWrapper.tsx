"use client";
import AlertContextProvider from "../_context/AlertProvider";
import GlobalAlert from "./GlobalAlert";

interface GlobalAlertWrapperProps {}

function GlobalAlertWrapper({}: GlobalAlertWrapperProps) {
  return (
    <AlertContextProvider>
      <GlobalAlert />
    </AlertContextProvider>
  );
}

export default GlobalAlertWrapper;

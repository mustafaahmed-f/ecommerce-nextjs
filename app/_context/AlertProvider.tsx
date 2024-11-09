"use client";
import { createContext, ReactNode, useContext, useState } from "react";

//===============================================================================
//==================== used to supply client global alert =======================
//===============================================================================

const AlertContext = createContext<
  | {
      alertMessage: string | null;
      setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
      isError: boolean;
      setIsError: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>({
  alertMessage: null,
  setAlertMessage: () => {},
  isError: false,
  setIsError: () => {},
});

export default function AlertContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { 0: alertMessage, 1: setAlertMessage } = useState<string | null>(null);
  const { 0: isError, 1: setIsError } = useState<boolean>(false);

  return (
    <AlertContext.Provider
      value={{
        alertMessage,
        setAlertMessage,
        isError,
        setIsError,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("Can't use alert context outside alert provider !!");
  }
  return context;
}

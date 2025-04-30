// FormContext.tsx
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

type FormContextType = UseFormReturn<any>;

const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = FormContext.Provider;

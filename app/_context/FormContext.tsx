// FormContext.tsx
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { CheckOutFormValues } from "../cartcheckout/_components/CheckoutFormTemplate";

type FormContextType = UseFormReturn<CheckOutFormValues>;

const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = FormContext.Provider;

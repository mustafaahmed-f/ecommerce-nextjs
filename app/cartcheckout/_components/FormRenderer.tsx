import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { inputFieldType } from "../_types/inputFieldType";
import { CheckOutFormValues } from "./CheckoutFormTemplate";

interface FormRendererProps {
  fields: inputFieldType[];
}

function FormRenderer({ fields }: FormRendererProps) {
  return <div></div>;
}

export default FormRenderer;

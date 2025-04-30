import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { inputFieldType } from "../_types/inputFieldType";
import { CheckOutFormValues } from "./CheckoutFormTemplate";

interface FormSectionProps {
  fields: inputFieldType[];
  title: string;
}

function FormSection({ fields }: FormSectionProps) {
  return <div></div>;
}

export default FormSection;

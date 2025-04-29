import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { inputFieldType } from "../_types/inputFieldType";
import { CheckOutFormValues } from "./CheckoutFormTemplate";

interface FormRendererProps {
  fields: inputFieldType[];
  setValue?: UseFormSetValue<any>;
  errors: any;
  register: UseFormRegister<CheckOutFormValues>;
}

function FormRenderer({
  fields,
  setValue,
  errors,
  register,
}: FormRendererProps) {
  return <div>Form Renderer</div>;
}

export default FormRenderer;

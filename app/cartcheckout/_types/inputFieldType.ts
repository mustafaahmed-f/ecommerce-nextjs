import { Path } from "react-hook-form";
import { CheckOutFormValues } from "../_components/CheckoutFormTemplate";

export interface inputFieldType {
  type: "email" | "text" | "phone" | "dropdown";
  name: Path<CheckOutFormValues>;
  lable: string;
  fullWidth: boolean;
  required: boolean;
  placeholder: string;
  optionsMethod?: (dependency?: string) => Promise<string[]>;
  dependency?: Path<CheckOutFormValues>;
}

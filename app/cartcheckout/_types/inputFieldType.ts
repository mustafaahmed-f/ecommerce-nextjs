import { Path } from "react-hook-form";
import { CheckOutFormValues } from "../_components/CheckoutFormTemplate";

export interface inputFieldType {
  type: "email" | "text" | "phone" | "dropdown";
  name: Path<CheckOutFormValues>;
  lable: string;
  fullWidth: boolean;
  required: boolean;
  placeholder: string;
  options?: string[] | string; //// options provided or a link to fetch options
  dependency?: string;
}

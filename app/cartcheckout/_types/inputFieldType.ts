import { FieldValues, Path } from "react-hook-form";
import { CheckOutFormValues } from "../_components/CheckoutFormTemplate";

export interface inputFieldType<T extends FieldValues> {
  type: "email" | "text" | "phone" | "dropdown" | "quantity";
  name: Path<T>;
  lable: string;
  fullWidth: boolean;
  required: boolean;
  placeholder: string;
  optionsMethod?: (dependency?: string) => Promise<string[]>;
  dependency?: Path<T>;
}

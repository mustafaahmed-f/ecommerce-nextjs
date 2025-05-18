import { FieldValues, Path } from "react-hook-form";

export interface inputFieldType<T extends FieldValues> {
  type: "email" | "text" | "phone" | "dropdown" | "quantity" | "password";
  name: Path<T>;
  lable: string;
  fullWidth: boolean;
  required: boolean;
  placeholder: string;
  optionsMethod?: (dependency?: string) => Promise<string[]>;
  dependency?: Path<T>;
}

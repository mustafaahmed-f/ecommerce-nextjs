import { inputFieldType } from "@/app/cartcheckout/_types/inputFieldType";
import { logInDefaultValuesType } from "./logInDefaultValuesType";

type F = inputFieldType<logInDefaultValuesType>; // shorthand

export const logInFieldsObject: F[] = [
  {
    type: "email",
    name: "email",
    lable: "Email",
    fullWidth: true,
    required: true,
    placeholder: "me@mail.com",
  },
  {
    type: "password",
    name: "password",
    lable: "Password",
    fullWidth: true,
    required: true,
    placeholder: "********",
  },
];

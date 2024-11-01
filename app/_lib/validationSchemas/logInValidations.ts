import generalValidations from "./generalValidations";
import * as yup from "yup";
export const loginValidations = yup.object({
  email: generalValidations.email,
  password: generalValidations.password,
});

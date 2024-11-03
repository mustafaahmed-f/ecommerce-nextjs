import { profile } from "console";
import generalValidations from "./generalValidations";
import * as yup from "yup";
export const signupValidations = yup.object({
  userName: generalValidations.userName,
  firstName: generalValidations.firstName,
  lastName: generalValidations.lastName,
  email: generalValidations.email,
  password: generalValidations.password,
  rePassword: generalValidations.rePassword,
  profileImage: generalValidations.profileImage,
  phoneNumber: generalValidations.phoneNumber,
  address: generalValidations.address,
});

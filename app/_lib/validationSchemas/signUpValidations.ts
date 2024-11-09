import * as yup from "yup";
import generalValidations from "./generalValidations";
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
  cid: generalValidations.cid,
});

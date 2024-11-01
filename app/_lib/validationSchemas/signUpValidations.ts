import { profile } from "console";
import generalValidations from "./generalValidations";

export const signupValidations = {
  userName: generalValidations.userName,
  firstName: generalValidations.firstName,
  lastName: generalValidations.lastName,
  email: generalValidations.email,
  password: generalValidations.password,
  rePassword: generalValidations.rePassword,
  provider: generalValidations.provider,
  profileImage: generalValidations.profileImage,
  //   customID: yup.string(),
  address: generalValidations.address,
};

import generalValidations from "./generalValidations";

export const signupValidations = {
  userName: generalValidations.userName,
  firstName: generalValidations.firstName,
  lastName: generalValidations.lastName,
  email: generalValidations.email,
  password: generalValidations.password,
  rePassword: generalValidations.rePassword,
  provider: generalValidations.provider,
  //   customID: yup.string(),
  address: generalValidations.address,
};

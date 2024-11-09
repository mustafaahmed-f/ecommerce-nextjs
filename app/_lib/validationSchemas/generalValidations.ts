import * as yup from "yup";

const generalValidations = {
  userName: yup
    .string()
    .required("Username is required")
    .min(3, "Min. length 3")
    .max(20, "Max. length 20")
    .matches(
      /^[a-zA-Z0-9]{3,20}$/,
      "userName should consist of letters and numbers only"
    ),
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Min. length 2")
    .max(50, "Max. length 50"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Min. length 2")
    .max(50, "Max. length 50"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Min. length of password is 8")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password should contain at least one number and one uppercase letter"
    ),
  rePassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  //   isConfirmed: yup.boolean().default(false),
  provider: yup
    .string()
    .oneOf(["google", "system"], "Provider must be either 'google' or 'system'")
    .default("system"),
  profileImage: yup.string(),
  cid: yup.string(),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{11}$/, "Invalid phone number"),
  //   customID: yup.string(),
  address: yup
    .object()
    .shape({
      unit_number: yup.number().optional(),
      street_number: yup.number().optional(),
      address_line1: yup
        .string()
        .max(100, "Max. length 100 for address line 1")
        .optional(),
      address_line2: yup
        .string()
        .max(100, "Max. length 100 for address line 2")
        .optional(),
      city: yup.string().max(50, "Max. length 50 for city").optional(),
      country: yup.string().max(50, "Max. length 50 for country").optional(),
      geolocation: yup.object().shape({
        lat: yup.number().optional(),
        long: yup.number().optional(),
      }),
    })
    .optional(),
};

export default generalValidations;

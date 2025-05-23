import * as yup from "yup";
import {
  invalidSchemaFormatMsg,
  maxLengthMsg,
  minLengthMsg,
  requiredFieldMsg,
} from "../validattionErrorMessages";

const generalValidations = {
  userName: yup
    .string()
    .required(requiredFieldMsg("UserName"))
    .min(3, "Min. length 3")
    .max(20, "Max. length 20")
    .matches(
      /^[a-zA-Z0-9]{3,20}$/,
      "userName should consist of letters and numbers only",
    ),
  firstName: yup
    .string()
    .required(requiredFieldMsg("First name"))
    .min(2, "Min. length 2")
    .max(50, "Max. length 50"),
  lastName: yup
    .string()
    .required(requiredFieldMsg("Last name"))
    .min(2, minLengthMsg(2))
    .max(50, maxLengthMsg(50)),
  email: yup
    .string()
    .required(requiredFieldMsg("Email"))
    .email("Invalid email format"),
  password: yup
    .string()
    .required(requiredFieldMsg("Password"))
    .min(8, minLengthMsg(8))
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password should contain at least one number and one uppercase letter",
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
    .required(requiredFieldMsg("Phone number"))
    .matches(/^\d{11}$/, invalidSchemaFormatMsg("Phone number", "11 digits")),
  //   customID: yup.string(),
  address: yup
    .object()
    .shape({
      unit_number: yup.number().optional().nullable(),
      street_number: yup.number().optional().nullable(),
      address_line1: yup
        .string()
        .max(100, "Max. length 100 for address line 1")
        .optional()
        .nullable(),
      address_line2: yup
        .string()
        .max(100, "Max. length 100 for address line 2")
        .optional()
        .nullable(),
      city: yup
        .string()
        .max(50, "Max. length 50 for city")
        .optional()
        .nullable(),
      country: yup
        .string()
        .max(50, "Max. length 50 for country")
        .optional()
        .nullable(),
      geolocation: yup.object().shape({
        lat: yup.number().optional().nullable(),
        long: yup.number().optional().nullable(),
      }),
    })
    .optional(),
};

export default generalValidations;

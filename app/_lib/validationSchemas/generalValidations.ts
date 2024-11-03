import * as yup from "yup";

const generalValidations = {
  userName: yup
    .string()
    .min(3, "Min. length 3")
    .max(20, "Max. length 20")
    .matches(
      /^[a-zA-Z0-9]{3,20}$/,
      "userName should consist of letters and numbers only"
    )
    .required("Username is required"),
  firstName: yup
    .string()
    .min(2, "Min. length 2")
    .max(50, "Max. length 50")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Min. length 2")
    .max(50, "Max. length 50")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Min. length of password is 8")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password should contain at least one number and one uppercase letter"
    )
    .required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  //   isConfirmed: yup.boolean().default(false),
  provider: yup
    .string()
    .oneOf(["google", "system"], "Provider must be either 'google' or 'system'")
    .default("system"),
  profileImage: yup.string().required(),
  phoneNumber: yup.string().required(),
  //   customID: yup.string(),
  address: yup.object().shape({
    unit_number: yup.number().integer("Unit number must be an integer"),
    street_number: yup.number().integer("Street number must be an integer"),
    address_line1: yup
      .string()
      .max(100, "Max. length 100 for address line 1")
      .required("Address line 1 is required"),
    address_line2: yup.string().max(100, "Max. length 100 for address line 2"),
    city: yup
      .string()
      .max(50, "Max. length 50 for city")
      .required("City is required"),
    country: yup
      .string()
      .max(50, "Max. length 50 for country")
      .required("Country is required"),
    profileImage: yup.string().required("Profile image's URL is required"),
    geolocation: yup.object().shape({
      lat: yup
        .number()
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90"),
      long: yup
        .number()
        .min(-180, "Longitude must be between -180 and 180")
        .max(180, "Longitude must be between -180 and 180"),
    }),
  }),
};

export default generalValidations;

import { SignupDefaultValuesType } from "./signUpDefaultValuesType";

export const signupDefaultValues: SignupDefaultValuesType = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  rePassword: "",
  profileImage: "", // or put a placeholder avatar URL here
  phoneNumber: "",
  cid: "",

  address: {
    unit_number: null,
    street_number: null,
    address_line1: null,
    address_line2: null,
    city: null,
    country: null,
    geolocation: {
      lat: null,
      long: null,
    },
  },

  provider: "system",
} as const;

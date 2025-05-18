import { getCountries, getCities } from "@/app/_lib/APIs/CountriesAndCitiesAPI";
import { SignupDefaultValuesType } from "./signUpDefaultValuesType";
import { inputFieldType } from "@/app/cartcheckout/_types/inputFieldType";

type F = inputFieldType<SignupDefaultValuesType>; // shorthand
/* ---------------------------------------------------------------
   STEP 1  •  account & basic identity
---------------------------------------------------------------- */
export const signupStep1Fields: F[] = [
  {
    type: "email",
    name: "email",
    lable: "Email",
    fullWidth: true,
    required: true,
    placeholder: "me@mail.com",
  },
  {
    type: "text",
    name: "userName",
    lable: "Username",
    fullWidth: false,
    required: true,
    placeholder: "user123",
  },
  {
    type: "phone",
    name: "phoneNumber",
    lable: "Phone Number",
    fullWidth: false,
    required: true,
    placeholder: "011XXXXXXX",
  },
  {
    type: "text",
    name: "firstName",
    lable: "First Name",
    fullWidth: false,
    required: true,
    placeholder: "Mostafa",
  },
  {
    type: "text",
    name: "lastName",
    lable: "Last Name",
    fullWidth: false,
    required: true,
    placeholder: "Fikry",
  },

  {
    type: "password",
    name: "password",
    lable: "Password",
    fullWidth: false,
    required: true,
    placeholder: "********",
  },
  {
    type: "password",
    name: "rePassword",
    lable: "Re-Password",
    fullWidth: false,
    required: true,
    placeholder: "********",
  },
];

/* ---------------------------------------------------------------
   STEP 2  •  address, geo, misc
---------------------------------------------------------------- */
export const signupStep2Fields: F[] = [
  {
    type: "text",
    name: "address.unit_number",
    lable: "Unit Number",
    fullWidth: false,
    required: false,
    placeholder: "12",
  },
  {
    type: "text",
    name: "address.street_number",
    lable: "Street Number",
    fullWidth: false,
    required: false,
    placeholder: "7",
  },
  {
    type: "text",
    name: "address.address_line1",
    lable: "Address Line 1",
    fullWidth: true,
    required: false,
    placeholder: "123 Main St",
  },
  {
    type: "text",
    name: "address.address_line2",
    lable: "Address Line 2",
    fullWidth: true,
    required: false,
    placeholder: "Apt 4B",
  },
  {
    type: "dropdown",
    name: "address.country",
    lable: "Country",
    fullWidth: false,
    required: false,
    optionsMethod: getCountries,
    placeholder: "",
  },
  {
    type: "dropdown",
    name: "address.city",
    lable: "City / State",
    fullWidth: false,
    required: false,
    dependency: "address.country",
    optionsMethod: getCities,
    placeholder: "",
  },
  {
    type: "text",
    name: "address.geolocation.lat",
    lable: "Latitude",
    fullWidth: false,
    required: false,
    placeholder: "26.1292",
  },
  {
    type: "text",
    name: "address.geolocation.long",
    lable: "Longitude",
    fullWidth: false,
    required: false,
    placeholder: "32.4600",
  },
];

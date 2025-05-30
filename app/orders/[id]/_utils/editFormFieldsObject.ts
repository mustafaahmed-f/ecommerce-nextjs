import { getCities, getCountries } from "@/app/_lib/APIs/CountriesAndCitiesAPI";
import { CheckOutFormValues } from "@/app/cartcheckout/_components/CheckoutFormTemplate";
import { inputFieldType } from "@/app/cartcheckout/_types/inputFieldType";

export const ediFormFieldsObject: inputFieldType<CheckOutFormValues>[] = [
  {
    type: "email",
    name: "userInfo.email",
    lable: "Email",
    fullWidth: true,
    required: true,
    placeholder: "mostafa@gmail.com",
  },
  {
    type: "text",
    name: "userInfo.firstName",
    lable: "First Name",
    fullWidth: false,
    required: true,
    placeholder: "Mostafa",
  },
  {
    type: "text",
    name: "userInfo.lastName",
    lable: "Last Name",
    fullWidth: false,
    required: true,
    placeholder: "Ahmed",
  },
  {
    type: "dropdown",
    name: "userInfo.country",
    lable: "Country",
    fullWidth: true,
    required: true,
    placeholder: "",
    optionsMethod: getCountries,
  },
  {
    type: "dropdown",
    name: "userInfo.city",
    lable: "City/State",
    placeholder: "",
    fullWidth: true,
    required: true,
    dependency: "userInfo.country",
    optionsMethod: getCities,
  },
  {
    type: "text",
    name: "userInfo.address",
    lable: "Address",
    placeholder: "123 main st.",
    required: true,
    fullWidth: true,
  },
  {
    type: "phone",
    name: "userInfo.phoneNumber1",
    lable: "Phone Number 1",
    fullWidth: true,
    required: true,
    placeholder: "(02) 11xxxxxxxx",
  },
  {
    type: "phone",
    name: "userInfo.phoneNumber2",
    lable: "Phone Number 2",
    fullWidth: true,
    required: false,
    placeholder: "(02) 11xxxxxxxx",
  },
];

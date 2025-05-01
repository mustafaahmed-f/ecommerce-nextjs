import { defaultValuesType } from "../_types/defaultValuesType";

export const defaultValues: defaultValuesType = {
  userID: "",

  userInfo: {
    phoneNumbers: [],
    city: "",
    country: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  },

  products: [],

  subTotal: 0,

  couponId: null,

  finalPaidAmount: 0,
  paymentMethod: "cash",

  isFromCart: false,
  notes: "",
} as const;

import generalValidations from "@/app/_lib/validationSchemas/generalValidations";
import {
  invalidSchemaFormatMsg,
  requiredFieldMsg,
} from "@/app/_lib/validattionErrorMessages";
import * as yup from "yup";

export const checkOutFormValidations = yup.object({
  userID: yup.string().required("User ID is required"),

  userInfo: yup.object().shape({
    phoneNumber1: yup
      .string()
      .required(requiredFieldMsg("Phone Number 1"))
      .matches(/^\d{11}$/, invalidSchemaFormatMsg("Phone number", "11 digits")),
    phoneNumber2: yup
      .string()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      )
      .matches(/^\d{11}$/, {
        excludeEmptyString: true,
        message: invalidSchemaFormatMsg("Phone number", "11 digits"),
      }),
    city: yup
      .string()
      .min(1, requiredFieldMsg("City"))
      .max(50, "Max. length 50 for city")
      .required(requiredFieldMsg("City")),
    country: yup
      .string()
      .min(1, requiredFieldMsg("Country"))
      .max(50, "Max. length 50 for country")
      .required(requiredFieldMsg("Country")),
    firstName: generalValidations.firstName,
    lastName: generalValidations.lastName,
    email: generalValidations.email,
    address: yup
      .string()
      .max(100, "Max. length 100 for address")
      .required(requiredFieldMsg("Address")),
  }),

  products: yup
    .array()
    .of(
      yup.object({
        productID: yup.number().required("Product ID is required"),
        title: yup.string().optional(),
        unitPaymentPrice: yup
          .number()
          .required("Unit payment price is required"),
        discount: yup.number().default(0),
        quantity: yup.number().required("Quantity is required"),
        color: yup.string().nullable(),
        category: yup.string().nullable(),
        brand: yup.string().nullable(),
      }),
    )
    .min(1, "At least one product is required")
    .required(requiredFieldMsg("Products")),

  subTotal: yup
    .number()
    .required("Subtotal is required")
    .min(0, "Subtotal must be a positive number"),

  couponId: yup.string().nullable(),

  finalPaidAmount: yup
    .number()
    .required("Final paid amount is required")
    .min(0, "Final paid amount must be a positive number"),

  paymentMethod: yup
    .mixed<"cash" | "card">()
    .oneOf(
      ["cash", "card"],
      invalidSchemaFormatMsg(
        "Payment method",
        "allowed methods : cash or card",
      ),
    )
    .required(requiredFieldMsg("Payment method")),

  isFromCart: yup.boolean().optional(),

  notes: yup.string().optional(),
});

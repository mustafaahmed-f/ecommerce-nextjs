import {
  invalidNumberMsg,
  invalidSchemaFormatMsg,
  minLengthMsg,
  requiredFieldMsg,
} from "@/app/_lib/validattionErrorMessages";
import { Types } from "mongoose";
import { z } from "zod";

// Helper for ObjectId validation
const objectIdSchema = z
  .string({ required_error: requiredFieldMsg("ObjectId") })
  .refine((val) => Types.ObjectId.isValid(val), {
    message: invalidSchemaFormatMsg("ObjectId", "MongoDB ObjectId format"),
  });

export const userInfoSchema = z.object({
  phoneNumber1: z
    .string({ required_error: requiredFieldMsg("Phone Number 1") })
    .min(5, minLengthMsg(5))
    .regex(/^\d{11}$/, invalidSchemaFormatMsg("Phone number", "11 digits")),
  phoneNumber2: z
    .string()
    .transform((val) => (val.trim() === "" ? null : val))

    .optional()
    .nullable()
    .refine((val) => val === null || /^\d{11}$/.test(val!), {
      message: invalidSchemaFormatMsg("Phone number", "11 digits"),
    }),
  city: z
    .string({ required_error: requiredFieldMsg("City") })
    .min(1, minLengthMsg(1)),
  country: z
    .string({ required_error: requiredFieldMsg("Country") })
    .min(1, minLengthMsg(1)),
  firstName: z
    .string({ required_error: requiredFieldMsg("First Name") })
    .min(1, minLengthMsg(1))
    .trim(),
  lastName: z
    .string({ required_error: requiredFieldMsg("Last Name") })
    .min(1, minLengthMsg(1))
    .trim(),
  email: z
    .string({ required_error: requiredFieldMsg("Email") })
    .email(invalidSchemaFormatMsg("Email", "Valid email format")),
  address: z
    .string({ required_error: requiredFieldMsg("Address") })
    .min(1, minLengthMsg(1)),
});

// Main order schema
export const createOrderSchema = z.object({
  userID: objectIdSchema,

  products: z
    .array(
      z.object({
        productID: z.number({ required_error: requiredFieldMsg("Product ID") }),
        title: z
          .string({ required_error: requiredFieldMsg("Title") })
          .optional(),
        unitPaymentPrice: z
          .number({ required_error: requiredFieldMsg("Unit Payment Price") })
          .min(0, invalidNumberMsg()),
        discount: z
          .number({ required_error: requiredFieldMsg("Discount") })
          .min(0, invalidNumberMsg())
          .default(0),
        quantity: z
          .number({ required_error: requiredFieldMsg("Quantity") })
          .int()
          .min(1, invalidNumberMsg()),
        color: z.string().nullable().optional(),
        category: z.string().nullable().optional(),
        brand: z.string().nullable().optional(),
        image: z.string().nullable().optional(),
      }),
    )
    .min(1, requiredFieldMsg("At least one product")),

  couponId: objectIdSchema.optional().nullable(),

  subTotal: z
    .number({ required_error: requiredFieldMsg("Subtotal") })
    .min(1, requiredFieldMsg("Subtotal"))
    .min(0, invalidNumberMsg()),

  finalPaidAmount: z
    .number({ required_error: requiredFieldMsg("Final Paid Amount") })
    .min(1, requiredFieldMsg("Final Paid Amount"))
    .min(0, invalidNumberMsg()),

  userInfo: userInfoSchema,

  paymentMethod: z.enum(["cash", "card"], {
    required_error: requiredFieldMsg("Payment Method"),
    invalid_type_error: invalidSchemaFormatMsg(
      "Payment Method",
      "cash or card",
    ),
  }),

  isFromCart: z.boolean().optional(),

  notes: z.string().optional(),
});

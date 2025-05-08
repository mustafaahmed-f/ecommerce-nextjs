import {
  invalidNumberMsg,
  invalidSchemaFormatMsg,
  minLengthMsg,
  requiredFieldMsg,
} from "@/app/_lib/validattionErrorMessages";
import { Types } from "mongoose";
import { z } from "zod";

// MongoDB ObjectId validator
const objectIdSchema = z
  .string({ required_error: requiredFieldMsg("ObjectId") })
  .refine((val) => Types.ObjectId.isValid(val), {
    message: invalidSchemaFormatMsg("ObjectId", "MongoDB ObjectId format"),
  });

// Saved order response schema
export const stripeOrderSchema = z.object({
  _id: objectIdSchema,
  orderNumber: z.number(),

  userID: objectIdSchema,

  products: z.array(
    z.object({
      _id: objectIdSchema,
      productID: z.number(),
      title: z.string(),
      unitPaymentPrice: z.number().min(0, invalidNumberMsg()),
      discount: z.number().min(0, invalidNumberMsg()),
      quantity: z.number().int().min(1, invalidNumberMsg()),
      color: z.string(),
      category: z.string(),
      brand: z.string(),
      image: z.string().url(),
    }),
  ),

  couponId: objectIdSchema.nullable(),

  subTotal: z.number().min(0, invalidNumberMsg()),

  finalPaidAmount: z.number().min(0, invalidNumberMsg()),

  userInfo: z.object({
    phoneNumber1: z.string().min(5, minLengthMsg(5)),
    phoneNumber2: z.string().optional().nullable(),
    city: z.string().min(1, minLengthMsg(1)),
    country: z.string().min(1, minLengthMsg(1)),
    firstName: z.string().min(1, minLengthMsg(1)).trim(),
    lastName: z.string().min(1, minLengthMsg(1)).trim(),
    email: z
      .string()
      .email(invalidSchemaFormatMsg("Email", "Valid email format")),
    address: z.string().min(1, minLengthMsg(1)),
  }),

  paymentMethod: z.enum(["cash", "card"]),

  orderStatus: z.object({
    status: z.enum([
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "returned",
      "cancelled",
    ]),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: invalidSchemaFormatMsg("updatedAt", "ISO date string"),
    }),
  }),

  isFromCart: z.boolean(),
  notes: z.string().optional(),
});

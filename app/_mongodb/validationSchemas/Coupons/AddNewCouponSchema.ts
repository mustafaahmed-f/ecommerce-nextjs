import { couponType } from "@/app/_lib/couponTypes";
import {
  invalidNumberMsg,
  invalidSchemaFormatMsg,
  maxLengthMsg,
  minLengthMsg,
  requiredFieldMsg,
} from "@/app/_lib/validattionErrorMessages";
import { z } from "zod";

export const addNewCouponSchema = z.object({
  code: z
    .string()
    .min(1, requiredFieldMsg("Code"))
    .min(6, minLengthMsg(6))
    .max(8, maxLengthMsg(8))
    .regex(
      /^[a-z0-9A-Z]{6,8}$/,
      invalidSchemaFormatMsg("Code", "Digits or letters of length 6 ~ 8"),
    ),
  discount: z
    .number({ message: invalidNumberMsg() })
    .min(1, requiredFieldMsg("Discount")),
  discountType: z.enum([couponType.AMOUNT, couponType.PERCENTAGE], {
    message: invalidSchemaFormatMsg("Discount Type", "percentage or amount"),
  }),
  expirationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(
      (value) => new Date(value) > new Date(),
      "Date must be in the future",
    )
    .refine((value) => !isNaN(Date.parse(value)), "Invalid date format"),
  usageLimit: z
    .number({ message: invalidNumberMsg() })
    .min(1, requiredFieldMsg("Usage Limit")),
});

import mongoose, { Schema, Document } from "mongoose";

interface ICoupon extends Document {
  code: string; // Coupon code (unique identifier)
  discount: number; // Discount value (e.g., percentage or flat amount)
  expirationDate: Date; // Expiration date of the coupon
  usageLimit: number; // Maximum usage limit for this coupon
  usageCount: number; // Number of times the coupon has been used
  applicableProducts: string[]; // Array of product IDs this coupon applies to (optional)
  applicableCategories: string[]; // Array of category IDs this coupon applies to (optional)
  isActive: boolean; // Whether the coupon is active or not
}

const CouponSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true }, // E.g., 10 for 10% off or 5 for $5 off
    expirationDate: { type: Date, required: true },
    usageLimit: { type: Number, required: true },
    usageCount: { type: Number, default: 0 },
    applicableProducts: { type: [String], default: [] }, // Optional
    applicableCategories: { type: [String], default: [] }, // Optional
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Coupon = mongoose.model<ICoupon>("Coupon", CouponSchema);

export default mongoose.models.User || Coupon;

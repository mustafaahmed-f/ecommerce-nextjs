import mongoose, { Schema, Types } from "mongoose";

const orderSchema = new Schema(
  {
    userID: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productID: {
          type: Types.ObjectId,
          required: true,
        },
        title: { type: String },
        unitPaymentPrice: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        quantity: { type: Number, required: true },
        color: { type: String, default: null },
        category: { type: String, default: null },
        brand: { type: String, default: null },
      },
    ],
    // couponID: {
    //   type: Types.ObjectId,
    //   ref: "Coupon",
    // },

    // subTotal: { type: Number, required: true, default: 0 },
    finalPaidAmount: { type: Number, required: true, default: 0 },
    phoneNumbers: [{ type: String, required: true }],
    address: { type: Schema.Types.Mixed, required: true },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "card"],
    },
    orderStatus: {
      type: String,
      required: true,
      default: "pending",
      enum: [
        "pending",
        "completed",
        "cancelled",
        "delivered",
        "returned",
        "failed",
        "shipped",
      ],
    },
    isFromCart: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;

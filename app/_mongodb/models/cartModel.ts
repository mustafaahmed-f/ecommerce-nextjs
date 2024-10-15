import mongoose, { Schema, Types } from "mongoose";

const cartSchema = new Schema(
  {
    userID: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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
    subTotal: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;

import mongoose, { Schema, Types } from "mongoose";

interface OrderModel extends Document {
  orderNumber: number;
  userID: Types.ObjectId;
  products: {
    productID: Types.ObjectId;
    title: string;
    unitPaymentPrice: number;
    discount: number;
    quantity: number;
    color: string;
    category: string;
    brand: string;
  }[];
  couponId: Types.ObjectId;
  subTotal: number;
  userInfo: {
    phoneNumber1: string;
    phoneNumber2: string;
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  finalPaidAmount: number;
  paymentMethod: "cash" | "card";
  orderStatus: {
    status: "pending" | "shipped" | "delivered" | "returned" | "cancelled";
    updatedAt: Date;
  };
  isFromCart: boolean;
}

const orderSchema: Schema = new Schema(
  {
    orderNumber: { type: Number, required: false, unique: true },
    userID: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productID: {
          type: Number,
          required: true,
        },
        title: { type: String },
        unitPaymentPrice: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        quantity: { type: Number, required: true },
        color: { type: String, default: null },
        category: { type: String, default: null },
        brand: { type: String, default: null },
        image: { type: String, default: null },
      },
    ],
    couponId: {
      type: Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
    subTotal: { type: Number, required: true, default: 0 },

    userInfo: {
      phoneNumber1: { type: String, required: true },
      phoneNumber2: { type: String, default: null },
      city: { type: String, required: true },
      country: { type: String, required: true },
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      address: { type: String, required: true },
    },

    finalPaidAmount: { type: Number, required: true, default: 0 },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "card"],
    },

    orderStatus: {
      status: {
        type: String,
        required: true,
        default: "pending",
        enum: [
          "pending",
          "confirmed",
          "shipped",
          "delivered",
          "returned",
          "cancelled",
        ],
      },
      updatedAt: { type: Date, required: true, default: Date.now },
    },

    isFromCart: { type: Boolean, default: false },

    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

orderSchema.pre("save", function (next) {
  if (this.isModified("orderStatus.status")) {
    (this as any).orderStatus.updatedAt = new Date();
  }
  next();
});

orderSchema.pre("save", async function () {
  if (this.isNew && !this.orderNumber) {
    const orderNumber = await this.model("Order").countDocuments();
    this.orderNumber = orderNumber + 1;
  }
});

export default mongoose.models.Order ||
  mongoose.model<OrderModel>("Order", orderSchema);

// models/Notification.js
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
      enum: [
        "order_created",
        "product_added",
        "user_registered",
        "order_shipped",
        // Add other event types as needed
      ],
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    audience: {
      type: String,
      required: true,
      enum: ["user", "admin"],
    },
    read: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

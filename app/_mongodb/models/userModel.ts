import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
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
      unique: true,
    },
    password: {
      type: String,
      required: false,
      default: "",
    },
    // customID: String,
    provider: {
      type: String,
      default: "system",
      enum: ["google", "system"],
    },
    profileImage: {
      type: String,
      default: null,
      // required: true,
    },
    cid: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      unit_number: { type: String, default: "0" },
      street_number: { type: String, default: "0" },
      address_line1: { type: String, default: "" },
      address_line2: { type: String, default: "" }, //For more address details like (dep. num. , building num , PO box num , etc...)
      city: { type: String, default: "" },
      country: { type: String, default: "" },
      geolocation: {
        lat: {
          type: String,
          default: "0",
        },
        long: {
          type: String,
          default: "0",
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, //This causes an additional id field to appear in the response body.
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", function () {
  if (this.password !== "")
    this.password = bcrypt.hashSync(
      this.password!,
      parseInt(process.env.SALT_ROUND as string)
    );
});

export default mongoose.models.User || mongoose.model("User", userSchema);

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
      required: true,
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
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    phoneNumber: {
      type: String,
      default: null,
      required: true,
    },
    address: {
      unit_number: { type: Number, default: 0 },
      street_number: { type: Number, default: 0 },
      address_line1: { type: String, default: "", required: true },
      address_line2: { type: String, default: "" }, //For more address details like (dep. num. , building num , PO box num , etc...)
      city: { type: String, default: "", required: true },
      country: { type: String, default: "", required: true },
      geolocation: {
        lat: {
          type: Number,
          default: 0,
        },
        long: {
          type: Number,
          default: 0,
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
  this.password = bcrypt.hashSync(
    this.password,
    parseInt(process.env.SALT_ROUND as string)
  );
});

userSchema.post(
  "findOneAndUpdate",

  async function () {
    const user = await this.model.findOne(this.getQuery());
    try {
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

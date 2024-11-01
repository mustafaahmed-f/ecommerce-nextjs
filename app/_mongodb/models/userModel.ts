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
    isConfirmed: {
      type: Boolean,
      default: false,
      enum: ["true", "false"],
    },
    // customID: String,
    provider: {
      type: String,
      default: "system",
      enum: ["GOOGLE", "system"],
      required: true,
    },
    address: {
      unit_number: Number,
      street_number: Number,
      address_line1: { type: String },
      address_line2: String, //For more address details like (dep. num. , building num , PO box num , etc...)
      city: { type: String },
      country: { type: String },
      geolocation: {
        lat: Number,
        long: Number,
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

const userModel = mongoose.model("User", userSchema);

export default userModel;

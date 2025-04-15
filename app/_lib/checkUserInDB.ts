import connectDB from "../_mongodb/dbConnect";
import userModel from "../_mongodb/models/userModel";
import { v4 as uuidv4 } from "uuid";

export async function checkUserInDB(profile: any) {
  // await connectDB();
  const user = await userModel.findOne({ email: profile.email });

  if (!user) {
    const newUser = new userModel({
      email: profile.email,
      userName: `${profile.name.split(" ").join("") + Math.floor(Math.random() * 1000)}_${uuidv4()}`,
      profileImage: profile.image,
      phoneNumber: "",
      password: "",
      firstName: profile.name.split(" ")[0] ?? "",
      lastName: profile.name.split(" ")[1] ?? "",
      address: {
        city: "",
        country: "",
        unit_number: 0,
        street_number: 0,
        address_line1: "",
        address_line2: "",
        geolocation: {
          lat: 0,
          long: 0,
        },
      },
      provider: "google",
    });
    await newUser.save();
  }
}

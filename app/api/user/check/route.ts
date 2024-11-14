import connectDB from "@/app/_mongodb/dbConnect";
import userModel from "@/app/_mongodb/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name, image } = await request.json();

    //// check user existence in DB:
    await connectDB();

    const dbUser = await userModel.findOne({ email });

    if (dbUser && dbUser.provider === "system") {
      return NextResponse.json(
        { error: "Use system login please" },
        { status: 400 }
      );
    }
    if (!dbUser) {
      await userModel.create({
        userName: name.split(" ").join(""),
        email,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
        profileImage: image,
        phoneNumber: "",
        password: "",
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
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error: any) {
    console.log("Check API error : ", error);
    throw new Error(`Error occured : ${error.message}`, { cause: 500 });
  }
}

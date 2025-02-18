import { applyMiddlewares } from "@/app/_lib/middlewares";
import connectDB from "@/app/_mongodb/dbConnect";
import userModel from "@/app/_mongodb/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata";

export async function POST(request: NextRequest) {
  const applyMiddleware = await applyMiddlewares({
    request,
    middlewares: [],
    applyAuth: true,
  });
  if (!applyMiddleware) {
    throw new Error("Can't use this route while logged in !!", { cause: 400 });
  }

  const {
    address,
    userName,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    profileImage,
    cid,
  } = await request.json();
  console.log(profileImage);
  const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT!,
    pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL!,
  });
   
  try {
    await connectDB();

    // Validate required fields
    const missingFields = [];
    if (!userName) missingFields.push("userName");
    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!phoneNumber) missingFields.push("phoneNumber");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const checkUserExistence = await userModel.findOne({ email });
    if (checkUserExistence) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create the user
    const user = new userModel({
      userName,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      profileImage,
      cid,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 400 }
      );
    }

    // // Assign and save the user's profile image
    // user.profileImage = finalURL;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully!",
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    try {
      await pinata.files.delete([cid]);
      // Attempt to delete the file by CID
      // await pinata.unpin(cid); // Alternative to pinata.files.delete if unsupported
      console.log("File successfully deleted from Pinata.");
    } catch (deleteError) {
      console.error("Failed to delete file from Pinata:", deleteError);
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

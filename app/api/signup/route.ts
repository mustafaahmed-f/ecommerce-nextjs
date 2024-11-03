import userModel from "@/app/_mongodb/models/userModel";
import { pinata } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      address,
      userName,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      image,
    } = await request.json()!;

    const user = new userModel({
      userName,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 400 }
      );
    }

    const keyRequest = await fetch("/api/key");
    const keyData = await keyRequest.json();
    const upload = await pinata.upload.file(image).key(keyData.JWT);
    const urlRequest = await fetch("/api/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid: upload.cid }),
    });
    const finalURL = await urlRequest.json();

    user.profileImage = finalURL;
    await user.save();

    return NextResponse.json({
      message: "Account created successfully !",
      user,
    });
  } catch (error) {
    throw new Error("Failed to create user " + error);
  }
}

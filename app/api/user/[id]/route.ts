import { applyMiddlewares } from "@/app/_lib/middlewares";
import connectDB from "@/app/_mongodb/dbConnect";
import userModel from "@/app/_mongodb/models/userModel";
import { NextRequest, NextResponse } from "next/server";

//// Get user info api
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    console.log("User's id : ", id);
    const user = await userModel.findById(id).select("-password");
    console.log("User : ", user);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    throw new Error(`Internal Server Error :  + ${error.message}`, {
      cause: 500,
    });
  }
}

//// update user
export async function PUT(request: NextRequest, params: any) {}

//// delete User
export async function DELETE(request: NextRequest) {}

import userModel from "@/app/_mongodb/models/userModel";
import { NextResponse } from "next/server";

// Authentication middleware function
export async function authMiddleware(decoded: any) {
  try {
    // await connectDB();
    // Find the user associated with the token's ID
    const user = await userModel.findOne({ _id: (decoded as any).id });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Return null if everything is valid to allow the request to proceed
    return null;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

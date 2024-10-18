import { verifyToken } from "@/app/_lib/tokenMethods";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/app/_mongodb/models/userModel";

// Authentication middleware function
export async function authMiddleware(request: NextRequest) {
  try {
    // Retrieve the cookie from the headers
    const cookie = request.headers.get("cookie");

    // Check if the cookie exists and contains the 'token=' string
    if (!cookie || !cookie.includes("token=")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract the token value from the cookie string
    const token = cookie.split("token=")[1].split(";")[0];

    // Verify the token using the verifyToken function
    const decoded = verifyToken({ token });
    if (!decoded || !(decoded as any).id) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }

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
      { status: 500 }
    );
  }
}

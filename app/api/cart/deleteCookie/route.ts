import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import connectDB from "@/app/_mongodb/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    await connectDB();
    try {
      const cookieName = process.env.NEXT_PUBLIC_OFFLINE_CART_KEY as string;
      const response = NextResponse.json({
        success: true,
        message: "Cookie has been removed successfully !!",
      });
      response.cookies.set(cookieName, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0), // Deletes the cookie
        path: "/", // Ensure it's deleted on all paths
      });

      return response;
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
});

import { applyMiddlewares } from "@/app/_lib/middlewares";
import { signToken } from "@/app/_lib/tokenMethods";
import connectDB from "@/app/_mongodb/dbConnect";
import userModel from "@/app/_mongodb/models/userModel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(request: NextRequest) {
  // Parse the request body
  try {
    //// Make sure user is not logged in:
    const applyMiddleware = await applyMiddlewares({
      request,
      middlewares: [],
      applyAuth: true,
    });

    if (!applyMiddleware) {
      throw new Error("Can't use this route while logged in !!", {
        cause: 400,
      });
    }

    const { email, password } = await request.json();
    await connectDB();
    const user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const token = signToken({
      payload: {
        id: user._id,
        email: user.email,
        provider: "system",
      },
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully !",
        user,
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set("next_ecommerce_token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict", // Necessary for cross-origin cookies
      maxAge: 86400,
      secure: process.env.NODE_ENV === "production", // True in production for HTTPS
    });

    // Set CORS headers
    response.headers.set(
      "Access-Control-Allow-Origin",
      // "http://localhost:3000/" i=21 .. l=22
      process.env.NEXTAUTH_URL?.substring(
        0,
        process.env.NEXTAUTH_URL.length - 1
      ) as string
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

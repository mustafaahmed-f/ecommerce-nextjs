import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../_mongodb/middlewares/authMiddleware";
import { auth } from "./auth";
import { authProviders } from "./authProviders";
import { signToken, verifyToken } from "./tokenMethods";

//// to see if the user is logged in using auth.js or using our DB or not logged in.
export async function chooseMiddleware(
  request: NextRequest,
  authorization?: boolean,
) {
  const session = await auth();

  if (session?.user) {
    //// No Admin has google account .. admin has special system account;
    if (authorization)
      return NextResponse.json(
        {
          success: false,
          error: "You are not authorized !!",
        },
        { status: 401 },
      );
    return null;
  }
  const cookie = request.cookies.get("next_ecommerce_token");

  // Check if the cookie exists and contains the 'token=' string
  if (!cookie) {
    return NextResponse.json(
      { success: false, error: "Please login first !!" },
      { status: 401 },
    );
  }

  // Extract the token value from the cookie string
  const token = cookie.value;

  let decoded;
  try {
    decoded = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    if (!decoded || !decoded.provider) {
      return NextResponse.json(
        { error: "Invalid token structure" },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid token structure" },
      { status: 400 },
    );
  }

  const provider = (decoded as any).provider;

  // Refresh token if expired, using the correct provider signature
  try {
    // Verify the token with the appropriate signature
    const verifiedToken = verifyToken({
      token,
      signature:
        provider === authProviders.system
          ? process.env.SIGNATURE
          : process.env.NEXTAUTH_SECRET,
    });

    // Call the appropriate middleware based on the provider
    if (provider === authProviders.system)
      return authMiddleware(verifiedToken, authorization);
  } catch (error) {
    if ((error as Error).message === "JWT expired") {
      // Refresh the token
      const newAccessToken = signToken({
        payload: { id: decoded.id, provider: decoded.provider },
        expiresIn: "1d",
        signature:
          provider === authProviders.system
            ? process.env.SIGNATURE
            : process.env.NEXTAUTH_SECRET,
      });
      const response = NextResponse.json({
        message: "Token refreshed successfully",
      });
      response.cookies.set("token", newAccessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        secure: true,
        sameSite: "strict",
      });

      return response;
    }
    // Other errors during verification
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./tokenMethods";
import { authProviders } from "./authProviders";
import { authMiddleware } from "../_mongodb/middlewares/authMiddleware";
import { nextAuthMiddleware } from "../_mongodb/middlewares/nextAuthMiddleware";

// To know if we will apply the custom auth middleware or the auth middleware of nextAuth:
export async function chooseMiddleware(request: NextRequest) {
  const cookie = request.headers.get("cookie");

  // Check if the cookie exists and contains the 'token=' string
  if (!cookie || !cookie.includes("token=")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract the token value from the cookie string
  const token = cookie.split("token=")[1].split(";")[0];

  let decoded;
  try {
    decoded = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid token structure" },
      { status: 400 }
    );
  }

  const provider = (decoded as any).provider;

  switch (provider) {
    case authProviders.system:
      let decoded = verifyToken({ token });
      if (!decoded || !(decoded as any).id) {
        return NextResponse.json(
          { error: "Invalid token payload" },
          { status: 401 }
        );
      }

      return authMiddleware(decoded);

    case authProviders.google:
      let verifyNextAuthToken = verifyToken({
        token,
        signature: process.env.NEXTAUTH_SECRET as string,
      });
      if (!verifyNextAuthToken) {
        return NextResponse.json(
          { error: "Invalid nextAuth token" },
          { status: 400 }
        );
      }
      return nextAuthMiddleware(request);

    default:
      return NextResponse.json({ error: "Invalid provider" }, { status: 401 });
  }
}

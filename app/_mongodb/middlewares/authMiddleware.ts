// lib/middleware.ts
import { verifyToken } from "@/app/_lib/tokenMethods";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/app/_mongodb/models/userModel";

// Authentication middleware function
export async function authMiddleware(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!authorization.startsWith(process.env.TOKEN_BEARER as string)) {
      return NextResponse.json({ error: "Invalid bearer" }, { status: 401 });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const decoded = verifyToken({
      token: token,
    });
    if (!(decoded as any).id) {
      return NextResponse.json({ error: "Invalid payload !" }, { status: 401 });
    }

    const user = await userModel.findOne({ _id: (decoded as any).id });

    if (!user) {
      return NextResponse.json(
        { error: "User is not found !" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  // If token is valid, return null to continue to the handler
  return null;
}

import { cookies } from "next/headers";
import { auth } from "./auth";
import { verifyToken } from "./tokenMethods";

export async function getUserId() {
  const session = await auth();
  if (session?.user) {
    return session.user.userId;
  }
  const cookie = cookies();
  const token = cookie.get("next_ecommerce_token")?.value;
  if (!token) {
    return {
      success: false,
      message: "Token not found",
    };
  }
  const verifiedToken: any = verifyToken({
    token,
    signature: process.env.SIGNATURE,
  });

  return verifiedToken.id;
}

import { NextRequest, NextResponse } from "next/server";
import { applyMiddlewares } from "./app/_lib/middlewares";
import { auth } from "./app/_lib/auth";
import { cookies } from "next/headers";

export default async function middleware(request: NextRequest) {
  const nextAuthToken = cookies().get("authjs.session-token")?.value;
  const systemAuthToken = cookies().get("next_ecommerce_token")?.value;

  if (request.nextUrl.pathname === "/updateprofile") {
    if (nextAuthToken || systemAuthToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (!nextAuthToken && !systemAuthToken) return NextResponse.next();

  return NextResponse.redirect(new URL("/", request.url));

  // console.log(cookie);
}

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
  matcher: ["/api/signup", "/api/login", "/login", "/signup"],
};

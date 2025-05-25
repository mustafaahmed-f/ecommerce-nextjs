import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const allowedOrigins = [
  "http://localhost:3000",
  "https://ecommerce-nextjs-by-mustafa.vercel.app",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const AuthPaths: string[] = ["/updateprofile", "/cartcheckout", "/orders"];
const nonAuthPaths: string[] = ["/logIn", "/signUp"];

export default async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const response = NextResponse.next();

  // Set CORS Headers for all responses
  if (
    origin?.endsWith(".vercel.app") ||
    origin?.startsWith("https://ecommerce-nextjs-by-mustafa") ||
    allowedOrigins.includes(origin)
  ) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  const nextAuthToken = cookies().get("authjs.session-token")?.value;
  const systemAuthToken = cookies().get("next_ecommerce_token")?.value;

  const pathname = request.nextUrl.pathname;

  // Check if the request is for a protected path
  const needsAuth = AuthPaths.some(
    (protectedPath) =>
      pathname === protectedPath || pathname.startsWith(protectedPath + "/"),
  );

  if (needsAuth) {
    if (nextAuthToken || systemAuthToken) {
      return response; // Authenticated, allow the request
    } else {
      // Not authenticated, redirect to login
      const redirectURL = new URL("/logIn", request.url);
      redirectURL.searchParams.set("redirectto", pathname);
      return NextResponse.redirect(redirectURL);
    }
  }

  const needsNonAuth = nonAuthPaths.some(
    (protectedPath) =>
      pathname === protectedPath || pathname.startsWith(protectedPath + "/"),
  );

  if (needsNonAuth) {
    if (nextAuthToken || systemAuthToken) {
      const redirectURL = new URL("/", request.url);
      return NextResponse.redirect(redirectURL);
    }
  }

  return response; // No authentication needed for other paths
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // Match all routes except Next.js internals
  ],
};

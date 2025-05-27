import { NextResponse } from "next/server";

export const withCORS = (response: NextResponse, origin: string | null) => {
  if (origin && origin.startsWith("https://ecommerce-nextjs-by-mustafa")) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  response.headers.set("Access-Control-Max-Age", "86400"); // optional, for caching preflight
  return response;
};

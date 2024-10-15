// lib/middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Define an array of middleware functions
type Middleware = (request: NextRequest) => Promise<NextResponse | null>;

// Function to apply multiple middleware functions
export async function applyMiddlewares(
  request: NextRequest,
  middlewares: Middleware[]
) {
  for (const middleware of middlewares) {
    const result = await middleware(request);
    if (result) {
      return result; // Stop and return if any middleware returns a response
    }
  }
  return null;
}

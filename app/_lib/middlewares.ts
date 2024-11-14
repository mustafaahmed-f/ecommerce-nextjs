// lib/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { chooseMiddleware } from "./chooseMiddleware";

// Define an array of middleware functions
type Middleware = (request: NextRequest) => Promise<NextResponse | null>;

// Function to apply multiple middleware functions
export async function applyMiddlewares({
  request,
  middlewares = [],
  applyAuth = false,
}: {
  request: NextRequest;
  middlewares: Middleware[];
  applyAuth?: boolean;
}) {
  if (applyAuth) {
    const authMiddleware = await chooseMiddleware(request);
    if (authMiddleware) {
      return authMiddleware;
    }
  }

  // these are other middlewares ( ex: validation middleware )
  for (const middleware of middlewares) {
    const result = await middleware(request);
    if (result) {
      return result; // Stop and return if any middleware returns a response
    }
  }
  return null;
}

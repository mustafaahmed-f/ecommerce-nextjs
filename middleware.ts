import { NextRequest, NextResponse } from "next/server";
import { applyMiddlewares } from "./app/_lib/middlewares";

export default async function middleware(req: NextRequest) {
  const responseOfMiddlewares = await applyMiddlewares(req, []);
  if (responseOfMiddlewares) {
    return responseOfMiddlewares;
  }

  return NextResponse.next();
}

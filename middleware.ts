import { NextRequest, NextResponse } from "next/server";
import { applyMiddlewares } from "./app/_lib/middlewares";

export default async function middleware(request: NextRequest) {
  // console.log("MiddleWare called");
  const authMiddleWare = await applyMiddlewares({
    request,
    middlewares: [],
    applyAuth: true,
  });
  if (authMiddleWare) {
    //// Not logged in;
    return NextResponse.next();
  }
  // console.log(cookie);
}

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
  matcher: ["/api/signup", "/api/login", "/updateProfile", "/login", "/signup"],
};

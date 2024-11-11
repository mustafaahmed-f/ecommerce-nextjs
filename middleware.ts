import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  // console.log("MiddleWare called");
  const cookie = request.cookies.get("next_ecommerce_token");
  // console.log(cookie);

  return NextResponse.next();
}

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

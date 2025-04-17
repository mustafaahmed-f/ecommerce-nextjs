import { applyMiddlewares } from "@/app/_lib/middlewares";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import { NextRequest, NextResponse } from "next/server";

//// Get cart info
// export async function GET(request: NextRequest) {

// }
export const GET = withMiddleWare(
  async (request: NextRequest) => {
    return NextResponse.json({ success: true, message: "Done" });
  },
  [],
  true,
);

//// add to cart
export async function POST(request: NextRequest) {}

//// update cart ( quantity )
export async function PUT(request: NextRequest, params: any) {}

//// delete cart
export async function DELETE(request: NextRequest) {}

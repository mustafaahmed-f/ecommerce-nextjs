import { getUserId } from "@/app/_lib/getUserId";
import { applyMiddlewares } from "@/app/_lib/middlewares";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import { NextRequest, NextResponse } from "next/server";

//// Get cart info
export const GET = withMiddleWare({
  handler: async (request: NextRequest) => {
    const userId = await getUserId();
    return NextResponse.json({ success: true, message: "Done", userId });
  },
  middleWares: [],
  applyAuth: true,
});

//// add to cart
export async function POST(request: NextRequest) {}

//// update cart ( quantity )
export async function PUT(request: NextRequest, params: any) {}

//// delete cart
export async function DELETE(request: NextRequest) {}

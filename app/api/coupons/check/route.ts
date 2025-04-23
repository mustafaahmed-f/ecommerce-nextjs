import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import { NextRequest, NextResponse } from "next/server";

export const POST = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    //// Here we check if maxCout is reached and if coupon is expired or not and if it is still active
    try {
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
});

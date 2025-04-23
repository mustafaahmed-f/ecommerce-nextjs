import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import { NextRequest, NextResponse } from "next/server";

//// Get coupons info api
export const GET = withMiddleWare({
  applyAuth: true,
  authorization: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
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

//// Add new Coupon
export const POST = withMiddleWare({
  applyAuth: true,
  authorization: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
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

//// update coupon ( isActive )
export const PATCH = withMiddleWare({
  applyAuth: true,
  authorization: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
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

//// Remove coupon
export const DELETE = withMiddleWare({
  applyAuth: true,
  authorization: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
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

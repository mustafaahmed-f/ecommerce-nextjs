import { getUserId } from "@/app/_lib/getUserId";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import orderModel from "@/app/_mongodb/models/orderModel";
import userModel from "@/app/_mongodb/models/userModel";
import { NextRequest, NextResponse } from "next/server";

//// Get order info
export const GET = withMiddleWare({
  applyAuth: true,
  // authorization: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    try {
      const searchParams = request.nextUrl.searchParams;
      const orderId = searchParams.get("orderId");
      const userId = await getUserId();
      const order = await orderModel.findById(orderId);
      const user = await userModel.findById(userId);
      if (!order) {
        throw new Error("Order not found !!");
      }
      if (user.role !== "admin") {
        if (!order.userID.equals(userId))
          throw new Error("Order doesn't belong to user !!");
      }
      return NextResponse.json({ success: true, order }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
});

//// add order
export async function POST(request: NextRequest) {}

//// update order
export async function PUT(request: NextRequest, params: any) {}

//// delete order
export async function DELETE(request: NextRequest) {}

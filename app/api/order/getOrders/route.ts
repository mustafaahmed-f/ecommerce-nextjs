import { getUserId } from "@/app/_lib/getUserId";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import orderModel from "@/app/_mongodb/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    try {
      const searchParams = request.nextUrl.searchParams;
      const page = searchParams.get("page") || "1";
      const status = searchParams.get("status") || "";
      const userId = await getUserId();
      const filterObj: any = {};
      if (status && status !== "null")
        filterObj["orderStatus.status"] = { $eq: status };

      const orders = await orderModel
        .find({ userID: userId, ...filterObj })
        .skip((parseInt(page) - 1) * 7)
        .limit(7)
        .sort({ createdAt: -1 });

      const totalOrders = await orderModel.find(filterObj).countDocuments();

      if (!orders)
        return NextResponse.json({ success: false, error: "No orders found" });

      return NextResponse.json(
        { success: true, orders, totalOrders },
        { status: 200 },
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: error.cause || 500 },
      );
    }
  },
});

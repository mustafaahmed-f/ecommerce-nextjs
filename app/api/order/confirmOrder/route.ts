import { confirmOrder } from "@/app/_lib/confirmOrder";
import { getUserId } from "@/app/_lib/getUserId";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import connectDB from "@/app/_mongodb/dbConnect";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PUT = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    await connectDB();
    try {
      const userId = await getUserId();
      const orderId = request.nextUrl.searchParams.get("orderId")!;
      const result = await confirmOrder(orderId, userId);

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 500 },
        );
      }
      revalidateTag(`orders-${userId}`);
      return NextResponse.json({
        success: true,
        message: "Order confirmed successfully !",
        order: result.order,
      });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
});

import { confirmOrder } from "@/app/_lib/confirmOrder";
import { getUserId } from "@/app/_lib/getUserId";
import { PushNotification } from "@/app/_lib/Notifications/PushNotifications";
import { redis } from "@/app/_lib/redisClient";
import { channelName } from "@/app/_lib/redisPublishChannel";
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

      try {
        await PushNotification(
          userId,
          "orders",
          "Created",
          "created",
          `# ${result.order.orderNumber}`,
          `/view/orders/details/${result.order._id}`,
        );

        await PushNotification(
          userId,
          "orders",
          "Created",
          "created",
          `# ${result.order.orderNumber}`,
          `/view/orders/details/${result.order._id}`,
        );
      } catch (error: any) {
        console.log(error);
        throw new Error(`Error while sending push notification : ${error} !!`, {
          cause: 404,
        });
      }

      await redis.publish(
        channelName,
        JSON.stringify({
          event: "order_created",
          message: `Order #${result.order.orderNumber} has been placed.`,
          userId: userId,
          audience: "admin",
          module: "orders",
          read: false,
          createdAt: new Date("2025-07-12T14:23:00.123Z"),
          url: `/view/orders/details/${result.order._id}`,
        }),
      );

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

import { orderStatus } from "@/app/_lib/OrderStatus";
import { validateSchema } from "@/app/_lib/validateSchema";
import { requiredFieldMsg } from "@/app/_lib/validattionErrorMessages";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import orderModel from "@/app/_mongodb/models/orderModel";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const PUT = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    try {
      const searchParams = request.nextUrl.searchParams;
      const orderId = searchParams.get("orderId");
      const { status }: { status: keyof typeof orderStatus } =
        await request.json();

      //// validate data:
      const validationResult = validateSchema(
        z.object({
          status: z
            .string()
            .min(1, requiredFieldMsg("Status"))
            .refine(
              (val) => Array.from(Object.values(orderStatus)).includes(val),
              {
                message: "Invalid status",
              },
            ),
        }),
        { status },
      );
      if (!validationResult.success) {
        return NextResponse.json(
          {
            success: false,
            message: "Validation failed",
            errors: validationResult.error,
          },
          { status: 400 },
        );
      }

      const order = await orderModel.findById(orderId);

      if (!order) throw new Error("Order not found !!", { cause: 404 });

      //// Cases of change status:
      if (
        status === "cancelled" &&
        (order.orderStatus.status !== "pending" ||
          order.orderStatus.status !== "confirmed")
      ) {
        throw new Error("Order can't be cancelled !!", { cause: 400 });
      } else if (
        status === "returned" &&
        order.orderStatus.status !== "shipped" &&
        order.orderStatus.status !== "delivered"
      ) {
        throw new Error("Order can't be returned !!", { cause: 400 });
      } else if (
        status === "shipped" &&
        order.orderStatus.status !== "confirmed"
      ) {
        throw new Error("Order can't be shipped !!", { cause: 400 });
      } else if (
        status === "delivered" &&
        order.orderStatus.status !== "shipped"
      ) {
        throw new Error("Order can't be delivered !! ship it first !", {
          cause: 400,
        });
      } else if (status === "pending") {
        throw new Error("Order status can't be changed to pending !!", {
          cause: 400,
        });
      } else if (status === "confirmed") {
        throw new Error("Use confirm order api !!", { cause: 400 });
      }

      order.orderStatus.status = status;
      order.orderStatus.updatedAt = new Date();
      await order.save();

      return NextResponse.json(
        { success: true, message: "Order status updated", order },
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

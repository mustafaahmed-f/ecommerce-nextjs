import { getUserId } from "@/app/_lib/getUserId";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import orderModel from "@/app/_mongodb/models/orderModel";
import productsModel from "@/app/_mongodb/models/productsModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PUT = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    //TODO : Re-use session inside the save method when convert to mongoDB atlas
    //// Start session of mongoose so if one of the updating processes ( product or cart ) failed, both of the processes stop:
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const userId = await getUserId();
      const searchParams = request.nextUrl.searchParams;
      const orderId = searchParams.get("orderId");

      const order = await orderModel.findById(orderId);
      if (!order) {
        throw new Error("Order not found !!");
      }

      console.log("UserID : ", userId);
      console.log("Order userID : ", order.userID);
      if (String(userId) !== String(order.userID)) {
        throw new Error("Order doesn't belong to user !!");
      }

      if (order.paymentMethod !== "card") {
        throw new Error(
          "Confirmation is used with only card payment method !!",
          { cause: 400 },
        );
      }

      if (order.orderStatus.status !== "pending") {
        throw new Error("Order is not pending. Check order status again !!", {
          cause: 400,
        });
      }

      //// update product's stock if not from cart:
      if (!order.isFromCart) {
        const product = await productsModel.findOneAndUpdate(
          {
            productId: order.products[0].productID,
            stock: { $gte: order.products[0].quantity },
          },
          { $inc: { stock: -order.products[0].quantity } },
          { new: true },
        );
        if (!product) {
          throw new Error(
            "Product not found or error while updating product !!",
          );
        }
      }

      //// update order's status:
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: { orderStatus: { status: "confirmed" } } },
        { new: true },
      );
      if (!updatedOrder) {
        throw new Error("Order not found or error while updating order !!");
      }

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json(
        {
          success: true,
          message: "Order confirmed successfully !",
          order: updatedOrder,
        },
        { status: 200 },
      );
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
});

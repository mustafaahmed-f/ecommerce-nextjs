import mongoose from "mongoose";
import orderModel from "../_mongodb/models/orderModel";
import productsModel from "../_mongodb/models/productsModel";
import couponsModel from "../_mongodb/models/couponsModel";
import { revalidateTag } from "next/cache";

export async function confirmOrder(orderId: string, userId?: string) {
  //TODO : Re-use session inside the save method when convert to mongoDB atlas
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await orderModel.findById(orderId);
    if (!order) throw new Error("Order not found !!");

    if (userId && String(userId) !== String(order.userID)) {
      throw new Error("Order doesn't belong to user !!");
    }

    if (order.orderStatus.status !== "pending") {
      throw new Error("Order is not pending. Check order status again !!");
    }

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
        throw new Error("Product not found or stock issue !!");
      }
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { $set: { orderStatus: { status: "confirmed", updatedAt: new Date() } } },
      { new: true },
    );
    if (!updatedOrder) {
      throw new Error("Order update failed !!");
    }

    if (order.couponId) {
      const updatedCoupon = await couponsModel.findByIdAndUpdate(
        order.couponId,
        {
          $inc: { usageCount: 1 },
        },
        { new: true },
      );

      if (!updatedCoupon) {
        throw new Error("Error while updating coupon !!");
      }
    }

    revalidateTag(`order-${orderId}`);

    await session.commitTransaction();
    session.endSession();
    return { success: true, order: updatedOrder };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, error: error.message };
  }
}

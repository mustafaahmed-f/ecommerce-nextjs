import { getUserId } from "@/app/_lib/getUserId";
import { validateSchema } from "@/app/_lib/validateSchema";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import cartModel from "@/app/_mongodb/models/cartModel";
import couponsModel from "@/app/_mongodb/models/couponsModel";
import orderModel from "@/app/_mongodb/models/orderModel";
import productsModel from "@/app/_mongodb/models/productsModel";
import userModel from "@/app/_mongodb/models/userModel";
import {
  createOrderSchema,
  userInfoSchema,
} from "@/app/_mongodb/validationSchemas/Orders/AddNewOrderSchema";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";
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
      const order = await orderModel.findById(orderId).populate({
        path: "couponId",
        select: "discountType discount code",
      });
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
export const POST = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const userId = await getUserId();
      const orderObj = await request.json();

      //// validate data:
      const validationResult = validateSchema(createOrderSchema, orderObj);
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

      if (String(userId) !== String(orderObj.userID)) {
        throw new Error("Order doesn't belong to user !!");
      }

      const newOrderObj = {
        ...orderObj,
        orderStatus: { status: "pending", updatedAt: new Date() },
      };

      if (orderObj.couponId) {
        const coupon = await couponsModel.findById(orderObj.couponId);
        if (!coupon) {
          throw new Error("Coupon not found !!");
        }
      }

      //// Check if payment method is cash so order status is confirmed
      if (orderObj.paymentMethod === "cash") {
        newOrderObj.orderStatus.status = "confirmed";
        //// if order is for single product , then update product stock
        if (!orderObj.isFromCart) {
          const product = await productsModel.findOneAndUpdate(
            {
              productId: orderObj.products[0].productID,
              stock: { $gte: orderObj.products[0].quantity },
            },
            { $inc: { stock: -orderObj.products[0].quantity } },
            { new: true },
          ).session(session);
          if (!product) {
            throw new Error(
              "Product not found or error while updating product !!",
            );
          }
        }
      }

      //// Empty user's cart:
      if (orderObj.isFromCart) {
        const cart = await cartModel.findOne({ userID: userId });
        if (!cart) {
          throw new Error("Cart not found !!");
        }
        cart.products = [];
        cart.subTotal = 0;
        await cart.save({session});
      }

      const order = await orderModel.create(newOrderObj);
      if (!order) {
        throw new Error("Error while creating order !!");
      }

      if (orderObj.paymentMethod === "cash" && orderObj.couponId) {
        const updatedCoupon = await couponsModel.findByIdAndUpdate(
          orderObj.couponId,
          {
            $inc: { usageCount: 1 },
          },
          { new: true },
        );

        if (!updatedCoupon) {
          throw new Error("Error while updating coupon !!");
        }
      }

      await session.commitTransaction();
      session.endSession();

      revalidateTag(`orders-${userId}`);

      return NextResponse.json(
        {
          success: true,
          message:
            newOrderObj.orderStatus === "pending"
              ? "Proceed to payment please !"
              : "Order confirmed successfully !",
          order,
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

//// update order
export const PUT = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    try {
      const searchParams = request.nextUrl.searchParams;
      const orderId = searchParams.get("orderId");
      const userInfo = await request.json();
      const userId = await getUserId();

      //// validate data:
      const validationResult = validateSchema(userInfoSchema, userInfo);
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

      const order = await orderModel.findOneAndUpdate(
        { _id: orderId, userID: userId },
        { $set: { userInfo } },
        { new: true },
      );

      if (!order) {
        throw new Error("Order not found or failed to update order !!", {
          cause: 400,
        });
      }

      revalidateTag(`orders-${userId}`);

      return NextResponse.json({ success: true, order }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
});

//// delete order
// export async function DELETE(request: NextRequest) {}

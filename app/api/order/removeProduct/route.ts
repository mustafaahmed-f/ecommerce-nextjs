import { getUserId } from "@/app/_lib/getUserId";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import orderModel from "@/app/_mongodb/models/orderModel";
import productsModel from "@/app/_mongodb/models/productsModel";
import { CartProduct } from "@/app/cart/_types/CartType";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";
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
      const searchParams = request.nextUrl.searchParams;
      const productId = searchParams.get("productId");
      const orderId = searchParams.get("orderId");
      const userId = await getUserId();

      const order = await orderModel.findOne({ _id: orderId, userID: userId });
      if (!order) throw new Error("Order not found !!", { cause: 404 });

      const product = await productsModel.findOne({ productId: productId });
      if (!product) throw new Error("Product not found !!", { cause: 404 });

      const productInOrder = order.products.find(
        (item: CartProduct) => item.productID.toString() === productId,
      );
      if (!productInOrder)
        throw new Error("Product not found in order !!", { cause: 404 });
      const productQuantity = productInOrder.quantity;

      if (
        order.isFromCart ||
        (!order.isFromCart && order.orderStatus.status === "confirmed")
      ) {
        product.stock += productQuantity;
        await product.save();
      } else {
        throw new Error("You can't remove product from order !!", {
          cause: 403,
        });
      }

      order.products = order.products.filter(
        (item: CartProduct) => item.productID.toString() !== productId,
      );
      order.subTotal -= (product.price - product.discount) * productQuantity;
      order.finalPaidAmount -=
        (product.price - product.discount) * productQuantity;
      await order.save();

      await session.commitTransaction();
      session.endSession();

      revalidateTag(`orders-${userId}`);
      return NextResponse.json(
        { success: true, message: "Product removed from order !!", order },
        { status: 200 },
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: error?.cause || 500 },
      );
    }
  },
});

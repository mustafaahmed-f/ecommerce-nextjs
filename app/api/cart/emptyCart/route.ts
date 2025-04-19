import { getUserId } from "@/app/_lib/getUserId";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import cartModel from "@/app/_mongodb/models/cartModel";
import productsModel from "@/app/_mongodb/models/productsModel";
import { CartProduct } from "@/app/cart/_types/CartType";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    //TODO : Re-use session inside the save method when convert to mongoDB atlas
    //// Start session of mongoose so if one of the updating processes ( product or cart ) failed, both of the processes stop:
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const searchParams = request.nextUrl.searchParams;
      const userId = await getUserId();
      //// Check if cart exists and belongs to user:
      const cart = await cartModel.findOne({
        userID: userId,
        _id: searchParams.get("cartId"),
      });
      if (!cart) {
        return NextResponse.json(
          {
            success: false,
            error: "Cart is not found or cart doesn't belong to user",
          },
          { status: 404 },
        );
      }

      const missingProducts: number[] = [];

      const updatedPromises = cart.products.map(async (p: CartProduct) => {
        let product = await productsModel.findOne({ productId: p.productID });
        if (product) {
          product.stock += p.quantity;
          return product.save();
        } else {
          missingProducts.push(p.productID);
        }
      });

      if (missingProducts.length > 0) {
        throw new Error(
          `Products of ids : ${missingProducts.join(", ")} were not found or failed to update them !!`,
          { cause: 400 },
        );
      }

      await Promise.all(updatedPromises);

      cart.products = [];
      cart.subTotal = 0;
      await cart.save();

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json({
        success: true,
        message: "Product has been removed successfully !!",
        cart,
      });
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ success: false, error: error?.message });
    }
  },
});

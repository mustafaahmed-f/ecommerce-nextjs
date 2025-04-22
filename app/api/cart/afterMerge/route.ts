import { getUserId } from "@/app/_lib/getUserId";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import cartModel from "@/app/_mongodb/models/cartModel";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    try {
      const searchParams = request.nextUrl.searchParams;
      const userId = await getUserId();
      //// Check if cart exists and belongs to user:
      const cart = await cartModel.findOne({
        userID: userId,
        _id: searchParams.get("cartId"),
      });
      if (!cart)
        return NextResponse.json(
          {
            success: false,
            error: "Cart is not found or cart doesn't belong to user",
          },
          { status: 404 },
        );

      const { mergedCart } = await request.json();

      const newCart = await cartModel.findOneAndUpdate(
        { _id: searchParams.get("cartId") },
        {
          $set: {
            products: mergedCart.products,
            subTotal: mergedCart.subTotal,
          },
        },
        { new: true },
      );

      if (!newCart) throw new Error("Error while updating cart !!");

      return NextResponse.json(
        {
          success: true,
          message: "Carts have been merged successfully !!",
          cart: newCart,
        },
        { status: 200 },
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
});

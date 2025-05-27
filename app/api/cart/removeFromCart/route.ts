import { getSubTotal } from "@/app/_lib/getSubTotal";
import { getUserId } from "@/app/_lib/getUserId";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import connectDB from "@/app/_mongodb/dbConnect";
import cartModel from "@/app/_mongodb/models/cartModel";
import productsModel from "@/app/_mongodb/models/productsModel";
import { CartProduct } from "@/app/cart/_types/CartType";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    await connectDB();
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

      //// Check if product already exists in DB
      const product = await productsModel.findOne({
        productId: parseInt(searchParams.get("productId")!),
      });
      if (!product) {
        //// Check if product exists in cart:
        if (
          cart.products.find(
            (p: CartProduct) =>
              String(p.productID) === searchParams.get("productId"),
          )
        ) {
          const cartProducts = cart.products.filter(
            (p: CartProduct) =>
              p.productID !== parseInt(searchParams.get("productId")!),
          );

          const subTotal = getSubTotal(cartProducts);
          cart.products = cartProducts;
          cart.subTotal = subTotal;
          await cart.save({ session });

          await session.commitTransaction();
          session.endSession();
        }

        return NextResponse.json(
          {
            success: false,
            error: "Product is not found in DB",
          },
          { status: 404 },
        );
      }

      //// Check if product already exists in cart
      const productInCart = cart.products.find(
        (p: CartProduct) =>
          String(p.productID) === searchParams.get("productId"),
      );
      if (!productInCart) {
        return NextResponse.json({
          success: false,
          error: "Product doesn't exist in cart",
        });
      }

      let newProductStock = productInCart.quantity + product.stock;
      let newCartProducts: CartProduct[] = cart.products.filter(
        (p: CartProduct) =>
          p.productID !== parseInt(searchParams.get("productId")!),
      );
      let newSubTotal = getSubTotal(newCartProducts);

      product.stock = newProductStock;
      await product.save({ session });

      cart.products = newCartProducts;
      cart.subTotal = newSubTotal;
      await cart.save({ session });

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

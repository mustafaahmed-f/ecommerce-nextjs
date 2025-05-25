import { redis } from "@/app/_lib/redisClient";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import productsModel from "@/app/_mongodb/models/productsModel";
import { CartProduct, ICart } from "@/app/cart/_types/CartType";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withMiddleWare({
  applyAuth: false,
  middleWares: [],
  handler: async (request: NextRequest) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const searchParams = request.nextUrl.searchParams;
      const cartId = searchParams.get("cartId");
      const fetchedCart = await redis.get(`cart:${cartId}`);
      if (!fetchedCart)
        throw new Error("Cart is not found or error while fetching cart !!", {
          cause: 404,
        });

      let cart: ICart = fetchedCart as ICart;

      const missedPRoducts: number[] = [];

      const promiseArr = cart.products.map(async (p: CartProduct) => {
        let product = await productsModel.findOne({ productId: p.productID });
        if (product) {
          product.stock += p.quantity;
          return product.save({ session });
        } else {
          //// Remove product from cart if not found :
          cart.products = cart.products.filter(
            (p) => p.productID !== p.productID,
          );
          missedPRoducts.push(p.productID);
        }
      });

      if (missedPRoducts.length)
        throw new Error(
          `Products of ids : ${missedPRoducts.join(", ")} were not found or error while fetching product, Try again please !!`,
          { cause: 404 },
        );

      await Promise.all(promiseArr);

      let newCart = {
        ...cart,
        products: [],
        subTotal: 0,
      };
      await redis.set(`cart:${cartId}`, newCart);

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json(
        {
          success: true,
          message: "Cart has been emptied successfully !",
          cart: newCart,
        },
        { status: 200 },
      );
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      return NextResponse.json(
        { success: false, error: error?.message },
        { status: error.cause || 500 },
      );
    }
  },
});

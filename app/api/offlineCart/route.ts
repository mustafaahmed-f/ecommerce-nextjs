import { redis } from "@/app/_lib/redisClient";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import { ICart } from "@/app/cart/_types/CartType";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

//// Get cart from redis
export const GET = withMiddleWare({
  middleWares: [],
  applyAuth: false,
  handler: async (request: NextRequest) => {
    //TODO : Re-use session inside the save method when convert to mongoDB atlas
    //// Start session of mongoose so if one of the updating processes ( product or cart ) failed, both of the processes stop:
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
      const cart = fetchedCart;

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json(
        { success: true, message: "Cart fetched successfully !", cart },
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

//// Add cart to redis
export const POST = withMiddleWare({
  middleWares: [],
  applyAuth: false,
  handler: async (request: NextRequest) => {
    //TODO : Re-use session inside the save method when convert to mongoDB atlas
    //// Start session of mongoose so if one of the updating processes ( product or cart ) failed, both of the processes stop:
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const cartId = uuidv4();
      const cart: ICart = {
        _id: cartId,
        userID: "",
        products: [],
        subTotal: 0,
      };
      const addedCart = await redis.set(`cart:${cartId}`, cart);
      if (!addedCart)
        throw new Error("Cart is not added or error while adding cart !!", {
          cause: 500,
        });

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json(
        { success: true, message: "Cart created successfully !", cart },
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

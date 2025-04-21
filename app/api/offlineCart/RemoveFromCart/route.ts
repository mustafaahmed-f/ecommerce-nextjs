import { getSubTotal } from "@/app/_lib/getSubTotal";
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
    //TODO : Re-use session inside the save method when convert to mongoDB atlas
    //// Start session of mongoose so if one of the updating processes ( product or cart ) failed, both of the processes stop:
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const searchParams = request.nextUrl.searchParams;
      const cartId = searchParams.get("cartId");
      const productId = searchParams.get("productId");
      const fetchedCart = await redis.get(`cart:${cartId}`);
      if (!fetchedCart)
        throw new Error("Cart is not found or error while fetching cart !!", {
          cause: 404,
        });

      let cart: ICart = fetchedCart as ICart;

      let product = await productsModel.findOne({ productId: productId });
      if (!product) {
        //// Check if product exists in cart:
        if (
          cart.products.find(
            (p: CartProduct) => String(p.productID) === productId,
          )
        ) {
          const cartProducts = cart.products.filter(
            (p: CartProduct) => p.productID !== parseInt(productId!),
          );

          const subTotal = getSubTotal(cartProducts);
          cart.products = cartProducts;
          cart.subTotal = subTotal;

          await redis.set(`cart:${cartId}`, cart);
          await session.commitTransaction();
          session.endSession();
        }
        throw new Error(
          "Product is not found or error while fetching product !!",
          {
            cause: 404,
          },
        );
      }

      let productInCart = cart.products.find(
        (p: CartProduct) => p.productID === product.productId,
      );
      if (!productInCart)
        throw new Error("Product is not found in cart !!", {
          cause: 404,
        });

      product.stock += productInCart.quantity;
      await product.save();

      const newProducts: CartProduct[] = cart.products.filter(
        (p: CartProduct) => p.productID !== product.productId,
      );

      let newSubTotal = getSubTotal(newProducts);

      let newCart = {
        ...cart,
        products: newProducts,
        subTotal: newSubTotal,
      };

      await redis.set(`cart:${cartId}`, newCart);

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json(
        {
          success: true,
          message: "Product Removed from cart successfully !",
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

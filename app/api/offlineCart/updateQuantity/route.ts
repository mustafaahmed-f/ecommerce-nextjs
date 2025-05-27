import { getSubTotal } from "@/app/_lib/getSubTotal";
import { redis } from "@/app/_lib/redisClient";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import connectDB from "@/app/_mongodb/dbConnect";
import productsModel from "@/app/_mongodb/models/productsModel";
import { CartProduct, ICart } from "@/app/cart/_types/CartType";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withMiddleWare({
  applyAuth: false,
  middleWares: [],
  handler: async (request: NextRequest) => {
    await connectDB();
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

      //// update quantity
      const { quantity } = await request.json();
      //// check if product is out of stock:

      const newStockValue = product.stock + productInCart.quantity - quantity;
      if (newStockValue < 0)
        return NextResponse.json({
          success: false,
          error: "Product is out of stock !!",
        });

      //// Update product's stock;
      product.stock = newStockValue;
      await product.save({ session });

      //// Update cart:
      const newCartProducts: CartProduct[] = cart.products.map(
        (p: CartProduct) => {
          if (p.productID === product.productId) {
            return {
              productID: p.productID,
              title: p.title,
              unitPaymentPrice: p.unitPaymentPrice,
              discount: p.discount,
              quantity,
              color: p.color,
              category: p.category,
              brand: p.brand,
              image: p.image,
            };
          }
          return p;
        },
      );

      const newSubTotal = getSubTotal(newCartProducts);

      let newCart = {
        ...cart,
        products: newCartProducts,
        subTotal: newSubTotal,
      };

      await redis.set(`cart:${cartId}`, newCart);

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json(
        {
          success: true,
          message: "Product updated to cart successfully !",
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

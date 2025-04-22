import { getSubTotal } from "@/app/_lib/getSubTotal";
import { getUserId } from "@/app/_lib/getUserId";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import cartModel from "@/app/_mongodb/models/cartModel";
import productsModel from "@/app/_mongodb/models/productsModel";
import { CartProduct } from "@/app/cart/_types/CartType";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

//// Get cart info
export const GET = withMiddleWare({
  handler: async (request: NextRequest) => {
    // const searchParams = request.nextUrl.searchParams;
    try {
      const userId = await getUserId();
      const cart = await cartModel.findOne({ userID: userId });
      if (!cart) {
        const newCart = await cartModel.create({
          userID: userId,
          products: [],
        });
        return NextResponse.json({
          success: true,
          message: "Cart created successfully !!",
          cart: newCart,
        });
      }
      return NextResponse.json({
        success: true,
        message: "Cart fetched succesfully !!",
        cart,
      });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
  middleWares: [],
  applyAuth: true,
});

//// add to cart
export const POST = withMiddleWare({
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
      if (!cart)
        return NextResponse.json(
          {
            success: false,
            error: "Cart is not found or cart doesn't belong to user",
          },
          { status: 404 },
        );

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
          await cart.save();

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
      if (productInCart) {
        return NextResponse.json({
          success: false,
          error: "Product already exists in cart",
        });
      }

      //// check if product is out of stock before adding it:
      const isOutOfStock = product.stock === 0;
      if (isOutOfStock)
        return NextResponse.json({
          success: false,
          error: "Product is out of stock !!",
        });

      //// Add product to cart:
      const productAddedToCart: CartProduct = {
        productID: product.productId,
        title: product.title,
        unitPaymentPrice: product.price,
        discount: product.discount,
        quantity: 1,
        color: product.color,
        category: product.category,
        brand: product.brand,
        image: product.image,
      };

      const cartProducts: CartProduct[] = [
        ...cart.products,
        productAddedToCart,
      ];
      const subTotal = getSubTotal(cartProducts);
      console.log("Sub total : ", subTotal);
      cart.products = cartProducts;
      cart.subTotal = subTotal;
      await cart.save();

      //// Reduce product's stock by one:
      product.stock! -= 1;
      await product.save();

      await session.commitTransaction();
      session.endSession();

      // mutate("/api/products");

      return NextResponse.json({
        success: true,
        message: "Product has been added successfully !!",
        cart,
      });
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ success: false, error: error?.message });
    }
  },
  middleWares: [],
  applyAuth: true,
});

//// update cart ( quantity )
export const PATCH = withMiddleWare({
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
          await cart.save();

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
      await product.save();

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

      cart.products = newCartProducts;
      cart.subTotal = newSubTotal;
      await cart.save();

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json({
        success: true,
        message: "Product has been updated successfully !!",
        cart,
      });
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ success: false, error: error?.message });
    }
  },
  middleWares: [],
  applyAuth: true,
});

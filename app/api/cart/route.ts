import { getSubTotal } from "@/app/_lib/getSubTotal";
import { getUserId } from "@/app/_lib/getUserId";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import cartModel from "@/app/_mongodb/models/cartModel";
import productsModel from "@/app/_mongodb/models/productsModel";
import { CartProduct } from "@/app/cart/_types/CartType";
import { ProductType } from "@/app/product/[id]/_types/Product.type";
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
      return NextResponse.json({ success: false, error: error?.message });
    }
  },
  middleWares: [],
  applyAuth: true,
});

//// add to cart
export const POST = withMiddleWare({
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

      //// Check if product already exists in DB
      const product: ProductType | null = await productsModel.findOne({
        productId: parseInt(searchParams.get("productId")!),
      });
      if (!product)
        return NextResponse.json(
          {
            success: false,
            error: "Product is not found in DB",
          },
          { status: 404 },
        );

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

      return NextResponse.json({
        success: true,
        message: "Product has been added successfully !!",
        cart,
      });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error?.message });
    }
  },
  middleWares: [],
  applyAuth: true,
});

//// update cart ( quantity )
export async function PUT(request: NextRequest, params: any) {}

//// delete cart
export async function DELETE(request: NextRequest) {}

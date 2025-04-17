import { getUserId } from "@/app/_lib/getUserId";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import cartModel from "@/app/_mongodb/models/cartModel";
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
export async function POST(request: NextRequest) {}

//// update cart ( quantity )
export async function PUT(request: NextRequest, params: any) {}

//// delete cart
export async function DELETE(request: NextRequest) {}

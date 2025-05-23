import { getSubCurrency } from "@/app/_lib/getSubCurrency";
import { getUserId } from "@/app/_lib/getUserId";
import { stripe } from "@/app/_lib/stripe";
import { validateSchema } from "@/app/_lib/validateSchema";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import couponsModel from "@/app/_mongodb/models/couponsModel";
import { stripeOrderSchema } from "@/app/_mongodb/validationSchemas/Orders/stripeOrderSchema";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request) => {
    try {
      // const searchParams = request.nextUrl.searchParams;
      //// We need it to see if we need to re-check out the order
      // const isNewOrder = searchParams.get("isNewOrder");
      const orderObj = await request.json();
      const headersList = headers();
      const origin =
        headersList.get("origin") ?? process.env.NEXT_PUBLIC_API_URL;

      //// validate data:
      const validationResult = validateSchema(stripeOrderSchema, orderObj);
      if (!validationResult.success) {
        return NextResponse.json(
          {
            success: false,
            message: "Validation failed",
            errors: validationResult.error,
          },
          { status: 400 },
        );
      }

      const userId = await getUserId();
      if (String(userId) !== String(orderObj.userID)) {
        throw new Error("Order doesn't belong to user !!");
      }
      if (orderObj.orderStatus.status !== "pending") {
        throw new Error("Order is not pending. Check order status again !!", {
          cause: 400,
        });
      }
      if (orderObj.paymentMethod !== "card") {
        throw new Error("Your payment method is not card !!", { cause: 400 });
      }

      //// Items array :

      const itemsArr = orderObj.products.map((product: any) => ({
        price_data: {
          currency: "usd",
          unit_amount:
            getSubCurrency(product.unitPaymentPrice) -
            getSubCurrency(product.discount),
          product_data: {
            name: product.title,
          },
        },
        quantity: product.quantity,
      }));

      //// Get coupon :
      let promotionCode: any = null;
      if (orderObj.couponId) {
        const couponFromDB = await couponsModel.findById(orderObj.couponId);
        if (!couponFromDB)
          throw new Error("Coupon doesn't exist !!", { cause: 400 });
        if (!couponFromDB.isActive)
          throw new Error("Coupon is not active !!", { cause: 400 });
        promotionCode = couponFromDB.stipePromotionCodeId;
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: itemsArr,
        mode: "payment",
        metadata: {
          orderId: orderObj._id,
        },
        ...(promotionCode
          ? {
              discounts: [
                {
                  promotion_code: promotionCode,
                },
              ],
            }
          : {}),
        success_url: `${origin}/successpayment?orderNumber=${orderObj.orderNumber}`,
        cancel_url: `${origin}/cancelpayment?orderNumber=${orderObj.orderNumber}`,
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",

              fixed_amount: {
                amount: getSubCurrency(3.99),
                currency: "usd",
              },
              display_name: "Shipping Fee",
            },
          },
        ],
      });

      return NextResponse.json({
        success: true,
        url: session.url,
      });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
});

import { getUserId } from "@/app/_lib/getUserId";
import { stripe } from "@/app/_lib/stripe";
import { validateSchema } from "@/app/_lib/validateSchema";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import couponsModel from "@/app/_mongodb/models/couponsModel";
import { addNewCouponSchema } from "@/app/_mongodb/validationSchemas/Coupons/AddNewCouponSchema";
import { NextRequest, NextResponse } from "next/server";

//// Add new Coupon
export const POST = withMiddleWare({
  applyAuth: true,
  authorization: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    try {
      const userId = await getUserId();
      const { code, discount, discountType, expirationDate, usageLimit } =
        await request.json();

      //// validate data:
      const validationResult = validateSchema(addNewCouponSchema, {
        code,
        discount,
        discountType,
        expirationDate,
        usageLimit,
      });

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

      //// check if coupon exists;
      const checkCouponExistence = await couponsModel.findOne({ code });
      if (checkCouponExistence)
        throw new Error("Coupon already exists", { cause: 400 });

      //// Add coupon to stripe :
      const expirationDateForCoupon = new Date(expirationDate);
      const redeemBy = Math.floor(expirationDateForCoupon.getTime() / 1000);

      const sripeCoupon = await stripe.coupons.create({
        duration: "once",
        percent_off: discountType === "percentage" ? discount : undefined,
        amount_off: discountType === "amount" ? discount : undefined,
      });

      const stripePromotionCode = await stripe.promotionCodes.create({
        coupon: sripeCoupon.id,
        code,
        expires_at: redeemBy,
        max_redemptions: usageLimit,
      });

      //// create new coupon
      const newCoupon = await couponsModel.create({
        addedBy: userId,
        code,
        discount,
        discountType,
        expirationDate,
        usageLimit,
        stripeCouponId: sripeCoupon.id,
        stipePromotionCodeId: stripePromotionCode.id,
      });

      if (!newCoupon) throw new Error("Coupon not created", { cause: 400 });

      return NextResponse.json(
        {
          success: true,
          message: "Coupon has been created successfully !!",
          coupon: newCoupon,
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

//TODO
//// Get coupons info api
export const GET = withMiddleWare({
  applyAuth: true,
  authorization: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    try {
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
});

//TODO
//// update coupon ( isActive )
export const PATCH = withMiddleWare({
  applyAuth: true,
  authorization: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    try {
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
});

//TODO
//// Remove coupon
export const DELETE = withMiddleWare({
  applyAuth: true,
  authorization: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    try {
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: 500 },
      );
    }
  },
});

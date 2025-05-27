import { stripe } from "@/app/_lib/stripe";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import connectDB from "@/app/_mongodb/dbConnect";
import couponsModel from "@/app/_mongodb/models/couponsModel";
import { addNewCouponSchema } from "@/app/_mongodb/validationSchemas/Coupons/AddNewCouponSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = withMiddleWare({
  applyAuth: true,
  middleWares: [],
  handler: async (request: NextRequest) => {
    try {
      await connectDB();
      const { code } = await request.json();

      const validationSchema = z.object({
        code: addNewCouponSchema.shape.code,
      });
      const validationResult = validationSchema.safeParse({ code });
      if (!validationResult.success) {
        return NextResponse.json(
          {
            success: false,
            message: "Validation failed",
            errors: validationResult.error.format(),
          },
          { status: 400 },
        );

        /*
            Response :
              {
                "success": false,
                "message": "Validation failed",
                "errors": {
                    "_errors": [],
                    "code": {
                        "_errors": [
                            "Min. length 6",
                            "Code should match : Digits or letters of length 6 ~ 8"
                        ]
                    }
                }
              }
           
        */
      }

      const coupon = await couponsModel.findOne({ code });
      if (!coupon) throw new Error("Coupon was not found !!", { cause: 404 });

      //// Check if it is active;
      if (!coupon.isActive) {
        throw new Error("Coupon is not active", { cause: 400 });
      }

      //// Check if it is expired and if so we make it unactive;
      if (coupon.expirationDate < new Date()) {
        coupon.isActive = false;
        await coupon.save();
        throw new Error("Coupon is expired", { cause: 400 });
      }

      //// check if coupon reach its limit;
      if (coupon.usageCount >= coupon.usageLimit) {
        await stripe.promotionCodes.update(coupon.stipePromotionCodeId, {
          active: false,
        });
        coupon.isActive = false;
        await coupon.save();
        throw new Error("Coupon usage limit reached", { cause: 400 });
      }

      const discountData = {
        discountAmount: coupon.discount,
        discountType: coupon.discountType,
      };

      return NextResponse.json(
        { success: true, discountData, couponId: coupon._id },
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

import { validateSchema } from "@/app/_lib/validateSchema";
import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import productsModel from "@/app/_mongodb/models/productsModel";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const PUT = withMiddleWare({
  applyAuth: false,
  middleWares: [],
  handler: async (request: NextRequest, props: any) => {
    try {
      const { id } = await props.params;
      const { removedQuantity } = await request.json();
      const validationResult = validateSchema(
        z.object({
          removedQuantity: z
            .number()
            .positive("Quantity must be a positive number"),
        }),
        { removedQuantity },
      );
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
      const product = await productsModel.findOneAndUpdate(
        { productId: id },
        { $inc: { stock: -removedQuantity } },
        { new: true },
      );
      if (!product) {
        throw new Error(
          "Product not found or error while updating product !!",
          { cause: 404 },
        );
      }
      return NextResponse.json({ success: true, product }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: error.cause || 500 },
      );
    }
  },
});

import { ZodSchema } from "zod";

// export function validateSchema(
//   schema: ZodSchema,
//   data: any,
// ): { success: boolean; error?: any } {
//   const result = schema.safeParse(data);
//   if (!result.success) {
//     const errors = result.error.format();
//     return {
//       success: false,
//       error: errors,
//     };
//   } else {
//     return { success: true };
//   }
// }

export function validateSchema(
  schema: ZodSchema,
  data: any,
): { success: boolean; error?: any } {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.log("Validation error:", result.error);
    // Defensive check if error exists and has format method
    if (result.error && typeof result.error.format === "function") {
      return {
        success: false,
        error: result.error.format(),
      };
    } else {
      return {
        success: false,
        error: "Unknown validation error",
      };
    }
  } else {
    return { success: true };
  }
}

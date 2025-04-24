import { ZodSchema } from "zod";

export function validateSchema(
  schema: ZodSchema,
  data: any,
): { success: boolean; error?: any } {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.format();
    return {
      success: false,
      error: errors,
    };
  } else {
    return { success: true };
  }
}

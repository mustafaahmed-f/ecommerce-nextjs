import { NextResponse } from "next/server";

export function validation(schema: any, data: any) {
  const validationErrorArr: any[] = [];

  const validationResult = schema.validate(data, { abortEarly: false });

  if (validationResult.error) {
    validationResult.error.details.forEach((error: any) => {
      validationErrorArr.push(error.message);
    });

    return NextResponse.json({ error: validationErrorArr }, { status: 400 });
  }

  return null;
}

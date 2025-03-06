import modelsModel from "@/app/_mongodb/models/modelsModel";
import { NextResponse } from "next/server";

export async function GET() {
  const models = await modelsModel.find();

  if (!models.length) {
    return NextResponse.json(
      { success: false, error: "No models found" },
      { status: 404 }
    );
  } else {
    let finalModels = models.map((category) => category.title);
    return NextResponse.json(
      { success: true, models: finalModels },
      { status: 200 }
    );
  }
}

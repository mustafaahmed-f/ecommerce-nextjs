import { chattogemini } from "@/app/_lib/GeminiHelper";
import { ChatHistory, ChatSettings } from "@/app/_types/ChatBotTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Function logic will go here
  try {
    const { userMessage, history, settings } = (await request.json()) as {
      userMessage: string;
      history: ChatHistory;
      settings: ChatSettings;
    };
    const aiResponse = await chattogemini(userMessage, history, settings);
    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Error obtaining the AI model's response." },
      { status: 500 },
    );
  }
}

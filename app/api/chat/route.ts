import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Using the standard environment variable name for the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local" },
        { status: 500 }
      );
    }

    // Use the model from environment variable if available, otherwise fallback to gemini-1.5-pro
    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-pro";
    const model = genAI.getGenerativeModel({ model: modelName });

    // Format history for Gemini
    let history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Gemini requires the first message in history to be from the 'user'
    const firstUserIndex = history.findIndex((m: any) => m.role === "user");
    if (firstUserIndex !== -1) {
      history = history.slice(firstUserIndex);
    } else {
      history = [];
    }

    const chat = model.startChat({
      history: history,
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Failed to generate response";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

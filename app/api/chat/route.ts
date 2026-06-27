import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "")

const SYSTEM_INSTRUCTION = `
You are the AI chatbot assistant(your name is TODO) for Creator Economy, a platform that helps creators build, sell, and grow their online business — including courses, memberships, communities, and digital products.

Key facts about the platform:
- Features:
  - Create and sell online courses
  - Create and manage paid memberships and communities
  - Sell and buy digital products (PDFs, docs, and other downloadable files)
  - Build custom pages using templates
  - Analytics dashboard for creators to track sales and performance
- Roles: Creator and Attendee.
  - Creators can create courses, memberships, communities, and digital products, build pages using templates, and view sales/analytics data.
  - Attendees can browse, buy, and access courses, memberships, communities, and digital products created by creators.
- How it works: A user signs up, selects a role (Creator or Attendee). Creators set up their offerings (courses, memberships, communities, or digital products) and customize their page using templates. Attendees discover and purchase these offerings.
- Support: If a user needs account-specific help or something not covered here, suggest they contact support.

Guidelines:
- Be concise and friendly.
- If you don't know something specific about the user's account (their sales numbers, their specific courses, their orders, etc.), say so and suggest contacting support — do not make up account-specific details.
- Don't make up pricing, features, or policies that aren't listed above.
- If the user is a Creator asking about their own sales/analytics, let them know you don't have direct access to their live data unless it's explicitly provided to you in this conversation.
`

// outside POST handler
function getSystemInstruction(pageState: string) {
  return `${SYSTEM_INSTRUCTION}
    Current page input fields:
    ${JSON.stringify(pageState, null, 2)}
    
    When the user asks you to fill out the form, respond with a JSON object in this exact format (no markdown, no extra text):
    {
      "reply": "A short confirmation message to show the user",
      "formUpdates": {
      "fieldName1": "value1",
      "fieldName2": "value2"
      }
    }
    If the user is just chatting and not asking to fill anything, set "formUpdates" to null.
    `
}

export async function POST(req: Request) {
  try {
    const { messages, pageState } = await req.json()

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local" },
        { status: 500 }
      )
    }

    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash"
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: getSystemInstruction(pageState),
    })

    let history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }))

    const firstUserIndex = history.findIndex((m: any) => m.role === "user")
    history = firstUserIndex !== -1 ? history.slice(firstUserIndex) : []

    const chat = model.startChat({ history })

    const userMessage = messages[messages.length - 1].content
    const result = await chat.sendMessage(userMessage)
    const rawText = result.response.text()

    let parsed
    try {
      const cleaned = rawText.replace(/```json|```/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch (e) {
      // model didn't return valid JSON (e.g. plain chat reply) — fall back gracefully
      parsed = { reply: rawText, formUpdates: null }
    }

    return NextResponse.json({ text: parsed.reply, formUpdates: parsed.formUpdates })
  } catch (error) {
    console.error("Chat error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to generate response"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
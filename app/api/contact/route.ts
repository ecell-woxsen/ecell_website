import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, type, message } = body;

    let aiSummary = undefined;
    let aiIntent = undefined;

    const groqApiKey = process.env.GROQ_API_KEY;

    if (groqApiKey) {
      try {
        const groq = new Groq({ apiKey: groqApiKey });

        const prompt = `
You are an AI assistant analyzing contact form submissions for a university entrepreneurship cell (E-Cell). 
Analyze the following message.
Name: ${name}
Type: ${type}
Message: ${message}

Provide a JSON response with two keys:
1. "summary": A brief 1-2 sentence summary of the message.
2. "intent": A short 1-3 word classification of the user's intent (e.g., "Sponsorship Inquiry", "Join Team", "Startup Idea", "General Question").

Output ONLY valid JSON.
`;

        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "llama3-8b-8192", // Using a fast/default Groq model
          temperature: 0.1,
          response_format: { type: "json_object" },
        });

        const responseContent = chatCompletion.choices[0]?.message?.content;
        if (responseContent) {
          const parsed = JSON.parse(responseContent);
          aiSummary = parsed.summary;
          aiIntent = parsed.intent;
        }
      } catch (error) {
        console.error("Failed to process message with Groq AI:", error);
        // Continue saving even if AI fails
      }
    } else {
      console.warn("GROQ_API_KEY not found. Skipping AI inference.");
    }

    const id = await convex.mutation(api.contact.saveContactSubmission, {
      name,
      email,
      type,
      message,
      aiSummary,
      aiIntent,
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

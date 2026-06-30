import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Resend } from "resend";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

    // Send email using Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: "E-Cell Woxsen <onboarding@resend.dev>",
          to: "shaikimaduddin10@gmail.com",
          subject: `New Contact Submission: ${aiIntent || type} from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr />
            <p><strong>AI Summary:</strong> ${aiSummary || "N/A"}</p>
            <p><strong>AI Intent:</strong> ${aiIntent || "N/A"}</p>
          `,
          replyTo: email,
        });
      } catch (error) {
        console.error("Failed to send email via Resend:", error);
      }
    } else {
      console.warn("RESEND_API_KEY not found. Skipping email notification.");
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

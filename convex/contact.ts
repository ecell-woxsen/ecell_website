import { action, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import Groq from "groq-sdk";

export const saveContactSubmission = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    type: v.string(),
    message: v.string(),
    aiSummary: v.optional(v.string()),
    aiIntent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactSubmissions", {
      ...args,
      createdAt: Date.now(),
    });
    return id;
  },
});

export const processContactForm = action({
  args: {
    name: v.string(),
    email: v.string(),
    type: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    let aiSummary = undefined;
    let aiIntent = undefined;

    const groqApiKey = process.env.GROQ_API_KEY;

    if (groqApiKey) {
      try {
        const groq = new Groq({ apiKey: groqApiKey });

        const prompt = `
You are an AI assistant analyzing contact form submissions for a university entrepreneurship cell (E-Cell). 
Analyze the following message.
Name: ${args.name}
Type: ${args.type}
Message: ${args.message}

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

    const id = await ctx.runMutation(internal.contact.saveContactSubmission, {
      name: args.name,
      email: args.email,
      type: args.type,
      message: args.message,
      aiSummary,
      aiIntent,
    });

    return { success: true, id };
  },
});

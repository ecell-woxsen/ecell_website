import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveContactSubmission = mutation({
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

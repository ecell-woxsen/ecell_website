import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const submitIdea = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    ideaTitle: v.string(),
    domain: v.string(),
    stage: v.string(),
    description: v.string(),
    teamSize: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("ideaSubmissions", {
      ...args,
      submittedAt: Date.now(),
    });
    return id;
  },
});

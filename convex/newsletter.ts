import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const subscribeNewsletter = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Check for duplicate
    const existing = await ctx.db
      .query("newsletterSubscribers")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existing) {
      return { success: true, alreadySubscribed: true };
    }

    await ctx.db.insert("newsletterSubscribers", {
      email: args.email,
      subscribedAt: Date.now(),
    });

    return { success: true, alreadySubscribed: false };
  },
});

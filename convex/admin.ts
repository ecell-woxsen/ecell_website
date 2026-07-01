import { query } from "./_generated/server";
import { authComponent } from "./auth";

export const getCurrentAdmin = query({
  args: {},
  handler: async (ctx) => {
    try {
      const user = await authComponent.safeGetAuthUser(ctx);
      if (!user) {
        return null;
      }
      
      const admin = await ctx.db
        .query("adminUsers")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .unique();
        
      if (!admin || !admin.isActive) {
        return null;
      }
      
      return admin;
    } catch (e) {
      return null;
    }
  },
});

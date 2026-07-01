import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { createAuth } from "./auth";

export const createAdmin = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    name: v.string(),
    role: v.union(v.literal("president"), v.literal("department_head")),
  },
  handler: async (ctx, args) => {
    const auth = createAuth(ctx);
    const email = `${args.username}@ecellwoxsen.internal`;
    
    // Create the user record in Better Auth tables
    const userResult = await auth.api.signUpEmail({
      body: {
        email,
        password: args.password,
        name: args.name,
      },
    });

    if (!userResult || !userResult.user) {
      throw new Error("Failed to create Better Auth user");
    }

    const userId = userResult.user.id;

    // Save the administrative metadata in the adminUsers table
    const adminId = await ctx.db.insert("adminUsers", {
      userId,
      username: args.username,
      name: args.name,
      role: args.role,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { success: true, userId, adminId };
  },
});

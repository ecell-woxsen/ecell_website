import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await verifyAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});


export async function verifyAdmin(ctx: any) {
  const user = await authComponent.safeGetAuthUser(ctx);
  if (!user) {
    throw new ConvexError("Unauthenticated");
  }
  const admin = await ctx.db
    .query("adminUsers")
    .withIndex("by_userId", (q: any) => q.eq("userId", user._id))
    .unique();
  if (!admin || !admin.isActive) {
    throw new ConvexError("Unauthorized: Admin not found or inactive");
  }
  return admin;
}

export async function verifyAdminQuery(ctx: any) {
  try {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) return null;
    const admin = await ctx.db
      .query("adminUsers")
      .withIndex("by_userId", (q: any) => q.eq("userId", user._id))
      .unique();
    if (!admin || !admin.isActive) return null;
    return admin;
  } catch (e) {
    return null;
  }
}


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

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const admin = await verifyAdminQuery(ctx);
    if (!admin) {
      return null;
    }

    const [events, team, registrations, ideas, contacts, newsletters] = await Promise.all([
      ctx.db.query("events").collect(),
      ctx.db.query("teamMembers").collect(),
      ctx.db.query("eventRegistrations").collect(),
      ctx.db.query("ideaSubmissions").collect(),
      ctx.db.query("contactSubmissions").collect(),
      ctx.db.query("newsletterSubscribers").collect(),
    ]);

    // Sort recent items by timestamp descending
    const recentRegistrations = [...registrations]
      .sort((a, b) => b.registeredAt - a.registeredAt)
      .slice(0, 5);

    const recentIdeas = [...ideas]
      .sort((a, b) => b.submittedAt - a.submittedAt)
      .slice(0, 5);

    const recentContacts = [...contacts]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    return {
      counts: {
        events: events.length,
        team: team.length,
        registrations: registrations.length,
        ideas: ideas.length,
        contacts: contacts.length,
        newsletters: newsletters.length,
      },
      recent: {
        registrations: recentRegistrations,
        ideas: recentIdeas,
        contacts: recentContacts,
      },
    };
  },
});

export const getAllRegistrations = query({
  args: {},
  handler: async (ctx) => {
    const admin = await verifyAdminQuery(ctx);
    if (!admin) {
      return [];
    }
    const regs = await ctx.db.query("eventRegistrations").collect();
    return regs.sort((a, b) => b.registeredAt - a.registeredAt);
  },
});

export const getRegistrationsForEvent = query({
  args: { eventId: v.string() },
  handler: async (ctx, args) => {
    const admin = await verifyAdminQuery(ctx);
    if (!admin) {
      return [];
    }
    const regs = await ctx.db
      .query("eventRegistrations")
      .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
      .collect();
    return regs.sort((a, b) => b.registeredAt - a.registeredAt);
  },
});

export const listAdminUsers = query({
  args: {},
  handler: async (ctx) => {
    const requester = await verifyAdminQuery(ctx);
    if (!requester || requester.role !== "president") {
      return [];
    }
    const admins = await ctx.db.query("adminUsers").collect();
    return admins.sort((a, b) => b.createdAt - a.createdAt);
  },
});


export const createAdminUser = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    name: v.string(),
    role: v.union(v.literal("president"), v.literal("department_head")),
  },
  handler: async (ctx, args) => {
    const requester = await verifyAdmin(ctx);
    if (requester.role !== "president") {
      throw new ConvexError("Unauthorized: Only the President can create admin accounts.");
    }

    const { createAuth } = await import("./auth");
    const auth = createAuth(ctx);
    const email = `${args.username.trim().toLowerCase()}@ecellwoxsen.internal`;

    // 1. Create Better Auth credentials record
    const userResult = await auth.api.signUpEmail({
      body: {
        email,
        password: args.password,
        name: args.name.trim(),
      },
    });

    if (!userResult || !userResult.user) {
      throw new ConvexError("Failed to register admin credentials in auth store.");
    }

    const userId = userResult.user.id;

    // 2. Insert admin details in adminUsers table
    const adminId = await ctx.db.insert("adminUsers", {
      userId,
      username: args.username.trim().toLowerCase(),
      name: args.name.trim(),
      role: args.role,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { success: true, userId, adminId };
  },
});

export const updateAdminUser = mutation({
  args: {
    id: v.id("adminUsers"),
    role: v.union(v.literal("president"), v.literal("department_head")),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const requester = await verifyAdmin(ctx);
    if (requester.role !== "president") {
      throw new ConvexError("Unauthorized: Only the President can modify admin accounts.");
    }

    // Prevent modifying oneself's role or status to avoid lockouts
    const targetAdmin = (await ctx.db.get(args.id)) as any;
    if (targetAdmin && targetAdmin.userId === requester.userId) {
      throw new ConvexError("Security Exception: You cannot deactivate or change your own role.");
    }

    await ctx.db.patch(args.id, {
      role: args.role,
      isActive: args.isActive,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});



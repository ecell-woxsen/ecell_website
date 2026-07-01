import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { verifyAdmin } from "./admin";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const members = await ctx.db
      .query("teamMembers")
      .withIndex("by_order")
      .collect();
    return await Promise.all(
      members.map(async (m) => ({
        ...m,
        image: m.image
          ? (m.image.startsWith("http")
              ? m.image
              : await ctx.storage.getUrl(m.image))
          : undefined,
      }))
    );
  },
});

export const listActive = query({
  args: {},
  handler: async (ctx) => {
    const members = await ctx.db
      .query("teamMembers")
      .withIndex("by_order")
      .collect();
    const active = members.filter((m) => m.isActive === true);
    return await Promise.all(
      active.map(async (m) => ({
        ...m,
        image: m.image
          ? (m.image.startsWith("http")
              ? m.image
              : await ctx.storage.getUrl(m.image))
          : undefined,
      }))
    );
  },
});


export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    department: v.string(),
    initials: v.string(),
    isLeadership: v.boolean(),
    isActive: v.boolean(),
    image: v.optional(v.string()),
    bio: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    instagram: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await verifyAdmin(ctx);

    const lastMember = await ctx.db
      .query("teamMembers")
      .withIndex("by_order")
      .order("desc")
      .first();
    const nextOrder = lastMember ? lastMember.order + 1 : 0;

    const memberId = await ctx.db.insert("teamMembers", {
      ...args,
      order: nextOrder,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return memberId;
  },
});

export const update = mutation({
  args: {
    id: v.id("teamMembers"),
    name: v.string(),
    role: v.string(),
    department: v.string(),
    initials: v.string(),
    isLeadership: v.boolean(),
    isActive: v.boolean(),
    image: v.optional(v.string()),
    bio: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    instagram: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await verifyAdmin(ctx);
    const { id, ...data } = args;
    await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("teamMembers") },
  handler: async (ctx, args) => {
    await verifyAdmin(ctx);
    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const reorder = mutation({
  args: { ids: v.array(v.id("teamMembers")) },
  handler: async (ctx, args) => {
    await verifyAdmin(ctx);
    for (let i = 0; i < args.ids.length; i++) {
      const id = args.ids[i];
      await ctx.db.patch(id, {
        order: i,
        updatedAt: Date.now(),
      });
    }
    return { success: true };
  },
});


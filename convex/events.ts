import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { verifyAdmin } from "./admin";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db
      .query("events")
      .withIndex("by_order")
      .collect();
    return await Promise.all(
      events.map(async (e) => ({
        ...e,
        imageUrl: e.imageUrl
          ? (e.imageUrl.startsWith("http")
              ? e.imageUrl
              : await ctx.storage.getUrl(e.imageUrl))
          : undefined,
      }))
    );
  },
});

export const listFeatured = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db
      .query("events")
      .withIndex("by_order")
      .collect();
    const featured = events.filter(e => e.featured === true);
    return await Promise.all(
      featured.map(async (e) => ({
        ...e,
        imageUrl: e.imageUrl
          ? (e.imageUrl.startsWith("http")
              ? e.imageUrl
              : await ctx.storage.getUrl(e.imageUrl))
          : undefined,
      }))
    );
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const e = await ctx.db
      .query("events")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!e) return null;
    return {
      ...e,
      imageUrl: e.imageUrl
        ? (e.imageUrl.startsWith("http")
            ? e.imageUrl
            : await ctx.storage.getUrl(e.imageUrl))
        : undefined,
    };
  },
});


export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    date: v.string(),
    meta: v.string(),
    tag: v.string(),
    tagType: v.union(v.literal("upcoming"), v.literal("workshop"), v.literal("competition"), v.literal("talk")),
    featured: v.optional(v.boolean()),
    registrationOpen: v.boolean(),
    imageUrl: v.optional(v.string()),
    location: v.optional(v.string()),
    time: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await verifyAdmin(ctx);

    // Get max order to append new event at the end
    const lastEvent = await ctx.db
      .query("events")
      .withIndex("by_order")
      .order("desc")
      .first();
    const nextOrder = lastEvent ? lastEvent.order + 1 : 0;

    const eventId = await ctx.db.insert("events", {
      ...args,
      order: nextOrder,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return eventId;
  },
});

export const update = mutation({
  args: {
    id: v.id("events"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    date: v.string(),
    meta: v.string(),
    tag: v.string(),
    tagType: v.union(v.literal("upcoming"), v.literal("workshop"), v.literal("competition"), v.literal("talk")),
    featured: v.optional(v.boolean()),
    registrationOpen: v.boolean(),
    imageUrl: v.optional(v.string()),
    location: v.optional(v.string()),
    time: v.optional(v.string()),
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
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await verifyAdmin(ctx);
    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const reorder = mutation({
  args: { ids: v.array(v.id("events")) },
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


import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ── Queries ──

export const getProfileByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    if (!email) return null;

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    return profile;
  },
});

export const checkRegistration = query({
  args: {
    email: v.string(),
    eventId: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    if (!email || !args.eventId) return null;

    const registration = await ctx.db
      .query("eventRegistrations")
      .withIndex("by_email_eventId", (q) =>
        q.eq("email", email).eq("eventId", args.eventId)
      )
      .first();

    return registration;
  },
});

// ── Mutations ──

export const registerForEvent = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    phone: v.string(),
    school: v.optional(v.string()),
    course: v.optional(v.string()),
    year: v.optional(v.string()),
    eventId: v.string(),
    eventTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    const name = args.name.trim();
    const phone = args.phone.trim();
    const school = args.school?.trim() || "";
    const course = args.course?.trim() || undefined;
    const year = args.year?.trim() || undefined;

    // Validate required fields
    if (!email || !name || !phone || !school) {
      throw new Error("All required fields must be filled.");
    }
    if (!email.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }

    const now = Date.now();

    // Check for duplicate registration
    const existingRegistration = await ctx.db
      .query("eventRegistrations")
      .withIndex("by_email_eventId", (q) =>
        q.eq("email", email).eq("eventId", args.eventId)
      )
      .first();

    if (existingRegistration) {
      throw new Error("You are already registered for this event.");
    }

    // Upsert profile
    const existingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existingProfile) {
      // Update profile with latest info
      await ctx.db.patch(existingProfile._id, {
        name,
        phone,
        school,
        course,
        year,
        updatedAt: now,
      });
    } else {
      // Create new profile
      await ctx.db.insert("profiles", {
        email,
        name,
        phone,
        school,
        course,
        year,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Create registration
    const registrationId = await ctx.db.insert("eventRegistrations", {
      email,
      eventId: args.eventId,
      eventTitle: args.eventTitle,
      name,
      phone,
      school,
      course,
      year,
      registeredAt: now,
    });

    return {
      registrationId,
      profile: { email, name, phone, school, course, year },
    };
  },
});

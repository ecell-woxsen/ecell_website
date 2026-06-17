import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ideaSubmissions: defineTable({
    // Submitter info
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    // Idea details
    ideaTitle: v.string(),
    domain: v.string(),
    stage: v.string(),
    description: v.string(),
    // Optional fields
    teamSize: v.optional(v.string()),
    website: v.optional(v.string()),
    // Meta
    submittedAt: v.number(),
  }),

  newsletterSubscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
  }),

  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    type: v.string(),
    message: v.string(),
    aiSummary: v.optional(v.string()),
    aiIntent: v.optional(v.string()),
    createdAt: v.number(),
  }),

  // ── Event Registration System ──

  profiles: defineTable({
    email: v.string(),
    name: v.string(),
    phone: v.string(),
    // legacy field — kept for backward compat with existing documents
    college: v.optional(v.string()),
    school: v.optional(v.string()),
    course: v.optional(v.string()),
    year: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  eventRegistrations: defineTable({
    email: v.string(),
    eventId: v.string(),
    eventTitle: v.string(),
    name: v.string(),
    phone: v.string(),
    // legacy field — kept for backward compat with existing documents
    college: v.optional(v.string()),
    school: v.optional(v.string()),
    course: v.optional(v.string()),
    year: v.optional(v.string()),
    registeredAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_eventId", ["eventId"])
    .index("by_email_eventId", ["email", "eventId"]),
});

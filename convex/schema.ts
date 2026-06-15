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
});

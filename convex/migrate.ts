import { mutation } from "./_generated/server";
import { events } from "../data/events";
import { teamMembers } from "../data/team";

export const runMigration = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Migrate Events
    let eventCount = 0;
    const existingEvents = await ctx.db.query("events").collect();
    if (existingEvents.length === 0) {
      for (let i = 0; i < events.length; i++) {
        const ev = events[i];
        await ctx.db.insert("events", {
          title: ev.title,
          slug: ev.id, // slug maps to id
          description: ev.description,
          date: ev.date,
          meta: ev.meta,
          tag: ev.tag,
          tagType: ev.tagType as any,
          featured: ev.featured,
          registrationOpen: true, // default to true
          order: i, // preserve current display order
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        eventCount++;
      }
    }

    // 2. Migrate Team Members
    let teamCount = 0;
    const existingTeam = await ctx.db.query("teamMembers").collect();
    if (existingTeam.length === 0) {
      for (let i = 0; i < teamMembers.length; i++) {
        const tm = teamMembers[i];
        await ctx.db.insert("teamMembers", {
          name: tm.name,
          role: tm.role,
          department: tm.department,
          initials: tm.initials,
          image: tm.image,
          bio: tm.bio,
          linkedin: tm.linkedin,
          order: i,
          isActive: true, // default to true
          isLeadership: tm.isLeadership ?? false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        teamCount++;
      }
    }

    return { success: true, eventCount, teamCount };
  },
});

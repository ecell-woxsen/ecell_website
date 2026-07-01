"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAdminSession } from "@/components/admin/AdminSessionProvider";
import TeamCard from "@/components/ui/TeamCard";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SortableItem from "@/components/admin/SortableItem";
import TeamMemberFormDrawer from "@/components/admin/TeamMemberFormDrawer";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

interface TeamGridClientProps {
  initialMembers: any[];
}

export default function TeamGridClient({ initialMembers }: TeamGridClientProps) {
  const [localMembers, setLocalMembers] = useState<any[]>(initialMembers);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [defaultIsLeadership, setDefaultIsLeadership] = useState(false);
  
  const { editMode } = useAdminSession();
  const dbMembers = useQuery(api.team.listActive);
  const reorderMembers = useMutation(api.team.reorder);

  useEffect(() => {
    if (dbMembers) {
      setLocalMembers(dbMembers.map((m) => ({
        id: m._id,
        name: m.name,
        role: m.role,
        department: m.department,
        initials: m.initials,
        image: m.image,
        bio: m.bio,
        linkedin: m.linkedin,
        instagram: m.instagram,
        isLeadership: m.isLeadership,
        isActive: m.isActive,
      })));
    }
  }, [dbMembers]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndLeadership = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const leadership = localMembers.filter((m) => m.isLeadership);
    const core = localMembers.filter((m) => !m.isLeadership);

    const oldIndex = leadership.findIndex((item) => item.id === active.id);
    const newIndex = leadership.findIndex((item) => item.id === over.id);

    const reorderedLeadership = arrayMove(leadership, oldIndex, newIndex);
    const updated = [...reorderedLeadership, ...core];

    setLocalMembers(updated);

    try {
      await reorderMembers({ ids: updated.map((m) => m.id) });
    } catch (err) {
      console.error("Failed to reorder leadership members", err);
      if (dbMembers) {
        setLocalMembers(dbMembers);
      }
    }
  };

  const handleDragEndCore = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const leadership = localMembers.filter((m) => m.isLeadership);
    const core = localMembers.filter((m) => !m.isLeadership);

    const oldIndex = core.findIndex((item) => item.id === active.id);
    const newIndex = core.findIndex((item) => item.id === over.id);

    const reorderedCore = arrayMove(core, oldIndex, newIndex);
    const updated = [...leadership, ...reorderedCore];

    setLocalMembers(updated);

    try {
      await reorderMembers({ ids: updated.map((m) => m.id) });
    } catch (err) {
      console.error("Failed to reorder core members", err);
      if (dbMembers) {
        setLocalMembers(dbMembers);
      }
    }
  };

  const openCreateDrawer = (isLeadership: boolean) => {
    setDefaultIsLeadership(isLeadership);
    setIsDrawerOpen(true);
  };

  const leadershipMembers = localMembers.filter((m) => m.isLeadership);
  const coreTeamMembers = localMembers.filter((m) => !m.isLeadership);

  return (
    <>
      {/* ── LEADERSHIP ── */}
      <section className="section-base bg-[#020817]">
        <div className="section-container">
          <RevealOnScroll>
            <SectionHeader label="At the Helm" title="Leadership" />
            <p className="text-[15px] text-white/40 font-light max-w-[500px] leading-[1.85] mb-16 -mt-2">
              The three people who set the vision, hold the culture, and make the hard calls every day.
            </p>
          </RevealOnScroll>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEndLeadership}
          >
            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
              <SortableContext
                items={leadershipMembers.map((m) => m.id)}
                strategy={rectSortingStrategy}
              >
                {leadershipMembers.map((member, i) => (
                  <SortableItem key={member.id} id={member.id} disabled={!editMode}>
                    <RevealOnScroll delay={Math.min(i + 1, 3) as 1 | 2 | 3} className="flex flex-col h-full">
                      <TeamCard member={member} variant="leadership" />
                    </RevealOnScroll>
                  </SortableItem>
                ))}
              </SortableContext>

              {/* Add Leadership Card */}
              {editMode && (
                <button
                  onClick={() => openCreateDrawer(true)}
                  className="border-2 border-dashed border-white/10 hover:border-[var(--green-lt)]/35 bg-white/[0.01] hover:bg-white/[0.02] rounded-2xl flex flex-col items-center justify-center gap-3 p-8 min-h-[300px] transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full border border-white/15 group-hover:border-[var(--green-lt)]/40 flex items-center justify-center text-white/50 group-hover:text-white text-xl font-light transition-all">
                    +
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 group-hover:text-white transition-colors">
                    Add Leader
                  </span>
                </button>
              )}
            </div>
          </DndContext>
        </div>
      </section>

      {/* ── CORE TEAM ── */}
      <section className="section-base bg-[#020817] pt-0">
        <div className="section-container">
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(30,107,46,0.25)] to-transparent mb-20" />

          <RevealOnScroll>
            <SectionHeader label="Core Team" title="The Engine Room" />
            <p className="text-[15px] text-white/40 font-light max-w-[480px] leading-[1.85] mb-14 -mt-2">
              The specialists who make every event, campaign, and partnership happen.
            </p>
          </RevealOnScroll>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEndCore}
          >
            <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
              <SortableContext
                items={coreTeamMembers.map((m) => m.id)}
                strategy={rectSortingStrategy}
              >
                {coreTeamMembers.map((member, i) => (
                  <SortableItem key={member.id} id={member.id} disabled={!editMode}>
                    <RevealOnScroll delay={Math.min((i % 4) + 1, 4) as 1 | 2 | 3 | 4} className="flex flex-col h-full">
                      <TeamCard member={member} variant="core" />
                    </RevealOnScroll>
                  </SortableItem>
                ))}
              </SortableContext>

              {/* Add Core Member Card */}
              {editMode && (
                <button
                  onClick={() => openCreateDrawer(false)}
                  className="border-2 border-dashed border-white/10 hover:border-[var(--green-lt)]/35 bg-white/[0.01] hover:bg-white/[0.02] rounded-xl flex flex-col items-center justify-center gap-3 p-6 min-h-[220px] transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full border border-white/15 group-hover:border-[var(--green-lt)]/40 flex items-center justify-center text-white/50 group-hover:text-white text-lg font-light transition-all">
                    +
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/40 group-hover:text-white transition-colors">
                    Add Core Member
                  </span>
                </button>
              )}
            </div>
          </DndContext>
        </div>
      </section>

      {/* Slide drawer for member creation */}
      <TeamMemberFormDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        memberToEdit={
          isDrawerOpen
            ? { isLeadership: defaultIsLeadership, isActive: true }
            : undefined
        }
      />
    </>
  );
}

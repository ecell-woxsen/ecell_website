"use client";

import { useAdminSession } from "./AdminSessionProvider";

export default function EditModeToggle() {
  const { isAdmin, editMode, setEditMode } = useAdminSession();

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[999] animate-fade-up">
      <button
        onClick={() => setEditMode(!editMode)}
        className={`flex items-center gap-2.5 px-4.5 py-3 rounded-full font-mono text-[10px] tracking-[0.16em] uppercase border transition-all duration-500 cursor-pointer shadow-lg hover:-translate-y-0.5 ${
          editMode
            ? "bg-[var(--green)] border-[var(--green-lt)]/40 text-white shadow-[0_8px_24px_rgba(76,175,98,0.25)] hover:shadow-[0_12px_28px_rgba(76,175,98,0.35)]"
            : "bg-[var(--navy-deep)]/90 backdrop-blur-md border-white/[0.08] text-white/60 hover:text-white hover:border-[var(--green-lt)]/35"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            editMode
              ? "bg-[var(--green-lt)] shadow-[0_0_8px_var(--green-lt)]"
              : "bg-white/20"
          }`}
        />
        <span>Edit Mode: {editMode ? "On" : "Off"}</span>
      </button>
    </div>
  );
}

"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function SortableItem({ id, children, disabled }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.45 : 1,
    cursor: disabled ? "default" : "grab",
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className={`h-full transition-shadow duration-300 ${
        isDragging ? "shadow-[0_15px_40px_rgba(30,107,46,0.18)] border border-[var(--green-lt)]/35 rounded-2xl scale-[1.01]" : ""
      }`}
    >
      {children}
    </div>
  );
}

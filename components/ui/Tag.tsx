import React from "react";

export interface TagProps {
  children: React.ReactNode;
  variant?: "date" | "category" | "featured";
  className?: string;
}

export default function Tag({ children, variant = "category", className = "" }: TagProps) {
  let baseStyles = "tag font-mono uppercase font-medium inline-flex items-center justify-center";
  
  if (variant === "date") {
    baseStyles += " bg-white/5 border border-white/10 rounded-lg text-[10px] tracking-wider text-white/80";
  } else if (variant === "category") {
    baseStyles += " text-[9px] tracking-[0.16em] border rounded-md";
  } else if (variant === "featured") {
    baseStyles += " text-[8px] tracking-[0.2em] bg-[var(--green)]/20 text-[var(--green-lt)] border border-[var(--green)]/30 rounded";
  }

  return (
    <span className={`${baseStyles} ${className}`.trim()}>
      {children}
    </span>
  );
}

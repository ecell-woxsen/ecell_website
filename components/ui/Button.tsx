import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "form" | "nav-cta";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-[var(--green)] text-[var(--white)] border border-[var(--green)] hover:bg-[var(--green-mid)] hover:-translate-y-0.5",
  outline:
    "text-[var(--white)] border border-white/20 hover:border-[var(--green-lt)] hover:text-[var(--green-lt)] hover:-translate-y-0.5",
  form:
    "w-full bg-[var(--navy)] text-white border-none hover:bg-[var(--navy-mid)]",
  "nav-cta":
    "bg-[var(--green)] text-[var(--white)] border border-[var(--green)] hover:bg-transparent hover:text-[var(--green-lt)]",
};

const baseStyle =
  "inline-flex items-center gap-2.5 px-8 py-3.5 font-mono text-[11px] tracking-[0.1em] uppercase transition-all duration-200 no-underline";

export default function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  const styles = `${baseStyle} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick}>
      {children}
    </button>
  );
}

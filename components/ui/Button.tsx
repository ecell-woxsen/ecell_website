import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost" | "form" | "nav-cta";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-[var(--green)] text-[var(--white)] border border-[var(--green)] hover:bg-[var(--green-mid)] hover:-translate-y-0.5 shadow-sm hover:shadow btn-sweep",
  outline:
    "text-[var(--white)] border border-white/30 bg-transparent hover:border-[var(--green-lt)] hover:text-[var(--green-lt)] hover:-translate-y-0.5",
  ghost:
    "text-white/40 hover:text-white border border-white/[0.08] bg-transparent hover:border-white/20 min-w-0",
  form:
    "w-full bg-[var(--navy)] text-white border-none hover:bg-[var(--navy-mid)] active:scale-[0.99]",
  "nav-cta":
    "bg-[var(--green)] text-[var(--white)] border border-[var(--green)] hover:bg-transparent hover:text-[var(--green-lt)] hover:border-[var(--green-lt)]",
};

const baseStyle =
  "btn-base inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] min-w-[200px] font-mono text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-200 no-underline rounded-lg whitespace-nowrap disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none";

export default function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  className = "",
  onClick,
  disabled,
  id,
}: ButtonProps) {
  const styles = `${baseStyle} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles} id={id}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick} disabled={disabled} id={id}>
      {children}
    </button>
  );
}
interface SectionHeaderProps {
  label: string;
  title: string;
  lightMode?: boolean;
}

export default function SectionHeader({
  label,
  title,
  lightMode = false,
}: SectionHeaderProps) {
  const labelColor = lightMode ? "text-[var(--navy)]" : "text-[var(--green-lt)]";
  const lineColor = lightMode
    ? "before:bg-[var(--navy)]"
    : "before:bg-[var(--green-lt)]";
  const titleColor = lightMode ? "text-[var(--ink)]" : "text-[var(--white)]";

  return (
    <div>
      <p
        className={`font-mono text-[10px] tracking-[0.3em] uppercase ${labelColor} mb-4.5 flex items-center gap-3.5 before:content-[''] before:w-7 before:h-px ${lineColor} before:transition-all before:duration-500`}
      >
        {label}
      </p>
      <h2
        className={`font-['Bebas_Neue',sans-serif] text-[clamp(44px,5.5vw,82px)] leading-none tracking-[0.01em] mb-6 ${titleColor}`}
      >
        {title}
      </h2>
    </div>
  );
}

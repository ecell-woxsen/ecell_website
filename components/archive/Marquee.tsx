import { marqueeItems } from "@/data/events";

export default function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-wrap bg-gradient-to-r from-[var(--navy-deep)] via-[var(--navy)] to-[var(--navy-deep)] border-t border-b border-[var(--border-g)] py-3.5 overflow-hidden whitespace-nowrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-['Bebas_Neue',sans-serif] text-[15px] tracking-[0.22em] text-[var(--white)] flex items-center gap-14 opacity-85 after:content-['✦'] after:text-[var(--green-lt)] after:text-[10px]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

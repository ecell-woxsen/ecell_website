import { marqueeItems } from "@/data/events";

export default function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative bg-gradient-to-r from-[var(--navy-deep)] via-[var(--navy)] to-[var(--navy-deep)] border-t border-b border-[var(--border-g)] overflow-hidden py-0">
      {/* Row 1 — forward */}
      <div className="marquee-wrap py-3.5 overflow-hidden whitespace-nowrap border-b border-[rgba(30,107,46,0.1)]">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span
              key={`fwd-${item}-${i}`}
              className="font-['Bebas_Neue',sans-serif] text-[15px] tracking-[0.22em] text-[var(--white)] flex items-center gap-14 opacity-75 after:content-['✦'] after:text-[var(--green-lt)] after:text-[10px]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — reverse direction, slower, dimmer */}
      <div className="marquee-wrap py-3 overflow-hidden whitespace-nowrap">
        <div
          className="marquee-track"
          style={{ animationDirection: "reverse", animationDuration: "30s" }}
        >
          {doubled.map((item, i) => (
            <span
              key={`rev-${item}-${i}`}
              className="font-['Bebas_Neue',sans-serif] text-[12px] tracking-[0.28em] text-white/30 flex items-center gap-14 after:content-['·'] after:text-[var(--green-lt)]/40 after:text-[10px]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

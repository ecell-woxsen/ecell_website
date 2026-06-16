import Tag from "@/components/ui/Tag";
import type { EventItem } from "@/data/events";

const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  upcoming: {
    bg: "bg-[rgba(76,175,98,0.06)]",
    text: "text-[var(--green-lt)]",
    border: "border-[rgba(76,175,98,0.22)]",
  },
  workshop: {
    bg: "bg-[rgba(96,200,240,0.06)]",
    text: "text-[#60C8F0]",
    border: "border-[rgba(96,200,240,0.22)]",
  },
  competition: {
    bg: "bg-[rgba(255,179,71,0.06)]",
    text: "text-[#FFB347]",
    border: "border-[rgba(255,179,71,0.22)]",
  },
  talk: {
    bg: "bg-[rgba(196,170,255,0.06)]",
    text: "text-[#C4AAFF]",
    border: "border-[rgba(196,170,255,0.22)]",
  },
};

export default function EventCard({ ev }: { ev: EventItem }) {
  const colors = tagColors[ev.tagType] || tagColors.upcoming;

  return (
    <div className={`flex flex-col ${ev.featured ? "col-span-2 max-lg:col-span-1" : ""}`}>
      <div
        className={`card-pad group relative flex flex-col justify-between bg-white/[0.02] border border-white/[0.06] hover:border-[var(--green-lt)]/35 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_45px_rgba(30,107,46,0.08)] flex-1 overflow-hidden ${
          ev.featured
            ? "bg-gradient-to-br from-[rgba(26,47,94,0.22)] to-white/[0.02] border-[rgba(26,47,94,0.36)] hover:border-[rgba(76,175,98,0.45)]"
            : ""
        }`}
      >
        {/* Sweep */}
        <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />

        <div>
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 mb-7">
            <div className="flex items-center gap-3">
              <Tag variant="date">{ev.date}</Tag>
              <Tag variant="category" className={`${colors.text} ${colors.bg} ${colors.border}`}>
                {ev.tag}
              </Tag>
            </div>
            {ev.featured && (
              <Tag variant="featured">Featured Event</Tag>
            )}
          </div>

          {/* Title */}
          <h3
            className={`font-['Bebas_Neue',sans-serif] tracking-[0.03em] leading-[1.05] text-white mb-3.5 group-hover:text-[var(--green-lt)] transition-colors duration-300 ${
              ev.featured ? "text-[40px] md:text-[52px]" : "text-[32px]"
            }`}
          >
            {ev.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-2 text-[12px] text-white/40 mb-5 font-mono tracking-wide">
            <svg className="w-3.5 h-3.5 opacity-60 text-[var(--green-lt)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{ev.meta}</span>
          </div>

          <p className="text-white/45 font-light leading-[1.75] mb-8 text-[13.5px]">
            {ev.description}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between group-hover:border-white/[0.08] transition-colors duration-300">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--green-lt)] font-semibold flex items-center gap-2 group-hover:text-white transition-colors duration-300">
            Learn More & RSVP
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[var(--green-lt)] transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
}

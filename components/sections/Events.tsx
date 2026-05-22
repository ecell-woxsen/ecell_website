import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import { events } from "@/data/events";

const tagColors: Record<string, string> = {
  upcoming: "text-[var(--green-lt)] border-[var(--green-lt)]",
  workshop: "text-[#60C8F0] border-[#60C8F0]",
  competition: "text-[#FFB347] border-[#FFB347]",
  talk: "text-[#C4AAFF] border-[#C4AAFF]",
};

export default function Events() {
  return (
    <section className="section-base bg-[var(--ink)]" id="events">
      <div className="section-container">
        <RevealOnScroll>
          <div className="flex justify-between items-end mb-15 max-lg:flex-col max-lg:items-start max-lg:gap-4">
            <SectionHeader label="What's Happening" title="Events & Programs" />
            <Button href="#" variant="outline">
              View All Events
            </Button>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1">
          {events.map((ev, i) => (
            <RevealOnScroll key={ev.id} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}>
              <div
                className={`ecard bg-[var(--ink2)] border border-[var(--border-g)] p-8.5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(76,175,98,0.35)] text-center ${
                  ev.featured
                    ? "col-span-2 max-lg:col-span-1 bg-gradient-to-br from-[rgba(26,47,94,0.4)] to-[var(--ink2)] border-[rgba(26,47,94,0.5)]"
                    : ""
                }`}
              >
                {/* Tag */}
                <span
                  className={`inline-block font-mono text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 border rounded-md mb-5 ${
                    tagColors[ev.tagType] || tagColors.upcoming
                  }`}
                >
                  {ev.tag}
                </span>

                {/* Date watermark */}
                <span
                  className={`font-['Bebas_Neue',sans-serif] text-white/[0.055] leading-none absolute top-4.5 right-5.5 ${
                    ev.featured ? "text-[92px]" : "text-[54px]"
                  }`}
                >
                  {ev.date}
                </span>

                {/* Title */}
                <h3
                  className={`font-['Bebas_Neue',sans-serif] tracking-[0.02em] leading-[1.1] mb-3 ${
                    ev.featured ? "text-[44px]" : "text-[28px]"
                  }`}
                >
                  {ev.title}
                </h3>

                {/* Meta */}
                <p className="font-mono text-[11px] text-white/[0.32] mb-4.5">
                  {ev.meta}
                </p>

                {/* Description */}
                <p className="text-[13px] text-white/[0.4] leading-[1.7] font-light">
                  {ev.description}
                </p>

                {/* Arrow */}
                <div className="absolute bottom-6.5 right-6.5 w-9 h-9 border border-[var(--border-g)] rounded-lg flex items-center justify-center text-[var(--green-lt)] transition-all duration-300 group-hover:bg-[var(--navy)] group-hover:border-[var(--navy)] group-hover:text-white group-hover:rotate-45">
                  →
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

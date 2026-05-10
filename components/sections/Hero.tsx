import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-end px-16 pb-[90px] relative overflow-hidden max-lg:px-8 max-lg:pb-20"
      id="home"
    >
      <div className="hero-bg" />
      <div className="hero-grid" />

      {/* Badge */}
      <div className="absolute top-[130px] right-[72px] flex flex-col items-center gap-2.5 animate-fade-in delay-7 max-lg:hidden">
        <p className="font-mono text-[8px] tracking-[0.22em] text-white/[0.28] uppercase">
          Est. 2019
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--green-lt)] mb-5.5 flex items-center gap-3.5 animate-fade-up delay-1 before:content-[''] before:w-9 before:h-px before:bg-[var(--green-lt)]">
          {siteConfig.university} · Entrepreneurship Cell
        </p>

        <h1 className="font-['Bebas_Neue',sans-serif] text-[clamp(70px,10.5vw,155px)] leading-[0.92] tracking-[-0.01em] text-[var(--white)] mb-[38px] animate-fade-up delay-2 hero-title-responsive">
          Where <span className="text-[var(--green-lt)]">Builders</span>
          <br />
          <span className="text-outline">Start</span>
        </h1>

        <p className="max-w-[500px] text-[15px] text-white/[0.48] font-light leading-[1.85] mb-12 animate-fade-up delay-3">
          {siteConfig.heroSubtitle}
        </p>

        <div className="flex gap-4 items-center animate-fade-up delay-4 max-sm:flex-col max-sm:items-start">
          <Button href="/#events" variant="primary">
            Explore Events
          </Button>
          <Button href="/#about" variant="outline">
            Learn More
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-[92px] right-20 flex gap-[46px] animate-fade-up delay-5 max-lg:hidden">
        {Object.values(siteConfig.stats).map((stat) => (
          <div key={stat.label} className="text-right">
            <div className="font-['Bebas_Neue',sans-serif] text-[44px] text-[var(--green-lt)] leading-none">
              {stat.value}
            </div>
            <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/[0.32]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-11 right-[70px] flex flex-col items-center gap-2.5 animate-fade-in delay-6 max-lg:hidden">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/[0.28] [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

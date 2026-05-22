import Image from "next/image";
import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#020817] px-16 pb-[90px] pt-36 flex flex-col justify-end max-lg:px-8 max-lg:pb-20"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(22,163,74,0.08),transparent_35%)]" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Top Right Badge */}
      <div className="absolute top-[130px] right-[72px] flex flex-col items-center gap-3 animate-fade-in max-lg:hidden">
        <div className="bg-white/10 backdrop-blur-sm p-4 shadow-2xl border border-white/10 rounded-xl">
          <Image
            src="/ecell-logo.png"
            alt="E-Cell Woxsen"
            width={100}
            height={100}
            className="w-[100px] h-auto object-contain"
          />
        </div>

        <p className="font-mono text-[8px] tracking-[0.24em] uppercase text-white/25">
          Woxsen University · Hyderabad
        </p>
      </div>

      {/* Navbar Spacer Line */}
      <div className="absolute top-[90px] left-0 w-full h-px bg-white/[0.06]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-[760px]">
        {/* Subtitle */}
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-6 flex items-center gap-4 animate-fade-up delay-1 before:content-[''] before:w-10 before:h-px before:bg-[var(--green-lt)]">
          Entrepreneurship Cell · {siteConfig.university}
        </p>

        {/* Main Heading */}
        <h1 className="font-['Bebas_Neue',sans-serif] text-[clamp(72px,11vw,170px)] leading-[0.88] tracking-[-0.03em] text-white mb-10 animate-fade-up delay-2">
          WHERE
          <br />
          <span className="text-[var(--green-lt)]">BUILDERS</span>
          <br />
          <span className="text-transparent stroke-text">START.</span>
        </h1>

        {/* Description */}
        <p className="max-w-[520px] text-[15px] leading-[1.9] text-white/45 font-light mb-12 animate-fade-up delay-3">
          {siteConfig.heroSubtitle}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 animate-fade-up delay-4 max-sm:flex-col max-sm:items-start">
          <Button href="/#events" variant="primary">
            Explore Events →
          </Button>

          <Button href="/#contact" variant="outline">
            Submit Your Idea
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-[95px] right-20 flex gap-14 animate-fade-up delay-5 max-xl:hidden">
        {Object.values(siteConfig.stats).map((stat) => (
          <div key={stat.label} className="text-right">
            <div className="font-['Bebas_Neue',sans-serif] text-[46px] leading-none text-[var(--green-lt)]">
              {stat.value}
            </div>

            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


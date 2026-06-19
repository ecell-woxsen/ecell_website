import Image from "next/image";
import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";
import LiquidBlobField from "@/components/three/LiquidBlobField";

export default function Hero() {
  const part1 = "WHERE ";
  const part2 = "BUILDERS";
  const part3 = " START.";

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#020B22] px-16 pb-[90px] pt-36 flex flex-col justify-center items-center max-lg:px-8 max-lg:pb-20"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {/* Dynamic Liquid Blob Field */}
      <LiquidBlobField />

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-1" />

      {/* Center Background Decorative Shield Logo */}
      <div
        id="hero-logo"
        className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-0 opacity-[0.05] blur-[2px] scale-[1.7] max-sm:scale-[1.2] transition-all duration-1000"
      >
        <div className="relative">
          {/* Subtle ambient glow behind the logo */}
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[120px] scale-[1.5]" />
          <Image
            src="/ecell-logo.png"
            alt="E-Cell Woxsen Decorative Background Shield"
            width={640}
            height={640}
            className="w-[600px] h-[600px] md:w-[640px] md:h-[640px] object-contain mix-blend-screen"
            priority
          />
        </div>
      </div>

      {/* Navbar Spacer Line */}
      <div className="absolute top-[90px] left-0 w-full h-px bg-white/[0.06] z-10" />

      {/* Hero Content */}
      <div
        className="relative z-10 max-w-[880px] mx-auto flex flex-col items-center text-center px-4"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%"
        }}
      >
        {/* Subtitle */}
        <p
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--green-lt)] mb-6 animate-fade-up delay-1 text-center"
          style={{ textAlign: "center" }}
        >
          Entrepreneurship Cell · {siteConfig.university}
        </p>

        {/* Main Heading with Staggered Character Reveal */}
        <h1
          className="font-['Bebas_Neue',sans-serif] text-[clamp(44px,7.5vw,100px)] leading-[0.95] tracking-[-0.01em] text-white mb-8 text-center select-none"
          style={{ textAlign: "center" }}
          aria-label="WHERE BUILDERS START."
        >
          <span aria-hidden="true" className="inline-block">
            {part1.split("").map((char, index) => (
              <span
                key={`p1-${index}`}
                className="inline-block animate-letter-reveal"
                style={{
                  animationDelay: `${index * 0.04}s`,
                  whiteSpace: char === " " ? "pre" : "normal"
                }}
              >
                {char}
              </span>
            ))}
            {part2.split("").map((char, index) => (
              <span
                key={`p2-${index}`}
                className="inline-block text-[var(--green-lt)] animate-letter-reveal"
                style={{
                  animationDelay: `${(part1.length + index) * 0.04}s`,
                  whiteSpace: char === " " ? "pre" : "normal"
                }}
              >
                {char}
              </span>
            ))}
            {part3.split("").map((char, index) => (
              <span
                key={`p3-${index}`}
                className="inline-block animate-letter-reveal"
                style={{
                  animationDelay: `${(part1.length + part2.length + index) * 0.04}s`,
                  whiteSpace: char === " " ? "pre" : "normal"
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* Description */}
        <p
          className="max-w-[560px] text-[15px] leading-[1.8] text-white/50 font-light mb-10 animate-fade-up delay-3 text-center"
          style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
        >
          {siteConfig.heroSubtitle}
        </p>

        {/* Buttons */}
        <div
          className="flex items-center justify-center gap-4 animate-fade-up delay-4 max-sm:flex-col max-sm:w-full"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button href="/events" variant="primary" className="max-sm:w-full">
            Explore Events
          </Button>

          <Button href="/submit-idea" variant="outline" className="max-sm:w-full">
            Submit Your Idea
          </Button>
        </div>
      </div>

      {/* Center-Aligned Stats */}
      <div
        className="absolute bottom-[80px] left-1/2 -translate-x-1/2 flex gap-16 justify-center items-center animate-fade-up delay-5 z-10 max-sm:hidden"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        {Object.values(siteConfig.stats).map((stat) => (
          <div key={stat.label} className="text-center" style={{ textAlign: "center" }}>
            <div className="font-['Bebas_Neue',sans-serif] text-[40px] md:text-[46px] leading-none text-[var(--green-lt)]">
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


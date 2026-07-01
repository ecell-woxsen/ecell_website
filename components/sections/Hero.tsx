
import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";

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
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://062alqwuulaxifxv.public.blob.vercel-storage.com/campus-tour.mp4" type="video/mp4" />
      </video>

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-1" />

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
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-white mb-6 animate-fade-up delay-1 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          style={{ textAlign: "center" }}
        >
          Entrepreneurship Cell · {siteConfig.university}
        </p>

        {/* Main Heading with Staggered Character Reveal */}
        <h1
          className="font-['Bebas_Neue',sans-serif] text-[clamp(44px,7.5vw,100px)] leading-[0.95] tracking-[-0.01em] text-white mb-8 text-center select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
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
                className="inline-block text-[var(--green-lt)] animate-letter-reveal text-[1.25em]"
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
          className="max-w-[560px] text-[15px] leading-[1.8] text-white font-light mb-10 animate-fade-up delay-3 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
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

            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


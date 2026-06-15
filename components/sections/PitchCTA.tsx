import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import DesignThinking3D from "@/components/ui/DesignThinking3D";

export default function PitchCTA() {
  return (
    <section className="section-base bg-[#020817] relative overflow-hidden py-[140px] max-lg:py-20">
      <div className="pitch-bg" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,107,46,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,107,46,0.03)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-[0.85fr_1.15fr] gap-12 items-center max-lg:grid-cols-1 max-lg:gap-12">
          {/* Left: Text Content */}
          <RevealOnScroll>
            <div className="lg:translate-x-20">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-5 flex items-center gap-3.5 opacity-80">
                <span className="w-6 h-px bg-[var(--green-lt)] opacity-50" />
                Ready to Build?
              </p>

              <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(52px,7vw,110px)] leading-[0.9] mb-7">
                Got an <span className="text-[var(--green-lt)]">Idea</span>?
                <br />
                We&apos;ll Help You Ship It.
              </h2>

              <div className="mb-10">
                <p className="text-[15px] text-white/[0.42] font-light leading-[1.85] max-w-[500px]">
                  Whether it&apos;s a napkin sketch or a working prototype — if
                  you&apos;ve got the grit, we&apos;ve got the network, capital, and
                  community to back you.
                </p>
              </div>

              <div className="flex gap-4 max-sm:flex-col max-sm:items-start">
                <Button href="/submit-idea" variant="primary">
                  Submit Your Idea →
                </Button>
                <Button href="/#community" variant="outline">
                  Join the Community
                </Button>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right: 3D Design Thinking Visualization */}
          <RevealOnScroll delay={2} className="max-lg:order-first">
            <DesignThinking3D />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

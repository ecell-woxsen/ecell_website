"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { communitySteps } from "@/data/community";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

// WhatsApp Custom Brand Icon SVG
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 1.908.533 3.692 1.453 5.228L2.04 21.848a.488.488 0 0 0 .633.633l4.59-1.428A9.945 9.945 0 0 0 12 22.034c5.523 0 10-4.483 10-10.017C22 6.484 17.523 2 12 2zm4.58 13.918c-.225.632-1.127 1.154-1.636 1.222-.455.06-1.026.082-2.906-.697-2.4-1-3.92-3.415-4.04-3.576-.12-.16-.97-1.292-.97-2.466 0-1.173.615-1.748.84-1.988.225-.24.495-.3.66-.3.165 0 .33 0 .47.008.15.008.353-.056.55.42.202.488.69 1.68.75 1.8.06.12.1.263.02.42-.08.158-.12.263-.24.405-.12.143-.255.323-.36.435-.12.12-.248.248-.105.495.143.24.63 1.035 1.35 1.68.93.83 1.71 1.087 1.95 1.208.24.12.383.1.525-.06.142-.165.615-.713.78-.953.165-.24.33-.2.555-.12.225.082 1.425.675 1.665.795.24.12.4.18.46.285.06.105.06.608-.165 1.24z" clipRule="evenodd" />
    </svg>
  );
}

// Discord Custom Brand Icon SVG
function DiscordIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
    </svg>
  );
}

export default function CommunityPage() {
  const whatsappUrl = siteConfig.social.whatsapp;
  const discordUrl = siteConfig.social.discord;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* WhatsApp button custom hover colors */
          .btn-whatsapp {
            border-color: rgba(37, 211, 102, 0.3) !important;
            background: rgba(37, 211, 102, 0.05) !important;
            color: #25D366 !important;
          }
          .btn-whatsapp:hover {
            background: #25D366 !important;
            color: #ffffff !important;
            border-color: #25D366 !important;
            box-shadow: 0 0 20px rgba(37, 211, 102, 0.4) !important;
          }

          /* Discord button custom hover colors */
          .btn-discord {
            border-color: rgba(88, 101, 242, 0.3) !important;
            background: rgba(88, 101, 242, 0.05) !important;
            color: #5865F2 !important;
          }
          .btn-discord:hover {
            background: #5865F2 !important;
            color: #ffffff !important;
            border-color: #5865F2 !important;
            box-shadow: 0 0 20px rgba(88, 101, 242, 0.4) !important;
          }
        `
      }} />

      {/* ── PAGE HERO ── */}
      <div className="page-hero mesh-bg-community pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,47,94,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(26,47,94,0.035)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="animate-fade-up delay-1">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-5 flex items-center gap-3.5 opacity-80">
              <span className="w-7 h-px bg-[var(--green-lt)] opacity-50" />
              E-Cell Community
            </p>
          </div>

          <h1 className="font-['Bebas_Neue',sans-serif] text-[clamp(64px,9vw,140px)] leading-[0.88] tracking-[-0.02em] text-white mb-7 animate-fade-up delay-2">
            Join the<br />
            <span className="text-[var(--green-lt)]">Builders.</span>
          </h1>

          <p className="max-w-[560px] text-[15px] leading-[1.9] text-white/45 font-light animate-fade-up delay-3">
            E-Cell is more than an incubator — it is a vibrant network of over 1,200 student founders, developers, designers, and operators collaborating to turn audacious ideas into scaling ventures.
          </p>

          {/* Right Side Logo */}
          <Link 
            href="/"
            className="absolute top-1/2 -translate-y-1/2 right-4 animate-fade-in delay-2 max-lg:hidden block cursor-pointer"
          >
            <Image
              src="/ecell-logo.png"
              alt="E-Cell Woxsen Logo"
              width={280}
              height={280}
              className="w-[280px] h-[280px] object-contain opacity-95 hover:opacity-100 transition-all duration-500 hover:scale-105"
              priority
            />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />
      </div>

      {/* ── CHANNELS SECTION ── */}
      <section className="section-base bg-[#020817] pt-0">
        <div className="section-container">
          <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
            
            {/* WhatsApp Card */}
            <RevealOnScroll>
              <div className="card-pad glass-card h-full flex flex-col justify-between border-white/[0.06] hover:border-[#25D366]/35 relative overflow-hidden group">
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#25D366]/[0.02] to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />
                
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="font-['Bebas_Neue',sans-serif] text-[36px] tracking-[0.03em] leading-none text-white">
                      WhatsApp Community
                    </h3>
                    <div className="text-[#25D366] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shrink-0">
                      <WhatsAppIcon className="w-9 h-9" />
                    </div>
                  </div>
                  
                  <p className="text-white/45 font-light leading-[1.8] mb-8 text-[14px]">
                    Stay in the loop with official E-Cell updates. Get instant access to micro-grant deadlines, physical networking mixer alerts, speaker circuit announcements, and key community notices.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.04]">
                  <Button 
                    href={whatsappUrl} 
                    variant="outline" 
                    className="w-full btn-whatsapp gap-3" 
                    id="join-whatsapp-button"
                  >
                    <WhatsAppIcon />
                    Join WhatsApp Group
                  </Button>
                </div>
              </div>
            </RevealOnScroll>

            {/* Discord Card */}
            <RevealOnScroll delay={2}>
              <div className="card-pad glass-card h-full flex flex-col justify-between border-white/[0.06] hover:border-[#5865F2]/35 relative overflow-hidden group">
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#5865F2]/[0.02] to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />
                
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="font-['Bebas_Neue',sans-serif] text-[36px] tracking-[0.03em] leading-none text-white">
                      Discord Server
                    </h3>
                    <div className="text-[#5865F2] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shrink-0">
                      <DiscordIcon className="w-9 h-9" />
                    </div>
                  </div>

                  <p className="text-white/45 font-light leading-[1.8] mb-8 text-[14px]">
                    The digital headquarters of Woxsen builders. Discuss tech stacks, find co-founders, share projects in #ship-it, solicit help from mentors, participate in hackathons, and hang out in voice channels.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.04]">
                  <Button 
                    href={discordUrl} 
                    variant="outline" 
                    className="w-full btn-discord gap-3" 
                    id="join-discord-button"
                  >
                    <DiscordIcon />
                    Enter Discord Server
                  </Button>
                </div>
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>


      {/* ── TIMELINE/STEPS SECTION ── */}
      <section className="section-base bg-[#020817] pt-0 pb-28">
        <div className="section-container">
          <div className="grid grid-cols-[380px_1fr] gap-20 max-lg:grid-cols-1 max-lg:gap-12">
            
            {/* Left Header */}
            <div>
              <RevealOnScroll>
                <SectionHeader label="Onboarding" title="How to Join" />
                <p className="text-[15px] text-white/40 font-light leading-[1.85] -mt-2">
                  Four simple steps to plug yourself into Woxsen University's largest active entrepreneurship and building network.
                </p>
              </RevealOnScroll>
            </div>

            {/* Right Steps */}
            <div>
              <RevealOnScroll delay={2}>
                <div className="flex flex-col">
                  {communitySteps.map((step) => (
                    <div 
                      key={step.id} 
                      className="flex items-start gap-6 py-6 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.005] px-4 rounded-xl transition-colors duration-200"
                    >
                      <span className="font-['Bebas_Neue',sans-serif] text-[32px] text-[var(--green-lt)] leading-none w-10 shrink-0">
                        {step.number}
                      </span>
                      <div>
                        <h4 className="text-[15px] font-medium text-white/90 mb-1">
                          {step.title}
                        </h4>
                        <p className="text-[13px] text-white/40 leading-[1.75] font-light">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

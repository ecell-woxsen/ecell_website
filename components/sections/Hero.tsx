
"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";

const VIDEO_URL = "https://062alqwuulaxifxv.public.blob.vercel-storage.com/campus-tour.mp4";

function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 3) {
      setIsLoaded(true);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Resource hint for instant browser preloading and caching */}
      <link rel="preload" href={VIDEO_URL} as="video" type="video/mp4" />

      {/* Smooth dark gradient placeholder while buffering */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#020B22] via-[#061230] to-[#020B22] transition-opacity duration-700 z-0 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* Optimized Background Video with instant load & lazy playback */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setIsLoaded(true)}
        onLoadedData={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
    </>
  );
}

export default function Hero() {
  const part1 = "WHERE ";
  const part2 = "BUILDERS";
  const part3 = " START.";

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#020B22] px-16 pb-[90px] pt-36 flex flex-col justify-center items-center max-lg:px-8 max-lg:pb-20"
    >
      {/* Optimized Background Video with Lazy Playback & Preloading */}
      <HeroBackgroundVideo />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-1" />

      {/* Radial glow behind heading */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(76,175,98,0.10),transparent_70%)] blur-2xl" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[880px] mx-auto flex flex-col items-center text-center px-4">
        {/* Subtitle */}
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-white mb-6 animate-fade-up delay-1 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Entrepreneurship Cell · {siteConfig.university}
        </p>

        {/* Main Heading with Staggered Character Reveal */}
        <h1
          className="font-['Bebas_Neue',sans-serif] text-[clamp(44px,7.5vw,100px)] leading-[0.95] tracking-[-0.01em] text-white mb-8 text-center select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
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
            <span className="relative inline-block">
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
              {/* Glowing underline beneath BUILDERS */}
              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full animate-fade-in delay-6"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--green-lt), transparent)",
                  boxShadow: "0 0 12px rgba(76,175,98,0.6)"
                }}
              />
            </span>
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
        <p className="max-w-[560px] text-[15px] leading-[1.8] text-white font-light mb-10 animate-fade-up delay-3 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {siteConfig.heroSubtitle}
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 animate-fade-up delay-4 max-sm:flex-col max-sm:w-full">
          <Button href="/events" variant="primary" className="max-sm:w-full btn-sweep">
            Explore Events
          </Button>

          <Button href="/submit-idea" variant="outline" className="max-sm:w-full">
            Submit Your Idea
          </Button>
        </div>
      </div>

      {/* Center-Aligned Stats with dividers */}
      <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 flex gap-12 justify-center items-center animate-fade-up delay-5 z-10 max-sm:hidden">
        {Object.values(siteConfig.stats).map((stat, idx, arr) => (
          <div key={stat.label} className="flex items-center gap-12">
            <div className="stat-hover text-center">
              <div className="font-['Bebas_Neue',sans-serif] text-[40px] md:text-[46px] leading-none text-[var(--green-lt)] drop-shadow-[0_0_20px_rgba(76,175,98,0.35)]">
                {stat.value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-1 whitespace-nowrap">
                {stat.label}
              </div>
            </div>
            {idx < arr.length - 1 && (
              <div className="w-px h-8 bg-white/10 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 scroll-indicator max-sm:hidden">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/30">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

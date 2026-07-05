"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashIntro() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Set delays on mount to shift content entry animations
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--delay-base", "1.2s");
      document.documentElement.style.setProperty("--letter-delay-base", "1.2s");
    }

    // Hide/unmount splash screen overlay after animations finish (~2.1s total)
    const timer = setTimeout(() => {
      setMounted(false);
    }, 2100);

    // Smoothly reset delay base to 0s AFTER all content animations have fully finished (~5.1s total)
    // This prevents active animations from snapping or resetting midway.
    const resetTimer = setTimeout(() => {
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--delay-base", "0s");
        document.documentElement.style.setProperty("--letter-delay-base", "0s");
      }
    }, 5100);

    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="splash-overlay-wrapper">
      {/* Top-Left Sliding Background Half */}
      <div className="splash-bg-half splash-bg-top" />

      {/* Bottom-Right Sliding Background Half */}
      <div className="splash-bg-half splash-bg-bottom" />

      <div className="splash-logo-container">
        {/* Top-Left Logo Half */}
        <div className="splash-logo-half splash-logo-top">
          <Image
            src="/ecell-logo.png"
            alt="E-Cell Woxsen Logo"
            width={320}
            height={112}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Bottom-Right Logo Half */}
        <div className="splash-logo-half splash-logo-bottom">
          <Image
            src="/ecell-logo.png"
            alt="E-Cell Woxsen Logo"
            width={320}
            height={112}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Diagonal Light Streak */}
        <div className="splash-streak" />

        {/* Split Seam Spark/Glow */}
        <div className="splash-spark" />
      </div>
    </div>
  );
}

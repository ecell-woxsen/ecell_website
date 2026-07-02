"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashIntro() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Unmount splash screen after animations finish (~2.1s total)
    const timer = setTimeout(() => {
      setMounted(false);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="splash-overlay">
      <div className="splash-logo-container">
        {/* Top-Left Half */}
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

        {/* Bottom-Right Half */}
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

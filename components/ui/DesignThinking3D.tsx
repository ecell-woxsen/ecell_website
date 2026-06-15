"use client";

import { useEffect, useRef, useState } from "react";

// ─── Lemniscate geometry ────────────────────────────────────────────────────
// Parametric: x = a·cos(t)/(1+sin²t),  y = a·sin(t)·cos(t)/(1+sin²t)
// Traversal: right-extreme → lower-right → ×center → upper-left → left-extreme
//            → lower-left → ×center → upper-right → right-extreme

const VW = 560, VH = 320;
const CX = 280, CY = 160;
const SX = 220, SY = 260; // horizontal & vertical scale

function lem(t: number) {
  const d = 1 + Math.sin(t) ** 2;
  return {
    x: CX + (SX * Math.cos(t)) / d,
    y: CY + (SY * Math.sin(t) * Math.cos(t)) / d,
  };
}

// Full smooth path (361 polyline points → visually smooth at display size)
const INF_PATH = Array.from({ length: 361 }, (_, i) =>
  lem((i / 360) * Math.PI * 2)
)
  .map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
  .join(" ") + " Z";

// ─── Node data ─────────────────────────────────────────────────────────────
// t-values land at the 4 lobe-corners + right extreme, skipping the center
// crossing so nodes never crowd together.
const RAW_NODES = [
  { t: 0,                  label: "Empathize", sub: "Understand the user" },
  { t: Math.PI / 4,        label: "Define",    sub: "Frame the problem"   },
  { t: (Math.PI * 3) / 4,  label: "Ideate",    sub: "Explore solutions"   },
  { t: (Math.PI * 5) / 4,  label: "Prototype", sub: "Build to think"      },
  { t: Math.PI / 2,        label: "Test",      sub: "Learn & iterate"     },
];

const NODES = RAW_NODES.map((n, i) => {
  const { x, y } = lem(n.t);
  return { ...n, i, px: (x / VW) * 100, py: (y / VH) * 100 };
});

// ─── Component ──────────────────────────────────────────────────────────────
export default function DesignThinking3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [pulse, setPulse] = useState(0);
  const [inView, setInView] = useState(false);
  const paused = useRef(false);

  // Only animate when visible
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-cycle
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      if (!paused.current) setPulse((p) => (p + 1) % 5);
    }, 2800);
    return () => clearInterval(id);
  }, [inView]);

  const hi = active ?? pulse;

  return (
    <div ref={wrapRef} className="dt-wrap">
      <style>{`
        /* ─── Wrapper ─────────────────────────────────────────── */
        .dt-wrap {
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          position: relative;
          left: 300px;
          padding: 8px 0;
          opacity: 0.85;
        }

        /* ─── Canvas (SVG + pill overlay share same space) ─────── */
        .dt-canvas {
          position: relative;
          width: 100%;
          /* Maintain 480:220 aspect ratio */
          padding-bottom: ${(VH / VW) * 100}%;
        }

        /* ─── SVG ───────────────────────────────────────────────── */
        .dt-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* ─── Pills overlay (absolute, fills canvas) ────────────── */
        .dt-pills {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* ─── Individual pill (horizontal cylinder) ──────────────── */
        .dt-pill {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: auto;
          cursor: default;

          /* Pill dimensions */
          width: 142px;
          height: 48px;
          border-radius: 999px;
          padding: 0 18px 0 14px;

          display: flex;
          align-items: center;
          gap: 9px;

          /* Glassmorphic cylinder base */
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.09)  0%,
            rgba(255, 255, 255, 0.04) 18%,
            rgba(14, 26, 56, 0.82)    50%,
            rgba(6,  10, 22, 0.88)   100%
          );
          border: 1px solid rgba(76, 175, 98, 0.14);

          /* Cylinder depth: top highlight + bottom shadow */
          box-shadow:
            inset 0  1px  0 rgba(255, 255, 255, 0.10),
            inset 0 -1px  0 rgba(0, 0, 0, 0.30),
            0 4px 20px rgba(0, 0, 0, 0.28);

          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);

          transition: border-color 0.35s, box-shadow 0.35s, background 0.35s, transform 0.25s;
          will-change: transform;
          z-index: 2;
          white-space: nowrap;
        }

        /* Active / hover state */
        .dt-pill.on {
          border-color: rgba(76, 175, 98, 0.50);
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.14)  0%,
            rgba(76, 175, 98, 0.16)   28%,
            rgba(30, 107, 46, 0.12)   65%,
            rgba(6,  10, 22, 0.80)   100%
          );
          box-shadow:
            inset 0  1px  0 rgba(255, 255, 255, 0.16),
            inset 0 -1px  0 rgba(0, 0, 0, 0.20),
            0 0 24px rgba(76, 175, 98, 0.12),
            0 6px 24px rgba(0, 0, 0, 0.32);
          transform: translate(-50%, -50%) scale(1.045);
          z-index: 3;
        }

        /* Sonar ring */
        .dt-pill-ring {
          position: absolute;
          inset: -5px;
          border-radius: 999px;
          border: 1px solid rgba(76, 175, 98, 0.28);
          pointer-events: none;
          animation: dt-sonar 2s ease-out infinite;
        }
        @keyframes dt-sonar {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.22); opacity: 0; }
        }

        /* Pill number badge */
        .dt-pill-num {
          font-family: "Bebas Neue", sans-serif;
          font-size: 14px;
          letter-spacing: 0.12em;
          color: rgba(76, 175, 98, 0.38);
          transition: color 0.3s;
          flex-shrink: 0;
          line-height: 1;
        }
        .dt-pill.on .dt-pill-num {
          color: rgba(76, 175, 98, 0.72);
        }

        /* Vertical separator */
        .dt-pill-sep {
          width: 1px;
          height: 22px;
          background: rgba(76, 175, 98, 0.12);
          flex-shrink: 0;
          transition: background 0.3s;
        }
        .dt-pill.on .dt-pill-sep {
          background: rgba(76, 175, 98, 0.3);
        }

        /* Label */
        .dt-pill-name {
          font-family: "Bebas Neue", sans-serif;
          font-size: 20px;
          letter-spacing: 0.04em;
          color: rgba(245, 248, 255, 0.78);
          display: block;
          line-height: 1;
          transition: color 0.3s;
        }
        .dt-pill.on .dt-pill-name {
          color: #4caf62;
        }

        /* Sub-label — only shows when active */
        .dt-pill-sub {
          font-family: "DM Sans", sans-serif;
          font-size: 10.5px;
          font-weight: 300;
          color: rgba(245, 248, 255, 0.28);
          display: block;
          line-height: 1;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.3s, opacity 0.3s, color 0.3s;
          margin-top: 0;
        }
        .dt-pill.on .dt-pill-sub {
          max-height: 24px;
          opacity: 1;
          color: rgba(245, 248, 255, 0.45);
          margin-top: 4px;
        }

        /* Expand pill height when sub-label shows */
        .dt-pill.on {
          height: 60px;
        }

        /* ─── Section label ─────────────────────────────────────── */
        .dt-label {
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          text-align: center;
          color: rgba(76, 175, 98, 0.4);
          margin-bottom: 14px;
        }

        /* ─── Responsive ────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .dt-wrap { left: 0; }
        }
        @media (max-width: 640px) {
          .dt-wrap { max-width: 420px; }
          .dt-pill { width: 100px; height: 36px; padding: 0 12px 0 10px; gap: 7px; }
          .dt-pill.on { height: 46px; }
          .dt-pill-name { font-size: 15px; }
          .dt-pill-num { font-size: 11px; }
          .dt-pill-sub { font-size: 8.5px; }
        }
        @media (max-width: 420px) {
          .dt-wrap { max-width: 340px; }
          .dt-pill { width: 86px; height: 32px; padding: 0 10px 0 8px; gap: 6px; }
          .dt-pill.on { height: 42px; }
          .dt-pill-name { font-size: 13px; }
          .dt-pill-num { font-size: 10px; }
          .dt-pill-sub { display: none; }
        }
      `}</style>

      <p className="dt-label">Design Thinking Process</p>

      <div className="dt-canvas">
        {/* ── SVG layer: infinity track + particle ── */}
        <svg
          className="dt-svg"
          viewBox={`0 0 ${VW} ${VH}`}
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Outer glow blur */}
            <filter id="dt-blur-sm" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
            <filter id="dt-blur-lg" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            {/* Animated gradient along path */}
            <radialGradient id="dt-particle-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#4caf62" stopOpacity="1" />
              <stop offset="60%"  stopColor="#4caf62" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4caf62" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Track — outermost glow (very soft) */}
          <path
            d={INF_PATH}
            stroke="rgba(76,175,98,0.04)"
            strokeWidth="8"
            filter="url(#dt-blur-lg)"
          />
          {/* Track — base line */}
          <path
            d={INF_PATH}
            stroke="rgba(76,175,98,0.10)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Track — animated dashes flowing along path */}
          <path
            d={INF_PATH}
            stroke="rgba(76,175,98,0.22)"
            strokeWidth="0.7"
            strokeDasharray="2.5 9"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-11.5"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </path>

          {/* ─ Active node glow (rendered in SVG, behind pills) ─ */}
          {NODES.map((n, i) =>
            hi === i ? (
              <g key={`g-${i}`}>
                {/* Wide soft halo */}
                <ellipse
                  cx={lem(n.t).x}
                  cy={lem(n.t).y}
                  rx="52"
                  ry="26"
                  fill="rgba(76,175,98,0.06)"
                  filter="url(#dt-blur-lg)"
                />
                {/* Tight rim glow */}
                <ellipse
                  cx={lem(n.t).x}
                  cy={lem(n.t).y}
                  rx="48"
                  ry="22"
                  fill="none"
                  stroke="rgba(76,175,98,0.18)"
                  strokeWidth="1"
                  filter="url(#dt-blur-sm)"
                />
              </g>
            ) : null
          )}

          {/* ─ Orbiting particle ─ */}
          {/* Glow halo */}
          <circle r="5" fill="rgba(76,175,98,0.25)" filter="url(#dt-blur-sm)">
            <animateMotion path={INF_PATH} dur="9s" repeatCount="indefinite" />
          </circle>
          {/* Core dot */}
          <circle r="2.2" fill="#4caf62">
            <animateMotion path={INF_PATH} dur="9s" repeatCount="indefinite" />
          </circle>
          {/* Specular highlight */}
          <circle r="0.9" fill="rgba(255,255,255,0.85)">
            <animateMotion path={INF_PATH} dur="9s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* ── HTML pill nodes (absolute over SVG) ── */}
        <div className="dt-pills">
          {NODES.map((n) => (
            <div
              key={n.label}
              className={`dt-pill${hi === n.i ? " on" : ""}`}
              style={{ left: `${n.px}%`, top: `${n.py}%` }}
              onMouseEnter={() => {
                setActive(n.i);
                paused.current = true;
              }}
              onMouseLeave={() => {
                setActive(null);
                paused.current = false;
              }}
            >
              {hi === n.i && <div className="dt-pill-ring" />}

              <span className="dt-pill-num">0{n.i + 1}</span>
              <div className="dt-pill-sep" />
              <div>
                <span className="dt-pill-name">{n.label}</span>
                <span className="dt-pill-sub">{n.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

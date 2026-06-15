"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── Stage Data ─────────────────────────────────
   Positioned organically — NOT on a grid.
   Ideate sits center as the creative hub.
   Coordinates are % of a square canvas. */

const STAGES = [
  { label: "Empathize", desc: "Understand the user deeply", x: 16, y: 18 },
  { label: "Define", desc: "Frame the right problem", x: 76, y: 14 },
  { label: "Ideate", desc: "Explore creative solutions", x: 48, y: 48 },
  { label: "Prototype", desc: "Build to think", x: 16, y: 80 },
  { label: "Test", desc: "Learn and iterate", x: 82, y: 72 },
];

/* ── Connections ─────────────────────────────────
   Main flow: sequential E→D→I→P→T
   Feedback loops: show the messy, iterative reality
   offset = perpendicular curve bow (positive = left of path direction) */

interface Flow {
  from: number;
  to: number;
  offset: number;
  feedback?: boolean;
  cubic?: string; // override with cubic bezier for complex curves
}

const FLOWS: Flow[] = [
  { from: 0, to: 1, offset: -14 },
  { from: 1, to: 2, offset: 15 },
  { from: 2, to: 3, offset: -16 },
  { from: 3, to: 4, offset: 18 },
  // Feedback — design thinking loops back
  {
    from: 4,
    to: 0,
    offset: 0,
    feedback: true,
    cubic: "M 82 72 C 92 44 4 0 16 18",
  },
  { from: 4, to: 2, offset: -10, feedback: true },
  { from: 2, to: 0, offset: 12, feedback: true },
];

/* ── Quadratic Bezier path with perpendicular offset ── */

function qPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  off: number
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * off;
  const cy = my + (dx / len) * off;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

/* ── Component ──────────────────────────────────── */

export default function DesignThinking3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);
  const paused = useRef(false);

  const [active, setActive] = useState<number | null>(null);
  const [pulse, setPulse] = useState(0);
  const [inView, setInView] = useState(false);

  /* ── Visibility ── */
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

  /* ── Auto-cycle through stages ── */
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      if (!paused.current) setPulse((p) => (p + 1) % 5);
    }, 2800);
    return () => clearInterval(id);
  }, [inView]);

  /* ── Parallax depth layers (RAF for smoothness) ── */
  useEffect(() => {
    if (!inView) return;
    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.06;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.06;
      const { x, y } = smooth.current;

      // Three depth layers — dots(near), paths(mid), nodes(far)
      if (dotsRef.current)
        dotsRef.current.style.transform = `translate(${x * 3}px, ${y * 3}px)`;
      if (svgRef.current)
        svgRef.current.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
      if (nodesRef.current)
        nodesRef.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [inView]);

  /* ── Mouse tracking ── */
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  }, []);

  const onLeave = useCallback(() => {
    mouse.current = { x: 0, y: 0 };
  }, []);

  /* ── Derived state ── */
  const hi = active ?? pulse;

  const pathD = FLOWS.map((f) =>
    f.cubic
      ? f.cubic
      : qPath(
          STAGES[f.from].x,
          STAGES[f.from].y,
          STAGES[f.to].x,
          STAGES[f.to].y,
          f.offset
        )
  );

  return (
    <div
      ref={wrapRef}
      className="dtv-wrap"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <style>{`
        /* ── Container ── */
        .dtv-wrap {
          width: 100%;
          max-width: 540px;
          margin: 0 auto;
          position: relative;
          padding: 12px;
        }

        .dtv-canvas {
          width: 100%;
          aspect-ratio: 1;
          position: relative;
          overflow: visible;
        }

        /* ── Dot grid background (depth layer 0) ── */
        .dtv-dots {
          position: absolute;
          inset: -8%;
          background-image: radial-gradient(
            circle,
            rgba(76, 175, 98, 0.03) 1px,
            transparent 1px
          );
          background-size: 5.5% 5.5%;
          pointer-events: none;
          will-change: transform;
        }

        /* ── Ambient glow behind active node ── */
        .dtv-glow {
          position: absolute;
          width: 100px;
          height: 100px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(76, 175, 98, 0.1) 0%,
            transparent 70%
          );
          filter: blur(24px);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .dtv-glow.on {
          opacity: 1;
        }

        /* ── SVG connections (depth layer 1) ── */
        .dtv-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          will-change: transform;
          overflow: visible;
        }

        /* Animated flowing dashes along paths */
        .dtv-flow {
          stroke: rgba(76, 175, 98, 0.12);
          stroke-dasharray: 2.5 7;
          animation: dtvDash 2.5s linear infinite;
          transition: stroke 0.4s;
        }
        .dtv-flow.on {
          stroke: rgba(76, 175, 98, 0.48);
        }
        .dtv-flow.fb {
          stroke: rgba(76, 175, 98, 0.05);
          stroke-dasharray: 1 5;
          animation-duration: 3.5s;
        }
        .dtv-flow.fb.on {
          stroke: rgba(76, 175, 98, 0.22);
        }

        @keyframes dtvDash {
          to {
            stroke-dashoffset: -9.5;
          }
        }

        /* ── Nodes layer (depth layer 2) ── */
        .dtv-nodes {
          position: absolute;
          inset: 0;
          will-change: transform;
        }

        /* ── Individual node card ── */
        .dtv-node {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 126px;
          padding: 14px 14px 16px;
          background: linear-gradient(
            145deg,
            rgba(8, 13, 28, 0.88),
            rgba(14, 26, 56, 0.72)
          );
          border: 1px solid rgba(76, 175, 98, 0.1);
          border-radius: 14px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          cursor: pointer;
          transition: border-color 0.35s, box-shadow 0.35s, background 0.35s;
          z-index: 2;
        }
        .dtv-node.on {
          border-color: rgba(76, 175, 98, 0.38);
          box-shadow:
            0 6px 28px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(76, 175, 98, 0.08),
            0 0 40px rgba(76, 175, 98, 0.06);
          background: linear-gradient(
            145deg,
            rgba(14, 26, 56, 0.92),
            rgba(30, 107, 46, 0.06)
          );
          z-index: 3;
        }
        .dtv-node.hub {
          width: 136px;
        }

        /* Node typography */
        .dtv-num {
          font-family: "Bebas Neue", sans-serif;
          font-size: 12px;
          letter-spacing: 0.18em;
          color: rgba(76, 175, 98, 0.25);
          display: block;
          margin-bottom: 3px;
          transition: color 0.3s;
        }
        .dtv-node.on .dtv-num {
          color: rgba(76, 175, 98, 0.55);
        }

        .dtv-name {
          font-family: "Bebas Neue", sans-serif;
          font-size: 19px;
          letter-spacing: 0.04em;
          color: rgba(245, 248, 255, 0.85);
          display: block;
          transition: color 0.3s;
        }
        .dtv-node.on .dtv-name {
          color: #4caf62;
        }

        .dtv-divider {
          width: 18px;
          height: 1px;
          background: rgba(76, 175, 98, 0.18);
          margin: 7px 0;
          transition: width 0.35s, background 0.35s;
        }
        .dtv-node.on .dtv-divider {
          width: 28px;
          background: rgba(76, 175, 98, 0.45);
        }

        .dtv-desc {
          font-family: "DM Sans", sans-serif;
          font-size: 10.5px;
          color: rgba(245, 248, 255, 0.28);
          line-height: 1.45;
          font-weight: 300;
          display: block;
          transition: color 0.3s;
        }
        .dtv-node.on .dtv-desc {
          color: rgba(245, 248, 255, 0.5);
        }

        /* ── Pulse ring around active node ── */
        .dtv-ring {
          position: absolute;
          inset: -6px;
          border-radius: 18px;
          border: 1px solid rgba(76, 175, 98, 0.2);
          pointer-events: none;
          animation: dtvRing 2.2s ease-out infinite;
        }

        @keyframes dtvRing {
          0% {
            transform: scale(1);
            opacity: 0.35;
          }
          100% {
            transform: scale(1.12);
            opacity: 0;
          }
        }

        /* ── Section title ── */
        .dtv-title {
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          text-align: center;
          color: rgba(76, 175, 98, 0.45);
          margin-bottom: 12px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .dtv-wrap {
            max-width: 420px;
          }
          .dtv-node {
            width: 108px;
            padding: 11px 11px 13px;
            border-radius: 12px;
          }
          .dtv-node.hub {
            width: 118px;
          }
          .dtv-name {
            font-size: 17px;
          }
          .dtv-desc {
            font-size: 9.5px;
          }
        }

        @media (max-width: 480px) {
          .dtv-wrap {
            max-width: 340px;
          }
          .dtv-node {
            width: 94px;
            padding: 9px 9px 11px;
          }
          .dtv-node.hub {
            width: 104px;
          }
          .dtv-name {
            font-size: 15px;
          }
          .dtv-desc {
            font-size: 9px;
          }
          .dtv-num {
            font-size: 10px;
          }
        }
      `}</style>

      <p className="dtv-title">Design Thinking Process</p>

      <div className="dtv-canvas">
        {/* Background dot grid — moves least on parallax */}
        <div ref={dotsRef} className="dtv-dots" />

        {/* Ambient glows at each node position */}
        {STAGES.map((s, i) => (
          <div
            key={`glow-${i}`}
            className={`dtv-glow ${hi === i ? "on" : ""}`}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          />
        ))}

        {/* SVG connection paths — moves at mid depth */}
        <svg
          ref={svgRef}
          className="dtv-svg"
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          {FLOWS.map((f, i) => {
            const isOn = hi === f.from || hi === f.to;
            const baseAlpha = isOn
              ? f.feedback
                ? 0.08
                : 0.16
              : f.feedback
                ? 0.04
                : 0.08;

            return (
              <g key={i}>
                {/* Static track (subtle line you can always see) */}
                <path
                  d={pathD[i]}
                  stroke={`rgba(76,175,98,${baseAlpha})`}
                  strokeWidth={f.feedback ? 0.28 : 0.42}
                  strokeDasharray={f.feedback ? "1.5 2.5" : undefined}
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Animated flow particles */}
                <path
                  d={pathD[i]}
                  className={`dtv-flow${isOn ? " on" : ""}${f.feedback ? " fb" : ""}`}
                  strokeWidth={f.feedback ? 0.28 : 0.42}
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
        </svg>

        {/* Stage nodes — moves most on parallax */}
        <div ref={nodesRef} className="dtv-nodes">
          {STAGES.map((s, i) => (
            <div
              key={s.label}
              className={`dtv-node${hi === i ? " on" : ""}${i === 2 ? " hub" : ""}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              onMouseEnter={() => {
                setActive(i);
                paused.current = true;
              }}
              onMouseLeave={() => {
                setActive(null);
                paused.current = false;
              }}
            >
              {hi === i && <div className="dtv-ring" />}
              <span className="dtv-num">0{i + 1}</span>
              <span className="dtv-name">{s.label}</span>
              <div className="dtv-divider" />
              <span className="dtv-desc">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { LiquidBlobShader } from "./LiquidBlobShader";
import { BlobConfig, BlobState } from "./types";

// Suppress Three.js Clock deprecation warnings coming from React Three Fiber internals
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      (args[0].includes("THREE.Clock") || args[0].includes("THREE.Timer"))
    ) {
      return;
    }
    originalWarn(...args);
  };
}

const DEFAULT_CONFIG: BlobConfig = {
  friction: 0.86, // Highly viscous friction (damps speeds rapidly to prevent chaotic acceleration buildup)
  wanderStrength: 0.002, // Minimal wandering force for slow, glassy drift
  boundaryForceStrength: 0.3, // Gentle boundary padding
  attractionStrength: 0.0, // Removed attraction to prevent locking blobs in merged state
  repulsionStrength: 0.18, // Increased repulsion to push merged blobs apart dynamically
  mouseRadius: 0.45, // Wide mouse influence radius
  mousePushStrength: 0.08, // Very gentle, expensive-feeling push away from cursor
  mouseDragStrength: 0.18, // Smooth velocity drag
  springK: 6.0, // Very low spring stiffness for a smooth, lazy visual lag
  damperC: 4.8, // Critically damped visual tracking to completely eliminate wobbly oscillations
  deformIntensity: 1.4, // Graceful deformation amount
  thresholds: [0.18, 0.20, 0.23], // Thresholds for large, medium, small layers
  edgeWidths: [0.07, 0.07, 0.07], // Soft outer boundaries
  bgGlowIntensity: 0.18,
};

interface SimulationPlaneProps {
  uniforms: any;
  blobsRef: React.MutableRefObject<BlobState[]>;
  bgGlowsRef: React.MutableRefObject<any[]>;
  isInitialized: React.MutableRefObject<boolean>;
  lastAspect: React.MutableRefObject<number>;
  initBlobs: (aspect: number) => void;
  initBgGlows: (aspect: number) => void;
  mousePosRef: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number; active: boolean }>;
  reducedMotion: boolean;
}

function SimulationPlane({
  uniforms,
  blobsRef,
  bgGlowsRef,
  isInitialized,
  lastAspect,
  initBlobs,
  initBgGlows,
  mousePosRef,
  reducedMotion,
}: SimulationPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { width, height } = useThree((state) => state.viewport);
  const aspect = width / height;
  const wanderTimeRef = useRef(0);

  // Handles physics update inside the high-frequency animation frame loop
  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const { width, height } = state.viewport;
    const aspect = width / height;

    // Early return if canvas dimensions are not yet measured to prevent NaN coordinate calculations
    if (width === 0 || height === 0 || isNaN(aspect) || !isFinite(aspect)) {
      return;
    }

    // 1. Compute delta time (cap to prevent teleportation during lag spikes)
    const dt = Math.min(delta, 0.03);
    wanderTimeRef.current += dt;

    // 2. Setup aspect ratio & initialize simulation if needed
    if (!isInitialized.current) {
      initBlobs(aspect);
      initBgGlows(aspect);
      lastAspect.current = aspect;
    } else if (Math.abs(lastAspect.current - aspect) > 0.001) {
      // Smoothly reposition blobs when aspect ratio shifts
      const ratio = aspect / lastAspect.current;
      blobsRef.current.forEach((b) => {
        b.x *= ratio;
        b.visualX *= ratio;
      });
      bgGlowsRef.current.forEach((g) => {
        g.x *= ratio;
      });
      lastAspect.current = aspect;
    }

    const config = DEFAULT_CONFIG;
    const blobs = blobsRef.current;
    const bgGlows = bgGlowsRef.current;

    // Reduced motion modifiers (accessibility scaling)
    const motionScale = reducedMotion ? 0.12 : 1.0;
    const deformScale = reducedMotion ? 0.04 : 1.0;
    const mouseScale = reducedMotion ? 0.0 : 1.0;

    const mouse = mousePosRef.current;
    const mouseActive = mouse.active && !reducedMotion;
    const mx = mouse.x;
    const my = mouse.y;
    const mvx = mouse.vx * mouseScale;
    const mvy = mouse.vy * mouseScale;

    // Decay mouse velocity slowly when pointer leaves or stops moving
    mousePosRef.current.vx *= 0.92;
    mousePosRef.current.vy *= 0.92;

    // 3. Update background ambient glows (Layer 1)
    bgGlows.forEach((g) => {
      g.x += g.vx * dt * motionScale;
      g.y += g.vy * dt * motionScale;

      const padX = g.radius * 0.4;
      if (g.x < -padX) g.vx = Math.abs(g.vx);
      else if (g.x > aspect + padX) g.vx = -Math.abs(g.vx);

      const padY = g.radius * 0.4;
      if (g.y < -padY) g.vy = Math.abs(g.vy);
      else if (g.y > 1.0 + padY) g.vy = -Math.abs(g.vy);
    });

    // 4. Run physics simulation for liquid blobs (Layers 2, 3, and 4)
    blobs.forEach((b, i) => {
      // wandering path force with extremely low frequencies to avoid quick wiggles
      const wanderTime = wanderTimeRef.current;
      const angle =
        Math.sin(wanderTime * 0.06 + b.id * 3.1) *
        Math.cos(wanderTime * 0.03 + b.id * 7.7) *
        Math.PI * 2.0;

      let fx = Math.cos(angle) * config.wanderStrength * motionScale;
      let fy = Math.sin(angle) * config.wanderStrength * motionScale;

      // boundary repulsion (keep inside [0, aspect] x [0, 1])
      const padX = b.radius * 0.85;
      if (b.x < padX) {
        fx += (padX - b.x) * config.boundaryForceStrength;
      } else if (b.x > aspect - padX) {
        fx -= (b.x - (aspect - padX)) * config.boundaryForceStrength;
      }

      const padY = b.radius * 0.85;
      if (b.y < padY) {
        fy += (padY - b.y) * config.boundaryForceStrength;
      } else if (b.y > 1.0 - padY) {
        fy -= (b.y - (1.0 - padY)) * config.boundaryForceStrength;
      }

      // Same-layer repulsion (no attraction force) to prevent excessive merging
      // If blobs drift together, they will temporarily merge visually, but physics will gently push them apart to unmerge
      for (let j = 0; j < blobs.length; j++) {
        if (i === j) continue;
        const other = blobs[j];
        if (b.layer !== other.layer) continue;

        const dx = other.x - b.x;
        const dy = other.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.001) continue;

        const rSum = b.radius + other.radius;
        const repelRange = rSum * 1.15; // Repel range begins when they start to merge visually
        
        if (dist < repelRange) {
          const push = config.repulsionStrength * (1.0 - dist / repelRange) * motionScale;
          fx -= (dx / dist) * push;
          fy -= (dy / dist) * push;
        }
      }

      // mouse interaction force
      if (mouseActive) {
        const mdx = b.x - mx;
        const mdy = b.y - my;
        const mDist = Math.hypot(mdx, mdy);

        if (mDist < config.mouseRadius) {
          const ratio = 1.0 - mDist / config.mouseRadius;
          
          // radial push force
          const push = config.mousePushStrength * ratio * motionScale;
          if (mDist > 0.001) {
            fx += (mdx / mDist) * push;
            fy += (mdy / mDist) * push;
          }

          // viscous drag coupling
          const drag = config.mouseDragStrength * ratio * motionScale;
          fx += mvx * drag;
          fy += mvy * drag;
        }
      }

      // integrate forces
      const ax = fx / b.mass;
      const ay = fy / b.mass;

      b.vx = (b.vx + ax * dt) * config.friction;
      b.vy = (b.vy + ay * dt) * config.friction;

      b.x += b.vx * dt;
      b.y += b.vy * dt;

      // safety clamp bounds
      const rMin = b.radius * 0.25;
      b.x = Math.max(rMin, Math.min(aspect - rMin, b.x));
      b.y = Math.max(rMin, Math.min(1.0 - rMin, b.y));

      // visual position spring (lag & wobble)
      const ldx = b.x - b.visualX;
      const ldy = b.y - b.visualY;

      const sax = config.springK * ldx - config.damperC * b.visualVx;
      const say = config.springK * ldy - config.damperC * b.visualVy;

      b.visualVx += sax * dt;
      b.visualVy += say * dt;

      b.visualX += b.visualVx * dt;
      b.visualY += b.visualVy * dt;
    });

    // 5. Commit state updates to GLSL Shader Uniforms via flat arrays to force GPU re-upload
    const positions = new Float32Array(20 * 2);
    const deforms = new Float32Array(20 * 3);
    const sizes = new Float32Array(20);
    const colors = new Float32Array(20 * 3);
    const layers = new Float32Array(20);

    const bgPos = new Float32Array(3 * 2);
    const bgCol = new Float32Array(3 * 3);
    const bgSizes = new Float32Array(3);

    blobs.forEach((b, idx) => {
      positions[idx * 2] = b.visualX;
      positions[idx * 2 + 1] = b.visualY;

      // deform vector calculation based on visual inertia displacement
      const lagX = b.x - b.visualX;
      const lagY = b.y - b.visualY;
      const lagDist = Math.hypot(lagX, lagY);

      if (lagDist > 0.001) {
        const dirX = lagX / lagDist;
        const dirY = lagY / lagDist;
        const stretch = 1.0 + lagDist * config.deformIntensity * deformScale;
        const clampedStretch = Math.min(stretch, 1.75); // Prevent weird visual tearing
        deforms[idx * 3] = dirX;
        deforms[idx * 3 + 1] = dirY;
        deforms[idx * 3 + 2] = clampedStretch;
      } else {
        deforms[idx * 3] = 0.0;
        deforms[idx * 3 + 1] = 0.0;
        deforms[idx * 3 + 2] = 1.0;
      }

      sizes[idx] = b.radius;
      colors[idx * 3] = b.color[0];
      colors[idx * 3 + 1] = b.color[1];
      colors[idx * 3 + 2] = b.color[2];
      layers[idx] = b.layer;
    });

    bgGlows.forEach((g, idx) => {
      bgPos[idx * 2] = g.x;
      bgPos[idx * 2 + 1] = g.y;
      bgCol[idx * 3] = g.color[0];
      bgCol[idx * 3 + 1] = g.color[1];
      bgCol[idx * 3 + 2] = g.color[2];
      bgSizes[idx] = g.radius;
    });

    material.uniforms.u_positions.value = positions;
    material.uniforms.u_deform.value = deforms;
    material.uniforms.u_sizes.value = sizes;
    material.uniforms.u_colors.value = colors;
    material.uniforms.u_layers.value = layers;

    material.uniforms.u_bg_glow_positions.value = bgPos;
    material.uniforms.u_bg_glow_colors.value = bgCol;
    material.uniforms.u_bg_glow_sizes.value = bgSizes;

    material.uniforms.u_aspect.value = aspect;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={LiquidBlobShader.vertexShader}
        fragmentShader={LiquidBlobShader.fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function LiquidBlobField() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<BlobState[]>([]);
  const bgGlowsRef = useRef<any[]>([]);
  const isInitialized = useRef(false);
  const lastAspect = useRef(1.0);

  const mousePosRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, active: false });
  const lastTimeRef = useRef(0);

  // Set mounted state and listen to prefers-reduced-motion media query
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Initialize blob distributions on first aspect calculation
  const initBlobs = (aspect: number) => {
    const list: BlobState[] = [];
    
    // Large Blobs (Layer 2) - 3 blobs (3 blue)
    const largeParams: Array<{ radius: number; color: [number, number, number] }> = [
      { radius: 0.14, color: [0.0902, 0.2392, 0.5608] }, // Blue
      { radius: 0.15, color: [0.0902, 0.2392, 0.5608] }, // Blue
      { radius: 0.13, color: [0.0902, 0.2392, 0.5608] }, // Blue
    ];

    // Medium Blobs (Layer 3) - 4 blobs (3 blue, 1 green)
    const mediumParams: Array<{ radius: number; color: [number, number, number] }> = [
      { radius: 0.09, color: [0.0902, 0.2392, 0.5608] }, // Blue
      { radius: 0.095, color: [0.0902, 0.2392, 0.5608] }, // Blue
      { radius: 0.085, color: [0.0902, 0.2392, 0.5608] }, // Blue
      { radius: 0.08, color: [0.2471, 0.7490, 0.3725] }, // Green
    ];

    // Small Blobs (Layer 4) - 5 blobs (2 blue, 2 green, 1 white)
    const smallParams: Array<{ radius: number; color: [number, number, number] }> = [
      { radius: 0.055, color: [0.0902, 0.2392, 0.5608] }, // Blue
      { radius: 0.06, color: [0.0902, 0.2392, 0.5608] }, // Blue
      { radius: 0.05, color: [0.2471, 0.7490, 0.3725] }, // Green
      { radius: 0.045, color: [0.2471, 0.7490, 0.3725] }, // Green
      { radius: 0.048, color: [1.0, 1.0, 1.0] }, // White
    ];

    let id = 0;
    const addBlobs = (params: Array<{ radius: number; color: [number, number, number] }>, layer: number) => {
      params.forEach((p) => {
        const x = Math.random() * (aspect - p.radius * 2.2) + p.radius * 1.1;
        const y = Math.random() * (1.0 - p.radius * 2.2) + p.radius * 1.1;

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.002 + Math.random() * 0.003; // Slow, premium baseline drift
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const mass = p.radius * p.radius; // physical scaling

        list.push({
          id: id++,
          x,
          y,
          vx,
          vy,
          radius: p.radius,
          mass,
          layer,
          color: p.color,
          visualX: x,
          visualY: y,
          visualVx: 0,
          visualVy: 0,
        });
      });
    };

    addBlobs(largeParams, 2);
    addBlobs(mediumParams, 3);
    addBlobs(smallParams, 4);

    // Pad the remaining 8 slots with invisible dummy blobs to satisfy GLSL uniform constraints
    while (list.length < 20) {
      list.push({
        id: id++,
        x: 0.0,
        y: 0.0,
        vx: 0.0,
        vy: 0.0,
        radius: 0.0, // Size 0 makes it completely invisible in shader evaluations
        mass: 1.0,
        layer: 2,
        color: [0, 0, 0],
        visualX: 0.0,
        visualY: 0.0,
        visualVx: 0.0,
        visualVy: 0.0,
      });
    }

    blobsRef.current = list;
    isInitialized.current = true;
  };

  // Setup slow drift ambient glow nodes (Layer 1)
  const initBgGlows = (aspect: number) => {
    bgGlowsRef.current = [
      {
        x: aspect * 0.75,
        y: 0.35,
        vx: 0.002,
        vy: -0.001,
        radius: 0.7,
        color: [0.0902, 0.2392, 0.5608], // Blue
      },
      {
        x: aspect * 0.2,
        y: 0.78,
        vx: -0.001,
        vy: 0.002,
        radius: 0.6,
        color: [0.2471, 0.7490, 0.3725], // Green
      },
      {
        x: aspect * 0.45,
        y: 0.5,
        vx: 0.0015,
        vy: 0.001,
        radius: 0.8,
        color: [0.0902, 0.2392, 0.5608], // Blue
      },
    ];
  };

  // Compile initial uniform objects
  const uniforms = useMemo(() => {
    return {
      u_aspect: { value: 1.0 },
      u_positions: { value: new Float32Array(20 * 2) },
      u_deform: { value: new Float32Array(20 * 3) },
      u_sizes: { value: new Float32Array(20) },
      u_colors: { value: new Float32Array(20 * 3) },
      u_layers: { value: new Float32Array(20) },
      u_thresholds: {
        value: new THREE.Vector3(
          DEFAULT_CONFIG.thresholds[0],
          DEFAULT_CONFIG.thresholds[1],
          DEFAULT_CONFIG.thresholds[2]
        ),
      },
      u_edge_widths: {
        value: new THREE.Vector3(
          DEFAULT_CONFIG.edgeWidths[0],
          DEFAULT_CONFIG.edgeWidths[1],
          DEFAULT_CONFIG.edgeWidths[2]
        ),
      },
      u_background_color: { value: new THREE.Color(0.0078, 0.0431, 0.1333) }, // #020B22 (E-Cell background)
      u_bg_glow_positions: { value: new Float32Array(3 * 2) },
      u_bg_glow_colors: { value: new Float32Array(3 * 3) },
      u_bg_glow_sizes: { value: new Float32Array(3) },
      u_bg_glow_intensity: { value: DEFAULT_CONFIG.bgGlowIntensity },
    };
  }, []);

  // Register global window pointer listeners to bypass z-index pointer event blocking from absolute/relative text content overlays
  useEffect(() => {
    if (!mounted) return;

    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      const px = (e.clientX - rect.left) / rect.width;
      const py = 1.0 - (e.clientY - rect.top) / rect.height; // WebGL is Y-up

      const now = performance.now();
      const dt = (now - lastTimeRef.current) / 1000;

      // Check if cursor is actually inside the container boundaries
      const isInside = px >= 0.0 && px <= 1.0 && py >= 0.0 && py <= 1.0;

      if (isInside) {
        const aspect = lastAspect.current;
        const targetMx = px * aspect;
        const targetMy = py;

        let vx = 0;
        let vy = 0;
        if (dt > 0.001) {
          vx = (targetMx - mousePosRef.current.x) / dt;
          vy = (targetMy - mousePosRef.current.y) / dt;
        }

        mousePosRef.current = {
          x: targetMx,
          y: targetMy,
          vx: THREE.MathUtils.clamp(vx, -4, 4),
          vy: THREE.MathUtils.clamp(vy, -4, 4),
          active: true,
        };
        lastTimeRef.current = now;
      } else {
        mousePosRef.current.active = false;
        mousePosRef.current.vx = 0;
        mousePosRef.current.vy = 0;
      }
    };

    const handleGlobalPointerLeave = () => {
      mousePosRef.current.active = false;
      mousePosRef.current.vx = 0;
      mousePosRef.current.vy = 0;
    };

    window.addEventListener("pointermove", handleGlobalPointerMove);
    document.addEventListener("pointerleave", handleGlobalPointerLeave);

    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      document.removeEventListener("pointerleave", handleGlobalPointerLeave);
    };
  }, [mounted]);

  // SSR Fallback matches standard branding colors and glow layouts
  if (!mounted) {
    return (
      <div
        className="absolute inset-0 bg-[#020B22] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 50% at 75% 35%, rgba(23, 61, 143, 0.16) 0%, transparent 60%),
            radial-gradient(ellipse 38% 50% at 20% 78%, rgba(63, 191, 95, 0.08) 0%, transparent 55%)
          `,
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-auto"
    >
      <Canvas
        orthographic
        camera={{ left: -1, right: 1, top: 1, bottom: -1, near: -10, far: 10 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "none", width: "100%", height: "100%" }}
      >
        <SimulationPlane
          uniforms={uniforms}
          blobsRef={blobsRef}
          bgGlowsRef={bgGlowsRef}
          isInitialized={isInitialized}
          lastAspect={lastAspect}
          initBlobs={initBlobs}
          initBgGlows={initBgGlows}
          mousePosRef={mousePosRef}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}

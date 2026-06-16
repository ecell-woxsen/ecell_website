export interface BlobConfig {
  // General physics parameters
  friction: number;
  wanderStrength: number;
  boundaryForceStrength: number;
  
  // Surface tension / merging parameters
  attractionStrength: number;
  repulsionStrength: number;
  
  // Mouse interaction
  mouseRadius: number;
  mousePushStrength: number;
  mouseDragStrength: number;
  
  // Spring-damper for inertia/lag
  springK: number;
  damperC: number;
  deformIntensity: number;
  
  // Rendering thresholds
  thresholds: [number, number, number]; // [large, medium, small]
  edgeWidths: [number, number, number]; // [large, medium, small]
  
  // Ambient background glow params
  bgGlowIntensity: number;
}

export interface BlobState {
  id: number;
  
  // Physical center coordinates (ranges: x in [0, aspect], y in [0, 1])
  x: number;
  y: number;
  vx: number;
  vy: number;
  
  // Core attributes
  radius: number;
  mass: number;
  layer: number; // 2 = Large, 3 = Medium, 4 = Small
  color: [number, number, number]; // [r, g, b]
  
  // Visual tracking coordinates (inertia lag and wobble)
  visualX: number;
  visualY: number;
  visualVx: number;
  visualVy: number;
}

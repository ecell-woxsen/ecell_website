export const LiquidBlobShader = {
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float u_aspect;
    uniform vec2 u_positions[20];
    uniform vec3 u_deform[20]; // xy: direction of stretch, z: stretch factor
    uniform float u_sizes[20];
    uniform vec3 u_colors[20];
    uniform float u_layers[20]; // 2.0 = large, 3.0 = medium, 4.0 = small
    
    uniform vec3 u_thresholds; // x: large, y: medium, z: small
    uniform vec3 u_edge_widths; // x: large, y: medium, z: small
    
    uniform vec3 u_background_color;
    uniform vec2 u_bg_glow_positions[3];
    uniform vec3 u_bg_glow_colors[3];
    uniform float u_bg_glow_sizes[3];
    uniform float u_bg_glow_intensity;
    
    varying vec2 vUv;

    // Evaluate metaball field contribution for a deformed ellipsoid
    float evaluateField(vec2 st, vec2 pos, vec3 deform, float size) {
      if (size <= 0.0001) return 0.0;
      
      vec2 r = st - pos;
      vec2 dir = deform.xy;
      float stretch = deform.z;
      
      float distSq = 0.0;
      if (length(dir) > 0.001 && stretch > 1.001) {
        float r_para = dot(r, dir);
        vec2 r_perp = r - r_para * dir;
        
        float deformed_para = r_para / stretch;
        float deformed_perp = length(r_perp) * stretch; // Area-preserving compression
        
        distSq = deformed_para * deformed_para + deformed_perp * deformed_perp;
      } else {
        distSq = dot(r, r);
      }
      
      float dist = sqrt(distSq);
      if (dist < size) {
        float x = dist / size;
        float x2 = x * x;
        float one_minus_x2 = 1.0 - x2;
        // Standard smooth polynomial spline with zero boundary derivatives: (1 - x^2)^3
        return one_minus_x2 * one_minus_x2 * one_minus_x2;
      }
      return 0.0;
    }

    void main() {
      // Correct coordinate system for aspect ratio: X in [0, aspect], Y in [0, 1]
      vec2 st = vec2(vUv.x * u_aspect, vUv.y);
      
      // 1. Evaluate ambient background glows (Layer 1)
      vec3 bg_glow = vec3(0.0);
      for (int i = 0; i < 3; i++) {
        float d = distance(st, u_bg_glow_positions[i]);
        float intensity = pow(smoothstep(u_bg_glow_sizes[i], 0.0, d), 2.2);
        bg_glow += u_bg_glow_colors[i] * intensity * u_bg_glow_intensity;
      }
      vec3 final_bg = u_background_color + bg_glow;
      
      // 2. Accumulate metaball fields per layer
      float field2 = 0.0; // Large
      float field3 = 0.0; // Medium
      float field4 = 0.0; // Small
      
      vec3 color2 = vec3(0.0);
      vec3 color3 = vec3(0.0);
      vec3 color4 = vec3(0.0);
      
      float maxF2 = -1.0;
      float maxF3 = -1.0;
      float maxF4 = -1.0;
      
      for (int i = 0; i < 20; i++) {
        float f = evaluateField(st, u_positions[i], u_deform[i], u_sizes[i]);
        float lyr = u_layers[i];
        
        if (lyr == 2.0) {
          field2 += f;
          if (f > maxF2) {
            maxF2 = f;
            color2 = u_colors[i];
          }
        } else if (lyr == 3.0) {
          field3 += f;
          if (f > maxF3) {
            maxF3 = f;
            color3 = u_colors[i];
          }
        } else if (lyr == 4.0) {
          field4 += f;
          if (f > maxF4) {
            maxF4 = f;
            color4 = u_colors[i];
          }
        }
      }
      
      // 3. Compose layers back-to-front
      vec3 final_color = final_bg;
      
      // Blend Layer 2 (Large primary blobs)
      float alpha2 = smoothstep(u_thresholds.x - u_edge_widths.x, u_thresholds.x, field2);
      final_color = mix(final_color, color2, alpha2);
      
      // Blend Layer 3 (Medium blobs)
      float alpha3 = smoothstep(u_thresholds.y - u_edge_widths.y, u_thresholds.y, field3);
      final_color = mix(final_color, color3, alpha3);
      
      // Blend Layer 4 (Small accent blobs)
      float alpha4 = smoothstep(u_thresholds.z - u_edge_widths.z, u_thresholds.z, field4);
      final_color = mix(final_color, color4, alpha4);
      
      gl_FragColor = vec4(final_color, 1.0);
    }
  `
};

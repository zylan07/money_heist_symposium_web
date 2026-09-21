import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * THE HEIST — CINEMATIC DARK-RED SHADER ATMOSPHERE
 * 
 * Configurable WebGL shader implementing:
 * - multiple colors (near-black base, charcoal, dark crimson, burgundy, wine red)
 * - intensity, contrast, blur, brightness, saturation, vignette, grain, slow movement
 * - smooth domain-warped FBM fluid clouds
 * - zero bright pink, orange, purple, or neon
 */

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;
varying vec2 v_uv;

uniform vec2 u_resolution;
uniform float u_time;

// Palette uniforms
uniform vec3 u_colorBase;
uniform vec3 u_colorCharcoal;
uniform vec3 u_colorCrimson;
uniform vec3 u_colorBurgundy;
uniform vec3 u_colorWine;

// Atmospheric control uniforms
uniform float u_intensity;
uniform float u_contrast;
uniform float u_blur;
uniform float u_brightness;
uniform float u_saturation;
uniform float u_vignette;
uniform float u_grain;
uniform float u_speed;

// Fast analytical 2D noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// 3-octave FBM for soft, billowy clouds
float fbm(vec2 p, float t) {
  float v = 0.0;
  float a = 0.52;
  mat2 rot = mat2(0.87, 0.48, -0.48, 0.87);
  for (int i = 0; i < 3; ++i) {
    v += a * snoise(p + vec2(t * 0.16, t * 0.12));
    p = rot * p * 1.85 + vec2(12.4, 7.1);
    a *= 0.48;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 0.95;

  float t = u_time * u_speed;

  // Domain warping for organic, cinematic fluid currents
  vec2 q = vec2(fbm(p, t), fbm(p + vec2(5.2, 1.3), t * 0.9));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2), t * 0.82), fbm(p + 3.0 * q + vec2(8.3, 2.8), t * 0.88));

  // Compute soft atmospheric density field spanning broad areas of viewport
  float f = fbm(p * 0.72 + 2.0 * r, t * 0.68);
  f = clamp((f + 0.48) * 1.12, 0.0, 1.0);

  // Soft blur interpolation curve to create large, diffuse atmospheric fields
  float blurEdge = clamp(u_blur, 0.2, 0.95);
  f = smoothstep(0.06 * (1.0 - blurEdge * 0.4), 0.90 + blurEdge * 0.10, f);

  // Deep obsidian/charcoal foundation
  vec3 col = mix(u_colorBase, u_colorCharcoal, smoothstep(0.0, 0.85, length(p) * 0.45));

  // Secondary wine red & burgundy tones
  vec3 darkRedField = mix(u_colorBurgundy, u_colorCrimson, clamp(r.x * 0.72 + 0.5, 0.0, 1.0));
  darkRedField = mix(darkRedField, u_colorWine, clamp(q.y * 0.80, 0.0, 1.0));

  // Blend red atmospheric field across large sections of the canvas
  col = mix(col, darkRedField, f * u_intensity * 0.95);

  // Broad expansive dark-crimson aura drifting across upper-center
  float auraX = 0.35 * sin(t * 0.38);
  float auraY = -0.18 * cos(t * 0.32) + 0.02;
  float ambientAura = exp(-length((p - vec2(auraX, auraY)) * vec2(0.65, 0.88)) * 0.72);
  col += u_colorCrimson * ambientAura * 0.60 * u_intensity;

  // Broad secondary burgundy aura drifting across lower-lateral field
  float aura2X = -0.45 * cos(t * 0.28);
  float aura2Y = 0.24 * sin(t * 0.35);
  float secondaryAura = exp(-length((p - vec2(aura2X, aura2Y)) * vec2(0.72, 0.84)) * 0.78);
  col += u_colorBurgundy * secondaryAura * 0.55 * u_intensity;

  // Tertiary deep wine current ensuring atmosphere is felt across the page
  float aura3X = 0.45 * cos(t * 0.22 + 1.8);
  float aura3Y = 0.28 * sin(t * 0.26 - 1.2);
  float tertiaryAura = exp(-length(p - vec2(aura3X, aura3Y)) * 0.82);
  col += u_colorWine * tertiaryAura * 0.45 * u_intensity;

  // Contrast adjustment
  col = clamp((col - 0.5) * u_contrast + 0.5, 0.0, 1.0);

  // Brightness adjustment (deep & controlled, never harsh or overpowering)
  col *= u_brightness;

  // Saturation control
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(lum), col, u_saturation);

  // Soft vignette
  float dist = length((uv - 0.5) * vec2(1.0, 1.0 / aspect));
  float vig = smoothstep(1.08, 0.32, dist * u_vignette);
  col *= vig;

  // Subtle 35mm film grain
  float grainNoise = (fract(sin(dot(uv * u_resolution, vec2(12.9898, 78.233)) + fract(u_time * 0.005)) * 43758.5453) - 0.5) * u_grain;
  col = clamp(col + grainNoise, 0.0, 1.0);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function ShaderBackground({
  // Visual palette: deep black, charcoal, dark crimson, deep burgundy, subtle warm red
  colorBase = [0.008, 0.008, 0.010],       // Deep black base
  colorCharcoal = [0.035, 0.020, 0.025],   // Charcoal with slight crimson undertone
  colorCrimson = [0.58, 0.032, 0.052],     // Rich deep crimson (pure, deep, never neon or pink)
  colorBurgundy = [0.38, 0.018, 0.032],    // Deep burgundy
  colorWine = [0.48, 0.026, 0.046],        // Deep dark wine red

  intensity = 1.38,     // High visibility so moving atmosphere is obvious at first glance
  contrast = 1.16,      // Good contrast between dark black base and crimson atmosphere
  blur = 0.88,          // Large, soft atmospheric fields spanning broad areas
  brightness = 1.05,    // Clear illumination without turning neon
  saturation = 1.15,    // Rich crimson/burgundy depth
  vignette = 0.52,      // Subtle lens falloff, leaves edges visible
  grain = 0.028,        // Subtle 35mm film grain
  speed = 0.46,         // Organic, clearly visible continuous movement
  opacity = 0.95,       // Canvas itself is almost fully opaque, showing the shader richly
  className = '',
}) {
  const canvasRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl', { alpha: false, depth: false, antialias: false }) ||
      canvas.getContext('experimental-webgl', { alpha: false, depth: false, antialias: false });

    if (!gl) return;

    // Compile helper
    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPositionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uBaseLoc = gl.getUniformLocation(program, 'u_colorBase');
    const uCharcoalLoc = gl.getUniformLocation(program, 'u_colorCharcoal');
    const uCrimsonLoc = gl.getUniformLocation(program, 'u_colorCrimson');
    const uBurgundyLoc = gl.getUniformLocation(program, 'u_colorBurgundy');
    const uWineLoc = gl.getUniformLocation(program, 'u_colorWine');
    const uIntensityLoc = gl.getUniformLocation(program, 'u_intensity');
    const uContrastLoc = gl.getUniformLocation(program, 'u_contrast');
    const uBlurLoc = gl.getUniformLocation(program, 'u_blur');
    const uBrightnessLoc = gl.getUniformLocation(program, 'u_brightness');
    const uSatLoc = gl.getUniformLocation(program, 'u_saturation');
    const uVigLoc = gl.getUniformLocation(program, 'u_vignette');
    const uGrainLoc = gl.getUniformLocation(program, 'u_grain');
    const uSpeedLoc = gl.getUniformLocation(program, 'u_speed');

    // Static uniform upload
    gl.uniform3fv(uBaseLoc, colorBase);
    gl.uniform3fv(uCharcoalLoc, colorCharcoal);
    gl.uniform3fv(uCrimsonLoc, colorCrimson);
    gl.uniform3fv(uBurgundyLoc, colorBurgundy);
    gl.uniform3fv(uWineLoc, colorWine);
    gl.uniform1f(uIntensityLoc, intensity);
    gl.uniform1f(uContrastLoc, contrast);
    gl.uniform1f(uBlurLoc, blur);
    gl.uniform1f(uBrightnessLoc, brightness);
    gl.uniform1f(uSatLoc, saturation);
    gl.uniform1f(uVigLoc, vignette);
    gl.uniform1f(uGrainLoc, grain);
    gl.uniform1f(uSpeedLoc, speed);

    let animId = null;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Low-overhead scaling: render at half resolution for ultra-high framerate
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const scale = 0.55; // Performant scale factor for soft atmospheric background
      width = Math.floor(window.innerWidth * dpr * scale);
      height = Math.floor(window.innerHeight * dpr * scale);
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uResLoc, width, height);
    };

    resize();
    window.addEventListener('resize', resize);

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const startTime = performance.now();

    const render = (now) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const elapsedSec = prefersReduced ? 10.0 : (now - startTime) * 0.001;
      gl.uniform1f(uTimeLoc, elapsedSec);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReduced) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [
    prefersReduced,
    intensity,
    contrast,
    blur,
    brightness,
    saturation,
    vignette,
    grain,
    speed,
    colorBase,
    colorCharcoal,
    colorCrimson,
    colorBurgundy,
    colorWine,
  ]);

  return (
    <canvas
      ref={canvasRef}
      id="heist-shader-background"
      className={`fixed inset-0 w-full h-full pointer-events-none block z-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}

"use client";
import { useEffect, useRef } from "react";

// Soft drifting colour blobs, drawn at low resolution and upscaled by CSS
// (the upscale gives the blur for free, so it stays cheap while scrolling).
const BLOBS = [
  { c: [223, 236, 238], r: 0.75, sx: 0.00018, sy: 0.00013, px: 0.0, py: 1.2 },
  { c: [150, 200, 208], r: 0.65, sx: 0.00014, sy: 0.00021, px: 2.1, py: 0.4 },
  { c: [96, 140, 156], r: 0.6, sx: 0.00019, sy: 0.00012, px: 4.0, py: 2.6 },
  { c: [238, 214, 196], r: 0.45, sx: 0.00011, sy: 0.00017, px: 1.0, py: 3.3 },
  { c: [58, 84, 100], r: 0.55, sx: 0.00013, sy: 0.00016, px: 5.2, py: 0.9 },
];

export default function HeroGradient() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const W = 160, H = 100;
    canvas.width = W;
    canvas.height = H;
    let raf = 0;
    let visible = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (t: number) => {
      ctx.fillStyle = "#a9c9cf";
      ctx.fillRect(0, 0, W, H);
      for (const b of BLOBS) {
        const x = (0.5 + 0.45 * Math.sin(t * b.sx * 6 + b.px)) * W;
        const y = (0.5 + 0.45 * Math.cos(t * b.sy * 6 + b.py)) * H;
        const rad = b.r * Math.max(W, H);
        const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.95)`);
        g.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    draw(0);
    if (!reduce) raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  return (
    <>
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
      {/* subtle film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }}
      />
    </>
  );
}

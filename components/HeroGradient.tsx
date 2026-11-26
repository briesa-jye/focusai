"use client";
import { useEffect, useRef } from "react";

// Drifting colour blobs drawn at low resolution and upscaled by CSS (the upscale
// is the blur, so it stays cheap). Scroll shifts and rotates the field; the
// pointer pulls the blobs toward it and adds a soft highlight that follows it.
const BLOBS = [
  { c: [226, 238, 240], r: 0.8, sx: 0.00018, sy: 0.00013, px: 0.0, py: 1.2, depth: 0.6, pull: 0.10 },
  { c: [150, 202, 210], r: 0.7, sx: 0.00014, sy: 0.00021, px: 2.1, py: 0.4, depth: 1.0, pull: 0.18 },
  { c: [92, 140, 158], r: 0.65, sx: 0.00019, sy: 0.00012, px: 4.0, py: 2.6, depth: 1.4, pull: 0.25 },
  { c: [242, 216, 196], r: 0.5, sx: 0.00011, sy: 0.00017, px: 1.0, py: 3.3, depth: 0.8, pull: 0.32 },
  { c: [52, 80, 98], r: 0.6, sx: 0.00013, sy: 0.00016, px: 5.2, py: 0.9, depth: 1.8, pull: 0.12 },
  { c: [190, 226, 222], r: 0.45, sx: 0.00021, sy: 0.00010, px: 3.3, py: 5.0, depth: 1.2, pull: 0.40 },
];

export default function HeroGradient() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const W = 240, H = 150;
    canvas.width = W;
    canvas.height = H;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let scroll = 0, scrollT = 0;           // eased scroll progress (0 at top, 1 = one hero height)
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, on: 0, ton: 0 };

    const onScroll = () => { scrollT = Math.min(window.scrollY / Math.max(canvas.clientHeight, 1), 2); };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = (e.clientY - r.top) / r.height;
      mouse.ton = mouse.tx >= 0 && mouse.tx <= 1 && mouse.ty >= 0 && mouse.ty <= 1 ? 1 : 0;
    };
    const onLeave = () => { mouse.ton = 0; };

    const draw = (t: number) => {
      scroll += (scrollT - scroll) * 0.08;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.on += (mouse.ton - mouse.on) * 0.05;

      ctx.fillStyle = "#a9c9cf";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      for (const b of BLOBS) {
        // base drift + scroll parallax (each blob has its own depth) + pointer pull
        let x = 0.5 + 0.42 * Math.sin(t * b.sx * 6 + b.px + scroll * 1.4 * b.depth);
        let y = 0.5 + 0.42 * Math.cos(t * b.sy * 6 + b.py) - scroll * 0.35 * b.depth;
        x += (mouse.x - 0.5) * b.pull * 1.6 * mouse.on;
        y += (mouse.y - 0.5) * b.pull * 1.6 * mouse.on;
        const rad = b.r * Math.max(W, H) * (1 + scroll * 0.15 * b.depth);
        const px = x * W, py = y * H;
        const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.95)`);
        g.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // soft light that trails the cursor
      if (mouse.on > 0.01) {
        const px = mouse.x * W, py = mouse.y * H, rad = 0.28 * Math.max(W, H);
        const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
        g.addColorStop(0, `rgba(255,255,255,${0.55 * mouse.on})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    draw(0);
    if (!reduce) {
      raf = requestAnimationFrame(loop);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }}
      />
    </>
  );
}

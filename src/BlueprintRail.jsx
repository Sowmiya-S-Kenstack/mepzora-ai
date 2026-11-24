import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   HELPERS
========================================= */

// find how far along the path a given y position is (path y never goes up)
function lengthAtY(path, total, y) {
  let lo = 0;
  let hi = total;

  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).y < y) lo = mid;
    else hi = mid;
  }

  return hi;
}

// build the line from the real section positions on the page
function buildGeometry(page) {
  const W = page.offsetWidth;
  const H = page.offsetHeight;
  const pageTop = page.getBoundingClientRect().top + window.scrollY;

  const mobile = W < 700;
  const rail = mobile ? 12 : W < 1100 ? 22 : 36; // distance from screen edge
  const r = mobile ? 18 : 36;                    // corner radius
  const left = rail;
  const right = W - rail;

  const tops = [...page.querySelectorAll("section")].map(
    (s) => s.getBoundingClientRect().top + window.scrollY - pageTop
  );

  const startY = mobile ? 96 : 110;
  const endY = H - 52;

  let d = `M ${left} ${startY}`;
  let side = 0; // 0 = left rail, 1 = right rail

  const nodes = [{ x: left, y: startY, label: "BASE", len: 0 }];

  tops.slice(1).forEach((top, i) => {
    const y = top + (mobile ? 40 : 60);
    const from = side === 0 ? left : right;
    const to = side === 0 ? right : left;
    const dir = to > from ? 1 : -1;

    d += ` V ${y - r}`;
    d += ` Q ${from} ${y} ${from + dir * r} ${y}`;
    d += ` H ${to - dir * r}`;
    d += ` Q ${to} ${y} ${to} ${y + r}`;

    nodes.push({
      x: to,
      y: y + r,
      label: `LVL ${String(i + 1).padStart(2, "0")}`
    });

    side = side === 0 ? 1 : 0;
  });

  const endX = side === 0 ? left : right;
  d += ` V ${endY}`;
  nodes.push({ x: endX, y: endY, label: "DONE" });

  // work out the path length at each node
  const temp = document.createElementNS("http://www.w3.org/2000/svg", "path");
  temp.setAttribute("d", d);
  const total = temp.getTotalLength();

  nodes.forEach((n, i) => {
    if (i > 0) n.len = lengthAtY(temp, total, n.y - 0.5);
  });

  return { W, H, d, nodes };
}

/* =========================================
   COMPONENT
========================================= */

// NOTE: effects (not layout effects) are used on purpose. A child's
// useLayoutEffect runs BEFORE the parent's ref is attached on first mount,
// so pageRef.current would be null and nothing would draw.
export default function BlueprintRail({ pageRef }) {
  const [geo, setGeo] = useState(null);
  const svgRef = useRef(null);
  const headRef = useRef(null);

  // 1) measure the page (and re-measure when it changes size)
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    let raf = 0;

    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const g = buildGeometry(page);
        setGeo((prev) =>
          prev && prev.d === g.d && prev.W === g.W && prev.H === g.H ? prev : g
        );
      });
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(page);
    window.addEventListener("load", measure);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [pageRef]);

  // 2) draw the line while scrolling
  useEffect(() => {
    if (!geo) return;

    const page = pageRef.current;
    const svg = svgRef.current;
    const head = headRef.current;
    if (!page || !svg || !head) return;

    const drawPaths = [...svg.querySelectorAll(".bp-draw")];
    const nodeEls = [...svg.querySelectorAll(".bp-node")];
    const total = drawPaths[0].getTotalLength();

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.set(drawPaths, {
      strokeDasharray: total,
      strokeDashoffset: reduced ? 0 : total
    });

    if (reduced) {
      nodeEls.forEach((n) => n.classList.add("is-on"));
      head.style.display = "none";
      return;
    }

    // start with a head start so the line is already visible on load
    const START = 0.06;

    const update = (p) => {
      const at = total * (START + (1 - START) * p);

      gsap.set(drawPaths, { strokeDashoffset: total - at });

      const pt = drawPaths[0].getPointAtLength(at);
      head.setAttribute("transform", `translate(${pt.x} ${pt.y})`);

      nodeEls.forEach((el, i) => {
        el.classList.toggle("is-on", at >= geo.nodes[i].len - 1);
      });
    };

    const state = { p: 0 };
    update(0);

    const tween = gsap.to(state, {
      p: 1,
      ease: "none",
      onUpdate: () => update(state.p),
      scrollTrigger: {
        trigger: page,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8
      }
    });

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [geo, pageRef]);

  if (!geo) return null;

  return (
    <svg
      ref={svgRef}
      className="blueprint-rail-art"
      width={geo.W}
      height={geo.H}
      viewBox={`0 0 ${geo.W} ${geo.H}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="bpGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2={geo.H}
        >
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2585ff" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>

      {/* faint "plan" line showing where the drawing will go */}
      <path className="bp-ghost" d={geo.d} />

      {/* glow + main line (both are drawn by scroll) */}
      <path className="bp-draw bp-glow" d={geo.d} />
      <path className="bp-draw bp-line" d={geo.d} />

      {/* level markers */}
      {geo.nodes.map((n, i) => {
        const onLeft = n.x < geo.W / 2;

        return (
          <g
            key={i}
            className="bp-node"
            transform={`translate(${n.x} ${n.y})`}
          >
            <circle className="bp-ring" r="14" />
            <circle className="bp-dot" r="5" />
            <text
              className="bp-label"
              x={onLeft ? 20 : -20}
              y="4"
              textAnchor={onLeft ? "start" : "end"}
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* glowing drawing head that follows the tip */}
      <g ref={headRef} className="bp-head">
        <circle className="bp-halo" r="16" />
        <circle className="bp-core" r="5.5" />
      </g>
    </svg>
  );
}
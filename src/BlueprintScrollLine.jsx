import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   SVG + GSAP SCROLL BLUEPRINT
   (your original architectural line)
========================================= */

export default function BlueprintScrollLine({ pageRef }) {
  const lineRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    const line = lineRef.current;

    if (!page || !line) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const length = line.getTotalLength();

    gsap.set(line, {
      strokeDasharray: length,
      strokeDashoffset: reducedMotion ? 0 : length
    });

    if (reducedMotion) return;

    const context = gsap.context(() => {
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: page,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });
    }, page);

    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, [pageRef]);

  return (
    <svg
      className="blueprint-scroll-art"
      viewBox="0 0 1440 6000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="blueprintGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>

        <filter id="blueprintGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main architectural line */}
      <path
        ref={lineRef}
        d="
          M 115 0
          L 115 350
          C 115 430, 240 430, 240 520
          L 240 850
          C 240 960, 1320 900, 1320 1080
          L 1320 1450
          C 1320 1550, 1180 1550, 1180 1650
          L 1180 2050
          C 1180 2180, 115 2100, 115 2310
          L 115 2700
          C 115 2800, 260 2800, 260 2900
          L 260 3300
          C 260 3400, 1320 3350, 1320 3500
          L 1320 3900
          C 1320 4050, 115 3950, 115 4150
          L 115 4550
          C 115 4700, 1180 4600, 1180 4800
          L 1180 5200
          L 1180 6000
        "
        fill="none"
        stroke="url(#blueprintGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#blueprintGlow)"
        opacity="0.85"
      />

      {/* Glowing technical markers */}
      {[
        { x: 240, y: 520 },
        { x: 1320, y: 1080 },
        { x: 1180, y: 1650 },
        { x: 115, y: 2310 },
        { x: 260, y: 2900 },
        { x: 1320, y: 3500 },
        { x: 115, y: 4150 },
        { x: 1180, y: 4800 }
      ].map((point, index) => (
        <motion.g
          key={index}
          animate={{
            opacity: [0.35, 1, 0.35],
            scale: [0.85, 1.15, 0.85]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.2
          }}
          style={{
            transformOrigin: `${point.x}px ${point.y}px`
          }}
        >
          <circle
            cx={point.x}
            cy={point.y}
            r="13"
            fill="rgba(37,133,255,0.12)"
          />
          <circle
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#2585ff"
          />
        </motion.g>
      ))}

      {/* Measurement marks */}
      {[850, 2050, 3300, 4550].map((position) => (
        <g key={position} opacity="0.7">
          <path
            d={`M 95 ${position} L 135 ${position}`}
            stroke="#60a5fa"
            strokeWidth="2"
          />
          <path
            d={`M 105 ${position - 8} L 105 ${position + 8}`}
            stroke="#60a5fa"
            strokeWidth="1"
          />
        </g>
      ))}
    </svg>
  );
}
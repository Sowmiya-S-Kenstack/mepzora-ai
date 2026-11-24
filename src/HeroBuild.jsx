/* =========================================
   HERO BUILD ANIMATION
   A tower wireframe draws itself floor by floor
   while a tower crane lifts a steel beam into place.
   Pure SVG + CSS (see the .hero-build styles in App.css)
========================================= */

const COLS = [200, 267, 333, 400];
const GROUND = 580;
const FLOOR_H = 56;
const FLOORS = 8;
const TOP = GROUND - FLOOR_H * FLOORS; // 132

// zig-zag lattice for the crane mast
const mastPoints = [];
for (let y = GROUND, i = 0; y >= 60; y -= 52, i++) {
  mastPoints.push(`${i % 2 === 0 ? 122 : 138} ${y}`);
}
const mastPath = `M ${mastPoints.join(" L ")}`;

const timing = (delay, duration = 0.8) => ({
  "--d": `${delay}s`,
  "--t": `${duration}s`
});

export default function HeroBuild() {
  return (
    <div className="hero-build" aria-hidden="true">
      <svg viewBox="0 0 520 620" width="100%" height="100%">

        {/* ground */}
        <line
          className="hb-draw hb-ground"
          x1="70" y1={GROUND} x2="480" y2={GROUND}
          pathLength="1"
          style={timing(0.2, 1)}
        />

        {/* columns (drawn bottom to top) */}
        {COLS.map((x, i) => (
          <line
            key={x}
            className="hb-draw hb-main"
            x1={x} y1={GROUND} x2={x} y2={TOP}
            pathLength="1"
            style={timing(0.6 + i * 0.1, 3.4)}
          />
        ))}

        {/* floors + bracing, one level at a time */}
        {Array.from({ length: FLOORS }, (_, i) => {
          const y = GROUND - FLOOR_H * (i + 1);
          const yBelow = GROUND - FLOOR_H * i;
          const bay = i % 3;
          const delay = 0.8 + i * 0.4;

          return (
            <g key={i}>
              <line
                className="hb-draw hb-main"
                x1={COLS[0]} y1={y} x2={COLS[3]} y2={y}
                pathLength="1"
                style={timing(delay, 0.6)}
              />
              <line
                className="hb-draw hb-thin"
                x1={COLS[bay]} y1={yBelow}
                x2={COLS[bay + 1]} y2={y}
                pathLength="1"
                style={timing(delay + 0.25, 0.5)}
              />
              <line
                className="hb-draw hb-thin"
                x1={COLS[bay + 1]} y1={yBelow}
                x2={COLS[bay]} y2={y}
                pathLength="1"
                style={timing(delay + 0.35, 0.5)}
              />
            </g>
          );
        })}

        {/* crane mast */}
        <line
          className="hb-draw hb-main"
          x1="122" y1={GROUND} x2="122" y2="60"
          pathLength="1"
          style={timing(0.4, 2.4)}
        />
        <line
          className="hb-draw hb-main"
          x1="138" y1={GROUND} x2="138" y2="60"
          pathLength="1"
          style={timing(0.4, 2.4)}
        />
        <path
          className="hb-draw hb-thin"
          d={mastPath}
          pathLength="1"
          style={timing(0.6, 2.4)}
        />

        {/* jib, counter jib and support cables */}
        <line
          className="hb-draw hb-main"
          x1="50" y1="60" x2="430" y2="60"
          pathLength="1"
          style={timing(2.6, 1)}
        />
        <line
          className="hb-draw hb-thin"
          x1="130" y1="14" x2="430" y2="60"
          pathLength="1"
          style={timing(3.1, 0.8)}
        />
        <line
          className="hb-draw hb-thin"
          x1="130" y1="14" x2="50" y2="60"
          pathLength="1"
          style={timing(3.1, 0.8)}
        />
        <line
          className="hb-draw hb-thin"
          x1="130" y1="14" x2="130" y2="60"
          pathLength="1"
          style={timing(3.1, 0.5)}
        />
        <rect
          className="hb-fade hb-weight"
          x="50" y="60" width="34" height="24"
          style={timing(3.6, 0.6)}
        />

        {/* hanging steel beam (swings gently) */}
        <g className="hb-fade" style={timing(3.8, 0.8)}>
          <g className="hb-swing">
            <line className="hb-cable" x1="330" y1="60" x2="330" y2="100" />
            <line className="hb-cable" x1="330" y1="100" x2="302" y2="116" />
            <line className="hb-cable" x1="330" y1="100" x2="358" y2="116" />
            <rect className="hb-beam" x="296" y="116" width="68" height="9" />
          </g>
        </g>

        {/* height dimension */}
        <g className="hb-fade" style={timing(3.9, 0.8)}>
          <line className="hb-dim" x1="455" y1={GROUND} x2="455" y2={TOP} />
          <line className="hb-dim" x1="445" y1={GROUND} x2="465" y2={GROUND} />
          <line className="hb-dim" x1="445" y1={TOP} x2="465" y2={TOP} />
          <text
            className="hb-text"
            x="478"
            y={(GROUND + TOP) / 2}
            transform={`rotate(90 478 ${(GROUND + TOP) / 2})`}
            textAnchor="middle"
          >
            H 48.0 M
          </text>
        </g>

        {/* pulsing markers on the column tops */}
        {COLS.map((x, i) => (
          <circle
            key={x}
            className="hb-node hb-fade"
            cx={x} cy={TOP} r="4.5"
            style={timing(4.2 + i * 0.12, 0.5)}
          />
        ))}
      </svg>
    </div>
  );
}
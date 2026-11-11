"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.65, 0, 0.35, 1] as const;
const RUN = "M130 70 C130 300 320 420 500 420 C680 420 870 300 870 70";
const DUR = 7;

/**
 * The pig run: an arc from the launcher to the receiver that dips through the call to
 * action. It draws itself in, then a glowing pig travels it on a loop, lighting the line
 * behind it. With reduced motion the pig rests at the bottom of the arc.
 */
export function HeroArc() {
  const reduce = useReducedMotion();
  const spline = {
    calcMode: "spline",
    keyTimes: "0;1",
    keySplines: "0.45 0 0.55 1",
  } as const;

  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-[1000/420] w-[min(860px,100%,max(280px,calc((100svh-600px)*2.38)))]"
    >
      <svg
        viewBox="0 0 1000 420"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <radialGradient id="pig-glow">
            <stop offset="0" stopColor="#ff4f86" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ff4f86" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.path
          d={RUN}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.9, ease }}
        />

        {!reduce && (
          <g opacity="0">
            <set attributeName="opacity" to="1" begin="3.2s" />
            {/* lit trail */}
            <path
              d={RUN}
              pathLength={1}
              fill="none"
              stroke="#ff4f86"
              strokeWidth="2"
              strokeDasharray="1 1"
              strokeLinecap="round"
              opacity="0.85"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="1;0"
                dur={`${DUR}s`}
                begin="3.2s"
                repeatCount="indefinite"
                {...spline}
              />
              <animate
                attributeName="opacity"
                values="0.85;0.85;0"
                keyTimes="0;0.85;1"
                dur={`${DUR}s`}
                begin="3.2s"
                repeatCount="indefinite"
              />
            </path>
            {/* pig */}
            <g>
              <animateMotion
                dur={`${DUR}s`}
                begin="3.2s"
                repeatCount="indefinite"
                path={RUN}
                rotate="auto"
                keyPoints="0;1"
                {...spline}
              />
              <circle r="34" fill="url(#pig-glow)" />
              <rect
                x="-13"
                y="-5.5"
                width="26"
                height="11"
                rx="5.5"
                fill="#ff4f86"
              />
            </g>
          </g>
        )}
        {reduce && (
          <g transform="translate(500 420)">
            <circle r="34" fill="url(#pig-glow)" />
            <rect
              x="-13"
              y="-5.5"
              width="26"
              height="11"
              rx="5.5"
              fill="#ff4f86"
            />
          </g>
        )}

        {[
          { x: 130, label: "Launcher" },
          { x: 870, label: "Receiver" },
        ].map((p, n) => (
          <motion.g
            key={p.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 + n * 0.2, duration: 0.6 }}
          >
            <circle cx={p.x} cy="70" r="5" fill="white" />
            <circle
              cx={p.x}
              cy="70"
              r="5"
              fill="none"
              stroke="white"
              strokeOpacity="0.6"
            >
              {!reduce && (
                <animate
                  attributeName="r"
                  values="5;16"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              )}
              {!reduce && (
                <animate
                  attributeName="stroke-opacity"
                  values="0.6;0"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </motion.g>
        ))}
      </svg>
      {["Launcher", "Receiver"].map((label, n) => (
        <motion.span
          key={label}
          className={`absolute top-[16.7%] -translate-x-1/2 -translate-y-[calc(100%+14px)] text-[14px] text-white sm:text-[16px] ${n ? "left-[87%]" : "left-[13%]"}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 + n * 0.2, duration: 0.6 }}
        >
          {label}
        </motion.span>
      ))}
    </div>
  );
}

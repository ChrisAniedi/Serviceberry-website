/**
 * Light moving through the hero's grid: comets run down the two column lines and along the
 * row lines, and the crossings pulse softly, so the grid reads like live pipework. The
 * columns are 1fr / 2.6fr / 1fr, so the lines sit at 1/4.6 and 3.6/4.6 of the width.
 * CSS keyframes (globals.css); the reduced-motion rule stops them.
 */
const LEFT = "21.739%";
const RIGHT = "78.261%";
const ROW = "max(calc(100svh - 64px), 700px)";

export function HeroGridFlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block">
      {/* down the column lines */}
      {[
        { left: LEFT, delay: "0s", dur: "7s" },
        { left: RIGHT, delay: "2.6s", dur: "8s" },
        { left: LEFT, delay: "4.4s", dur: "9s" },
        { left: RIGHT, delay: "6.1s", dur: "7.5s" },
      ].map((c, i) => (
        <span key={i} className="grid-comet-y absolute top-0 h-[180px] w-px -translate-x-1/2" style={{ left: c.left, animationDelay: c.delay, animationDuration: c.dur }} />
      ))}

      {/* along the row line under the buttons, and under the header */}
      <span className="grid-comet-x absolute left-0 h-px w-[220px]" style={{ top: ROW, animationDuration: "9s" }} />
      <span className="grid-comet-x-rev absolute left-0 h-px w-[220px]" style={{ top: ROW, animationDuration: "11s", animationDelay: "3s" }} />
      <span className="grid-comet-x absolute top-[74px] left-0 h-px w-[160px] opacity-60" style={{ animationDuration: "12s", animationDelay: "1.5s" }} />

      {/* the crossings */}
      {[LEFT, RIGHT].flatMap((x) => [
        <span key={`${x}-r`} className="grid-node absolute size-[7px] -translate-1/2 rounded-full" style={{ left: x, top: ROW }} />,
        <span key={`${x}-h`} className="grid-node absolute top-[74px] size-[5px] -translate-1/2 rounded-full [animation-delay:1.2s]" style={{ left: x }} />,
      ])}
    </div>
  );
}

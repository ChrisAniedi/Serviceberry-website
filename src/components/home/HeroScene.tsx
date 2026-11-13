import Image from "next/image";
import { img } from "@/content/images";
import { site } from "@/content/site";

/**
 * The hero photo, brought to life. A box is sized exactly like `object-cover` would size the
 * photo, so the overlays can be placed in the photo's own coordinates (percent of the image):
 * a gas flare on a boom off the left of the deck, a blinking warning light on the derrick and
 * the crane, smoke drifting downwind, haze moving across the sky and light glinting on the sea.
 * The whole scene pushes in slowly. All motion is CSS keyframes (globals.css), which the reduced-motion rule stops.
 */
export function HeroScene() {
  return (
    <div
      className="absolute top-[58%] left-1/2 aspect-[2000/1333] -translate-x-1/2 -translate-y-[58%]"
      style={{ width: "max(100%, calc(max(100svh, 760px) * 1.5004))", height: "max(100%, calc(100vw / 1.5004))" }}
    >
      <div className="anim-push absolute inset-0 origin-[35%_55%]">
      {site.heroVideo ? (
        <video className="h-full w-full object-cover" src={site.heroVideo} poster={img.chapterInspect} autoPlay muted loop playsInline aria-hidden />
      ) : (
        <Image src={img.chapterInspect} alt="Offshore platform at dusk" fill priority sizes="100vw" className="object-cover [filter:grayscale(0.55)_contrast(1.18)_brightness(0.78)]" />
      )}

      {/* brand grade: the dusk photo re-toned into a blue hour, deep blue overhead easing to royal
          blue at the horizon, keeping the photo's own light and shadow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#003198_0%,#074cbd_48%,#1d63d6_62%,#003198_100%)] opacity-70 mix-blend-color" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,58,0.8)_0%,rgba(18,34,72,0.5)_26%,rgba(30,50,100,0.18)_48%,rgba(10,20,48,0.5)_100%)] mix-blend-multiply" />

      {!site.heroVideo && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* haze drifting across the sky */}
          <div className="anim-drift absolute top-[8%] left-[-20%] h-[30%] w-[70%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(190,212,255,0.18),transparent)] blur-2xl" />
          <div className="anim-drift-rev absolute top-[30%] right-[-25%] h-[24%] w-[60%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(150,185,255,0.16),transparent)] blur-2xl" />

          {/* flare boom, in the blue silhouette colour and softened like the rest of the rig */}
          <svg viewBox="0 0 2000 1333" className="absolute inset-0 h-full w-full">
            <defs>
              <filter id="haze-soft" x="-5%" y="-5%" width="110%" height="110%">
                <feGaussianBlur stdDeviation="1.1" />
              </filter>
            </defs>
            <g filter="url(#haze-soft)" opacity="0.85">
              <path d="M672 792 L566 712" stroke="rgb(8,26,72)" strokeWidth="4" strokeLinecap="round" />
              <path d="M672 805 L572 722" stroke="rgb(8,26,72)" strokeWidth="2" opacity="0.7" />
              {[0.3, 0.6].map((t) => (
                <path key={t} d={`M${672 - 106 * t} ${792 - 80 * t} L${672 - 100 * t} ${805 - 83 * t}`} stroke="rgb(8,26,72)" strokeWidth="1.6" opacity="0.6" />
              ))}
            </g>
          </svg>

          {/* the light the flare throws over the scene: cool white with a trace of berry, breathing with it */}
          <div className="anim-glow absolute top-[53.4%] left-[28.3%] size-[900px] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(200,215,255,0.14),rgba(255,140,165,0.04)_55%,transparent)] mix-blend-screen" />

          {/* the flare: big enough to read from across the deck, glowing into the haze */}
          <div className="absolute top-[53.4%] left-[28.3%] h-0 w-0">
            <span className="anim-glow absolute -top-[150px] -left-[150px] size-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(215,228,255,0.32),rgba(255,140,165,0.1)_45%,transparent)] mix-blend-screen" />
            <span className="anim-glow-fast absolute -top-[70px] -left-[60px] size-[120px] rounded-full bg-[radial-gradient(closest-side,rgba(245,248,255,0.45),rgba(255,160,182,0.16)_50%,transparent)] mix-blend-screen" />
            <span className="anim-shimmer absolute bottom-0 left-0 block h-[88px] w-[36px] -translate-x-1/2 origin-bottom -rotate-[18deg]">
              <span className="anim-flame-a absolute inset-x-[-18%] bottom-0 h-full origin-bottom rounded-[50%_50%_45%_45%/70%_70%_30%_30%] bg-[linear-gradient(to_top,#3f7dff,#d9475f_32%,rgba(240,110,135,0))] opacity-75 blur-[4px]" />
              <span className="anim-flame-b absolute inset-x-0 bottom-0 h-[86%] origin-bottom rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-[linear-gradient(to_top,#7fa8ff,#ff7f95_38%,rgba(255,170,190,0))] blur-[1.5px]" />
              <span className="anim-flame-d absolute inset-x-[14%] bottom-0 h-[64%] origin-bottom rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-[linear-gradient(to_top,#eaf1ff,#ffd3dc_55%,rgba(255,236,242,0))] blur-[1px]" />
              <span className="anim-flame-c absolute inset-x-[30%] bottom-0 h-[38%] origin-bottom rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-white blur-[0.8px]" />
            </span>
            {/* embers lifting off the tip */}
            {[0, 0.7, 1.4, 2.1, 2.8, 3.5].map((d, k) => (
              <span
                key={d}
                className="anim-ember absolute -top-[40px] size-[3px] rounded-full bg-[#ffdbe3] shadow-[0_0_6px_2px_rgba(255,140,165,0.7)]"
                style={{ left: `${-18 + k * 5}px`, animationDelay: `${d}s` }}
              />
            ))}
            {/* a veil of the same haze over the flame, so it sits in the air like the rig does */}
            <span className="absolute -top-[80px] -left-[40px] size-[90px] rounded-full bg-[rgba(140,175,255,0.1)] blur-[16px]" />
            {/* smoke carried downwind */}
            {[0, 1.3, 2.6, 3.9, 5.2].map((d) => (
              <span
                key={d}
                className="anim-smoke absolute -top-[110px] -left-[16px] size-[46px] rounded-full bg-[rgba(110,130,185,0.2)] blur-[18px]"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </div>

          {/* the flare's reflection on the sea, flickering */}
          <div className="anim-glow-fast absolute top-[72%] left-[28.3%] h-[22%] w-[90px] -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(225,235,255,0.5),rgba(255,150,175,0.14)_60%,transparent)] blur-[6px] mix-blend-screen [mask-image:repeating-linear-gradient(180deg,#000_0_4px,transparent_4px_8px)]" />

          {/* warning lights */}
          <span className="anim-blink absolute top-[30.4%] left-[50.6%] size-[6px] -translate-1/2 rounded-full bg-[#ff3b3b] shadow-[0_0_12px_4px_rgba(255,60,60,0.75)]" />
          <span className="anim-blink absolute top-[41%] left-[62.6%] size-[5px] -translate-1/2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] [animation-delay:0.8s]" />

          {/* light on the water */}
          <div className="absolute inset-x-0 top-[71.5%] bottom-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
            <div className="anim-glint absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0_9px,rgba(190,215,255,0.18)_9px_10px,transparent_10px_23px)] [mask-image:radial-gradient(60%_80%_at_50%_0%,black,transparent)]" />
            <div className="anim-glint-rev absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_40px,rgba(205,225,255,0.15)_40px_44px,transparent_44px_120px)] mix-blend-screen [mask-image:radial-gradient(50%_70%_at_50%_0%,black,transparent)]" />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

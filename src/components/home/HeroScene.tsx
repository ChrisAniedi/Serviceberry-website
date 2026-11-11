import Image from "next/image";
import { img } from "@/content/images";
import { site } from "@/content/site";

/**
 * The hero photo, brought to life. A box is sized exactly like `object-cover` would size the
 * photo, so the overlays can be placed in the photo's own coordinates (percent of the image):
 * a gas flare on a boom off the left of the deck, a blinking warning light on the derrick and
 * the crane, smoke drifting downwind, haze moving across the sky and light glinting on the sea.
 * All motion is CSS keyframes (globals.css), which the reduced-motion rule stops.
 */
export function HeroScene() {
  return (
    <div
      className="absolute top-[58%] left-1/2 aspect-[2000/1333] -translate-x-1/2 -translate-y-[58%]"
      style={{ width: "max(100%, calc(max(100svh, 760px) * 1.5004))", height: "max(100%, calc(100vw / 1.5004))" }}
    >
      {site.heroVideo ? (
        <video className="h-full w-full object-cover" src={site.heroVideo} poster={img.chapterInspect} autoPlay muted loop playsInline aria-hidden />
      ) : (
        <Image src={img.chapterInspect} alt="Offshore platform at dusk" fill priority sizes="100vw" className="object-cover" />
      )}

      {!site.heroVideo && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* haze drifting across the sky */}
          <div className="anim-drift absolute top-[8%] left-[-20%] h-[30%] w-[70%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,236,200,0.35),transparent)] blur-2xl" />
          <div className="anim-drift-rev absolute top-[30%] right-[-25%] h-[24%] w-[60%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,214,160,0.3),transparent)] blur-2xl" />

          {/* flare boom, drawn in the silhouette colour */}
          <svg viewBox="0 0 2000 1333" className="absolute inset-0 h-full w-full">
            <path d="M672 790 L552 702" stroke="rgba(58,38,14,0.92)" strokeWidth="5" strokeLinecap="round" />
            <path d="M672 806 L560 714" stroke="rgba(58,38,14,0.75)" strokeWidth="2.5" />
            {[0.25, 0.5, 0.75].map((t) => (
              <path key={t} d={`M${672 - 120 * t} ${790 - 88 * t} L${672 - 112 * t} ${806 - 92 * t}`} stroke="rgba(58,38,14,0.7)" strokeWidth="2" />
            ))}
          </svg>

          {/* the flare */}
          <div className="absolute top-[52.6%] left-[27.6%] h-0 w-0">
            <span className="anim-glow absolute -top-[110px] -left-[110px] size-[220px] rounded-full bg-[radial-gradient(closest-side,rgba(255,170,70,0.6),rgba(255,120,40,0.18)_55%,transparent)] mix-blend-screen" />
            <span className="absolute bottom-0 left-0 block h-[58px] w-[30px] -translate-x-1/2 origin-bottom -rotate-[16deg]">
              <span className="anim-flame-a absolute inset-x-0 bottom-0 h-full origin-bottom rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-[linear-gradient(to_top,#ff5a14,#ff8a2a_45%,rgba(255,170,60,0.0))] blur-[1.5px]" />
              <span className="anim-flame-b absolute inset-x-[18%] bottom-0 h-[72%] origin-bottom rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-[linear-gradient(to_top,#ffb347,#ffd27a_55%,rgba(255,230,160,0))] blur-[1px]" />
              <span className="anim-flame-c absolute inset-x-[34%] bottom-0 h-[42%] origin-bottom rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-[#fff3d1] blur-[1px]" />
            </span>
            {/* smoke carried downwind */}
            {[0, 1.6, 3.2, 4.8].map((d) => (
              <span
                key={d}
                className="anim-smoke absolute -top-[60px] -left-[10px] size-[34px] rounded-full bg-[rgba(80,58,34,0.2)] blur-[11px]"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </div>

          {/* warning lights */}
          <span className="anim-blink absolute top-[30.4%] left-[50.6%] size-[6px] -translate-1/2 rounded-full bg-[#ff3b3b] shadow-[0_0_12px_4px_rgba(255,60,60,0.75)]" />
          <span className="anim-blink absolute top-[41%] left-[62.6%] size-[5px] -translate-1/2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] [animation-delay:0.8s]" />

          {/* light on the water */}
          <div className="absolute inset-x-0 top-[71.5%] bottom-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
            <div className="anim-glint absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0_9px,rgba(255,214,150,0.16)_9px_10px,transparent_10px_23px)] [mask-image:radial-gradient(60%_80%_at_50%_0%,black,transparent)]" />
            <div className="anim-glint-rev absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_40px,rgba(255,230,180,0.14)_40px_44px,transparent_44px_120px)] mix-blend-screen [mask-image:radial-gradient(50%_70%_at_50%_0%,black,transparent)]" />
          </div>
        </div>
      )}
    </div>
  );
}

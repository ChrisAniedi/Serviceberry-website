"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";

/** Equipment photos: one large and the rest below; any of them opens full screen. */
export function EquipmentGallery({ title, photos }: { title: string; photos: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = photos.map((src, i) => ({ src, label: `${title}, view ${i + 1}` }));
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {items.map((it, i) => (
          <button
            key={it.src + i}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`View ${it.label} full size`}
            className={`group relative cursor-zoom-in overflow-hidden rounded-[26px] bg-mist ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"}`}
          >
            <Image src={it.src} alt={it.label} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]" />
            <span className="absolute top-3 right-3 grid size-10 scale-75 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-lg transition-[opacity,scale] duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
              <Maximize2 className="size-4" />
            </span>
          </button>
        ))}
      </div>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}

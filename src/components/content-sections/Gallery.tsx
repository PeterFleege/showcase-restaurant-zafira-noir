// src/components/content-sections/Gallery.tsx

"use client";

import { useEffect, useRef } from "react";
import Photo from "../functional/Photo";
import { gallery } from "@/data/gallery";

// Vertical scrolling drives a horizontal film strip while the section stays pinned.
export default function Gallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current,
      tr = track.current;
    if (!el || !tr) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      const max = Math.max(0, tr.scrollWidth - innerWidth);
      tr.style.transform = `translate3d(${-p * max}px,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={section}
      id="gallery"
      className="relative h-[320vh]"
      aria-label="Gallery"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <h2 className="mb-10 px-6 font-display text-5xl font-light md:px-12 md:text-7xl">
          Come for dinner.
          <br />
          <span className="pl-[3vw] italic text-amber-500">
            Stay for the night.
          </span>
        </h2>
        <div
          ref={track}
          className="flex w-max items-end gap-6 px-6 will-change-transform md:gap-10 md:px-12"
        >
          {gallery.map((g) => (
            <figure
              key={g.id}
              data-cursor
              className={`group relative aspect-3/4 shrink-0 overflow-hidden ${g.height} max-h-[62svh]`}
            >
              <Photo
                {...g}
                sizes="40vw"
                className="transition-transform duration-1400 ease-silk group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/30 transition-opacity duration-700 group-hover:opacity-0" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-4 bg-linear-to-t from-ink/90 to-transparent p-5 font-display text-xl italic opacity-0 transition-all duration-700 ease-silk group-hover:translate-y-0 group-hover:opacity-100">
                {g.description}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

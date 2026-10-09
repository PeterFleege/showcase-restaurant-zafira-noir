// src/components/content-sections/Hero.tsx

"use client";

import { useEffect, useState } from "react";
import { slides } from "@/data/slides";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1400 ${
            activeSlide === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={activeSlide !== index}
        >
          <div
            className="absolute inset-0 scale-[1.03] bg-cover bg-center transition-transform duration-7000"
            style={{ backgroundImage: `url("${slide.image}")` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,5,.8)_0%,rgba(8,7,5,.28)_58%,rgba(8,7,5,.52)_100%)]" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/20" />
        </div>
      ))}

      <div className="relative mx-auto flex min-h-screen max-w-360 flex-col justify-end px-5 pb-20 md:px-10 md:pb-24">
        <div className="max-w-4xl">
          <p className="mb-6 text-[10px] uppercase tracking-[0.42em] md:text-xs">
            Nordic dining · Helsinki
          </p>
          <h1 className="font-display text-[clamp(3rem,9vw,8rem)] font-light leading-[.78] tracking-[-0.055em]">
            Experience
            <br />
            <span className="ml-[6vw] italic text-amber-500">
              the Northern Taste.
            </span>
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-7 text-paper/65 md:text-base">
              A candle-lit dining room where the warmth of the Northern heart
              meets the quiet precision of our Nordic hospitality.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 right-5 flex items-center gap-4 md:right-10">
          <span className="font-mono text-[10px] text-white">
            0{activeSlide + 1} / 0{slides.length}
          </span>
          <div className="flex gap-1">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                onClick={() => setActiveSlide(index)}
                className={`h-1 transition-all duration-500 hover:cursor-pointer ${
                  activeSlide === index
                    ? "w-12 bg-amber-500"
                    : "w-5 bg-stone-400/30"
                }`}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

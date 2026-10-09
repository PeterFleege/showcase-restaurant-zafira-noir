"use client";
import { useState } from "react";
import Photo from "../functional/Photo";
import Reveal from "../functional/Reveal";
import { dishes } from "@/data/dishes";

export default function MenuShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section id="menu" className="bg-stone-900 py-28 md:py-44">
      <div className="mx-auto grid max-w-375 gap-16 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-7">
          <Reveal className="font-display text-5xl font-light md:text-7xl">
            This season{" "}
            <span className="italic text-amber-500">at the hearth</span>
          </Reveal>
          <Reveal className="mt-6 max-w-md text-parchment/60">
            Choose à la carte, or let us cook for you: five courses at 95 €,
            with wine pairing at 65 €.
          </Reveal>

          <ul className="mt-16" onMouseLeave={() => setActive(0)}>
            {dishes.map((d, n) => (
              <li key={d.name}>
                <button
                  onMouseEnter={() => setActive(n)}
                  onFocus={() => setActive(n)}
                  className={`group flex w-full items-baseline justify-between gap-6 border-t border-brass/20 py-7 text-left transition-all duration-700 ease-silk ${active === n ? "pl-4 opacity-100" : "opacity-45"}`}
                >
                  <span>
                    <span className="block font-display text-3xl md:text-4xl">
                      {d.name}
                    </span>
                    <span className="mt-2 block text-sm text-parchment/60">
                      {d.note}
                    </span>
                  </span>
                  <span className="font-display text-2xl text-brass">
                    {d.price} €
                  </span>
                </button>
              </li>
            ))}
            <li className="border-t border-brass/20" />
          </ul>
          <a
            href="#reserve"
            className="link-line mt-10 inline-block pb-1 text-brass"
          >
            Book the tasting menu
          </a>
        </div>

        {/* Sticky preview: crossfades to the dish you point at */}
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-28 aspect-3/4 overflow-hidden">
            {dishes.map((d, n) => (
              <div
                key={d.name}
                className={`absolute inset-0 transition-all duration-1100 ease-silk ${active === n ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
              >
                <Photo src={d.src} alt={d.name} tone={d.tone} sizes="35vw" />
              </div>
            ))}
            <div className="absolute inset-0 ring-1 ring-inset ring-brass/30" />
          </div>
        </div>
      </div>
    </section>
  );
}

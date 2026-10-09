// src/components/navigation/Navbar.tsx

"use client";

import { useEffect, useState } from "react";
import links from "@/data/nav-links";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-linear-180 transition-all duration-500 ${
          scrolled
            ? "py-3 from-olive-600/20 via-amber-50/70 to-stone-800/30 backdrop-blur-xl"
            : "from-olive-700/90 via-amber-50 to-stone-800/50 py-6"
        }`}
      >
        <div className="mx-auto flex max-w-360 items-center justify-between px-5 md:px-10">
          <a
            href="#"
            className={`font-display tracking-[0.18em] text-black text-shadow-xs text-shadow-white ${
              scrolled ? "text-3xl" : "text-4xl"
            }`}
            aria-label="Zafira Noir home"
          >
            ZAF
            <span
              className={`${scrolled ? "text-amber-700" : "text-amber-500"}`}
            >
              Ï
            </span>
            RA NOIR
          </a>

          <nav className="items-center gap-9 text-md uppercase tracking-[0.24em] md:flex">
            {links.map((link) => (
              <a
                key={link.id}
                className={`hover:font-medium hover:underline hover:decoration-amber-500 hover:decoration-2 underline-offset-4 ${scrolled ? "text-black" : "text-stone-950"}`}
                href={`#${link.id}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#"
            className={`text-stone-950 px-5 border-2 border-stone-950/30 bg-linear-180 from-olive-700/20 via-amber-50/50 to-stone-800/20 rounded-lg text-xs uppercase tracking-[0.22em] transition md:block hover:bg-olive-600/40 hover:font-medium hover:px-4.25 hover:border-amber-100 ${scrolled ? "py-1.5" : "py-2.5"}`}
          >
            Book a table
          </a>
        </div>
      </header>
    </>
  );
}

// src/components/navigation/Navbar.tsx

"use client";

import { useEffect, useState } from "react";
import links from "@/data/nav-links";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scrolling while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // While open: close on Escape, or if the window grows past the mobile breakpoint
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 48rem)"); // Tailwind's md
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

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
            onClick={() => setOpen(false)}
            className={`font-display tracking-[0.18em] text-black text-shadow-xs text-shadow-white ${
              scrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
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

          {/* Desktop links: hidden below lg */}
          <nav className="hidden items-center gap-9 text-sm xl:text-base uppercase tracking-[0.24em] lg:flex">
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

          {/* Desktop button: hidden below lg */}
          <a
            href="#"
            className={`hidden text-stone-950 px-5 border-2 border-stone-950/30 bg-linear-180 from-olive-700/20 via-amber-50/50 to-stone-800/20 rounded-lg text-xs uppercase tracking-[0.22em] transition lg:block hover:bg-olive-600/40 hover:font-medium hover:px-4.25 hover:border-amber-100 ${scrolled ? "py-1.5" : "py-2.5"}`}
          >
            Book a table
          </a>

          {/* Hamburger: visible below md only */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="relative grid h-11 w-11 place-items-center lg:hidden"
          >
            <span
              className={`absolute h-0.5 w-7 rounded-full bg-stone-950 transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-7 rounded-full bg-stone-950 transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu: a sibling of the header, NOT a child of it */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-amber-50/95 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {links.map((link, i) => (
          <div
            key={link.id}
            style={{ transitionDelay: open ? `${100 + i * 70}ms` : "0ms" }}
            className={`transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <a
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="font-display text-4xl uppercase tracking-[0.18em] text-stone-950 transition-colors hover:text-amber-700"
            >
              {link.label}
            </a>
          </div>
        ))}

        <a
          href="#"
          onClick={() => setOpen(false)}
          className="mt-4 rounded-lg border-2 border-stone-950/30 px-8 py-3 text-xs uppercase tracking-[0.22em] text-stone-950 transition-colors hover:border-amber-500 hover:bg-olive-600/20"
        >
          Book a table
        </a>
      </div>
    </>
  );
}

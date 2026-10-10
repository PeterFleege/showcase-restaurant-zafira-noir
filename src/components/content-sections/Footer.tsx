// src/components/content-sections/Footer.tsx

import { cacheLife } from "next/cache";

async function CurrentYear() {
  "use cache";
  cacheLife("days"); // recomputed at most once a day, so it flips on 1 January
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer id="visit" className="px-6 pb-10 pt-28 md:px-12">
      <div className="mx-auto grid max-w-375 gap-14 md:grid-cols-4">
        <div>
          <h3 className="mb-5 font-display text-2xl italic text-amber-500">
            Find us
          </h3>
          <address className="not-italic leading-relaxed text-parchment/70">
            Pohjoisesplanadi 12
            <br />
            00130 Helsinki
            <br />
            Finland
          </address>
        </div>
        <div>
          <h3 className="mb-5 font-display text-2xl italic text-amber-500">
            Opening hours
          </h3>
          <dl className="space-y-1 text-parchment/70">
            <div className="flex justify-between gap-6">
              <dt>Tuesday to Thursday</dt>
              <dd>17:30 – 23:00</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt>Friday and Saturday</dt>
              <dd>17:00 – 00:30</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt>Sunday and Monday</dt>
              <dd>Closed</dd>
            </div>
          </dl>
        </div>
        <div>
          <h3 className="mb-5 font-display text-2xl italic text-amber-500">
            Get in touch
          </h3>
          <p className="leading-relaxed text-parchment/70">
            <a href="tel:+35890000000" className="link-line">
              +358 9 000 0000
            </a>
            <br />
            <a href="mailto:hello@candela.fi" className="link-line">
              hello@zafira-noir.fi
            </a>
          </p>
        </div>
        <div>
          <h3 className="mb-5 font-display text-2xl italic text-amber-500">
            Follow
          </h3>
          <p className="space-x-6 text-parchment/70">
            <a href="#" className="link-line">
              Instagram
            </a>
            <a href="#" className="link-line">
              Facebook
            </a>
          </p>
        </div>
      </div>
      <p
        className="mt-28 select-none text-center font-display text-[clamp(4rem,12vw,15rem)] font-light leading-none tracking-[0.12em] text-parchment/6"
        aria-hidden
      >
        ZAFÏRA NOIR
      </p>
      <p className="mt-6 text-center text-sm text-parchment/40">
        © <CurrentYear /> Zafïra Noir. A fictional restaurant.
      </p>
    </footer>
  );
}

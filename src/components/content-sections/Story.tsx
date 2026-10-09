import Reveal from "@/components/functional/Reveal";

export default function Story() {
  return (
    <section
      id="story"
      className="relative px-5 py-28 md:px-10 md:py-44 bg-linear-180 from-stone-600/50 via-amber-500/10 to-stone-600/70"
    >
      <div className="mx-auto grid max-w-7xl gap-20 md:grid-cols-[.7fr_1.3fr] md:items-center">
        <Reveal>
          <p className="section-kicker">The philosophy</p>
          <h2 className="mt-5 font-display text-5xl leading-none md:text-7xl">
            Familiar
            <br />
            <span className="italic text-amber-500">but unexpected.</span>
          </h2>
        </Reveal>

        <Reveal className="delay-150">
          <p className="max-w-2xl italic text-xl leading-9 text-paper/70 md:leading-10">
            Zafïra Noir is built around a simple idea: the most memorable meals
            are not complicated, they are deeply felt. We take the flavours we
            grew up with and strip them back until their character speaks for
            itself.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-paper/15 pt-7 text-[10px] uppercase tracking-[0.22em] text-paper/45 md:max-w-xl">
            <div>Seasonal produce</div>
            <div>Open-fire cooking</div>
            <div>Small producers</div>
            <div>Zero-proof pairings</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

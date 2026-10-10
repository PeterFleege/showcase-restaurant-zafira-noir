// src/components/content-sections/Reservation.tsx

"use client";

import type { SubmitEvent } from "react";
import { useState } from "react";
import Reveal from "@/components/functional/Reveal";
import type { Reservation } from "@/types/reservation";

/* FOR ALTERNATIVE TIME FIELDSET */
/*
const TIMES = [
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];
*/

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [bookingError, setBookingError] = useState("");

  async function submitReservation(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingError("");
    setSubmitted(false);

    const form = new FormData(event.currentTarget);
    const payload: Reservation = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      partySize: Number(form.get("partySize") || 2),
      date: String(form.get("date") || ""),
      time: String(form.get("time") || ""),
      note: String(form.get("note") || ""),
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Could not save reservation.");
      }

      setSubmitted(true); // the form unmounts, so no reset() is needed
    } catch (error) {
      setBookingError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section id="reserve" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[.85fr_1.15fr]">
        <Reveal>
          <p className="section-kicker">Reservations</p>
          <h2 className="mt-5 font-display text-6xl leading-[.9] md:text-8xl">
            Save a seat
            <br />
            <span className="pl-[3vw] italic text-amber-500">
              for yourself.
            </span>
          </h2>
          <p className="mt-8 max-w-md text-sm leading-7 text-paper/50">
            For groups larger than 8, intimate celebrations or private dining,
            write to us directly.
          </p>
        </Reveal>

        <Reveal className="delay-150">
          {submitted ? (
            <Confirmation onReset={() => setSubmitted(false)} />
          ) : (
            <ReservationForm
              bookingError={bookingError}
              onSubmit={submitReservation}
            />
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Confirmation({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex min-h-107.5 flex-col items-start justify-center border border-paper/15 p-8 md:p-12">
      <span className="text-copper">01 / Confirmed</span>
      <h3 className="mt-5 font-display text-5xl">Your table is on us.</h3>
      <p className="mt-5 max-w-md leading-7 text-paper/55">
        Your request has been sent to the dining room. We&apos;ll follow up
        shortly with the final confirmation.
      </p>
      <button onClick={onReset} className="mt-10 editorial-link">
        Make another request <span>↗</span>
      </button>
    </div>
  );
}

function ReservationForm({
  bookingError,
  onSubmit,
}: {
  bookingError: string;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}) {
  // If we want to use TIME fieldset instead of option
  //   const [time, setTime] = useState("19:00");

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-x-10 border border-paper/15 p-6 md:grid-cols-2 md:p-10"
    >
      <label className="field md:col-span-2">
        <span>Name</span>
        <input name="name" required placeholder="Your name" />
      </label>
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" required placeholder="you@email.com" />
      </label>
      <label className="field">
        <span>Guests</span>
        <select name="partySize" defaultValue="2">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Date</span>
        <input name="date" type="date" required />
      </label>
      <label className="field">
        <span>Time</span>
        <select name="time" defaultValue="19:30">
          <option>17:30</option>
          <option>18:00</option>
          <option>18:30</option>
          <option>19:00</option>
          <option>19:30</option>
          <option>20:00</option>
          <option>20:30</option>
          <option>21:00</option>
        </select>
      </label>
      {/* ALTERNATIVE TIME BUTTONS */}
      {/* <fieldset>
        <legend className="mb-4 text-sm text-parchment/60">Time</legend>
        <div className="flex flex-wrap gap-3">
          {TIMES.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={time === t}
              onClick={() => setTime(t)}
              className={`rounded-full border px-5 py-2.5 transition-all duration-500 ${time === t ? "border-brass bg-brass text-ink" : "border-parchment/25 hover:border-brass"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset> */}
      <label className="field md:col-span-2">
        <span>
          Note <em>optional</em>
        </span>
        <textarea
          name="note"
          rows={3}
          placeholder="A birthday, dietary note, window seat..."
        />
      </label>

      {bookingError && (
        <p className="mb-4 text-sm text-red-300 md:col-span-2">
          {bookingError}
        </p>
      )}

      <div className="flex items-center justify-between mt-6 gap-6 md:col-span-2">
        <p className="text-[10px] italic text-paper leading-5">
          A request is not a final confirmation.
        </p>
        <button type="submit" className="button-copper">
          Request table <span>↗</span>
        </button>
      </div>
    </form>
  );
}

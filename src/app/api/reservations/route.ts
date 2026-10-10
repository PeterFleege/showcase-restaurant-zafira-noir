import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { Reservation } from "@/types/reservation";

/* If we want to use form with given times */
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Reservation;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const partySize = Number(body.partySize);
    const date = body.date;
    const time = body.time;
    const note = body.note?.trim() || null;

    if (
      !name ||
      !email ||
      !date ||
      !time ||
      !Number.isInteger(partySize) ||
      partySize < 1 ||
      partySize > 20
    ) {
      return NextResponse.json(
        { error: "Please provide valid reservation details." },
        { status: 400 },
      );
    }

    /* ALTERNATIVE CHECK */
    /*
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const date = String(body.date ?? "");
    const time = String(body.time ?? "");
    const guests = Number(body.guests);
    const notes = String(body.notes ?? "")
      .trim()
      .slice(0, 500);

    const today = new Date().toISOString().slice(0, 10);
    if (name.length < 2) return bad("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(email))
      return bad("Please enter a valid email address.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < today)
      return bad("Please choose a date from today onwards.");
    if (!TIMES.includes(time))
      return bad("Please choose one of the available times.");
    if (!Number.isInteger(guests) || guests < 1 || guests > 12)
      return bad("We seat 1 to 12 guests online.");
    */

    const result = await db.query(
      `INSERT INTO reservations
        (name, email, party_size, reservation_date, reservation_time, note)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, reservation_date AS date, reservation_time AS time`,
      [name, email, partySize, date, time, note],
    );

    return NextResponse.json(
      { ok: true, reservation: result.rows[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("Reservation error:", error);
    return NextResponse.json(
      {
        error:
          "NOTE! For being able to save data, you first need to configure your PostgreSQL database.",
      },
      { status: 500 },
    );
  }
}

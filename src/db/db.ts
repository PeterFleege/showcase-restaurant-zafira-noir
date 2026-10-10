// src/db/db.ts

import { Pool } from "pg";

// Reuse one pool across hot reloads in development.
const globalForPg = globalThis as unknown as { pgPool?: Pool };

export const db =
  globalForPg.pgPool ??
  new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });

if (process.env.NODE_ENV !== "production") globalForPg.pgPool = db;

/* ALTERNATIVE */
// declare global {
//   // eslint-disable-next-line no-var
//   var pgPool: Pool | undefined;
// }

// export const db =
//   global.pgPool ??
//   new Pool({
//     connectionString: process.env.DATABASE_URL,
//     max: 5,
//   });

// if (process.env.NODE_ENV !== "production") {
//   global.pgPool = db;
// }

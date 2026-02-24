import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.NEON_URI) {
  throw new Error("NEON_URI not found in .env");
}

const sql = neon(process.env.NEON_URI);
export const db = drizzle(sql);

export async function connectDB() {
  try {
    // Using raw SQL via sql client inside drizzle
    const result = await sql.query("SELECT NOW()"); // use sql.query(), not db``
    console.log("Connected! Time:");
  } catch (err) {
    console.error("DB connection error:", err);
    throw new Error(String(err));
  }
}

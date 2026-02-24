import type { Config } from "drizzle-kit";

export default {
  schema: "./src/DB/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_URI!,
  },
} satisfies Config;

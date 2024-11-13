import type { Config } from "drizzle-kit";

const nonPoolingUrl = process.env.POSTGRES_URL?.replace(":6543", ":5432");

if (!nonPoolingUrl) {
  throw new Error("POSTGRES_URL is not set");
}

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  out: "./supabase/migrations",
  dbCredentials: { url: nonPoolingUrl },
} satisfies Config;

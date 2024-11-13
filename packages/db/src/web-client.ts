import { createPool } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as schema from "./schema";

export const getDb = (connectionString: string) => {
  const client = createPool({ connectionString });
  const db = drizzle(client, { schema });
  return db;
};

export type Schema = typeof schema;
export type DBType = ReturnType<typeof getDb>;

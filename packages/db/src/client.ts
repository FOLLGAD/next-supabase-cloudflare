import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export type Schema = typeof schema;

const connectionString = process.env.POSTGRES_URL!;

export const getDb = (cstring: string = connectionString) => {
  const client = postgres(cstring, { prepare: false });
  const db = drizzle(client, { schema });
  return db;
};
export type DBType = ReturnType<typeof getDb>;

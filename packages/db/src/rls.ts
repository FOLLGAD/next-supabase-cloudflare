import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { PgTransaction } from "drizzle-orm/pg-core";
import type { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";

import type { Schema } from "@polaris/db/client";
import { getDb } from "@polaris/db/client";

type QueryInTransaction<T> = (
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Schema,
    ExtractTablesWithRelations<Schema>
  >,
) => Promise<T>;

export const rlsQuery = async <T>(
  userId: string,
  txFunc: QueryInTransaction<T>,
) => {
  await getDb().transaction(async (tx) => {
    await tx.execute(
      sql`SELECT set_config('request.jwt.claim.sub', '${sql.raw(userId)}', TRUE)`,
    );
    return await txFunc(tx);
  });
};

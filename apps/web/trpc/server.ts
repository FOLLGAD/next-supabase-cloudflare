import "server-only"; // <-- ensure this file cannot be imported from the client

import { cache } from "react";
import { headers } from "next/headers";
import { createHydrationHelpers } from "@trpc/react-query/rsc";

import type { appRouter } from "@polaris/api";
import { createCaller, createTRPCContext } from "@polaris/api";

import { makeQueryClient } from "./query-client";

const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    session: null,
    headers: heads,
  });
});

const getQueryClient = cache(makeQueryClient);
const caller = createCaller(createContext);

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);

import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { publicProcedure } from "../trpc";

export interface Post {
  id: string;
  title: string;
  content: string;
}

const posts: Post[] = [];

export const postRouter = {
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return posts.find((p) => p.id === input.id);
    }),
  all: publicProcedure.input(z.object({})).query(async ({ ctx, input }) => {
    return posts;
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = Math.random().toString();
      posts.push({ id, title: input.title, content: input.content });
      return { id };
    }),
} satisfies TRPCRouterRecord;

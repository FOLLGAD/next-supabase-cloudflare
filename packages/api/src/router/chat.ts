import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { desc } from "@polaris/db";
import { Chat } from "@polaris/db/schema";

import { protectedProcedure } from "../trpc";

export const chatRouter = {
  chats: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx, input }) => {
      const chats = await ctx.db.query.Chat.findMany({
        limit: 5,
        orderBy: [desc(Chat.createdAt)],
      });
      return chats;
    }),
} satisfies TRPCRouterRecord;

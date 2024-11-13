import type { Message } from "ai";
import { openai } from "@ai-sdk/openai";
import { tavily } from "@tavily/core";
import { generateObject, streamText } from "ai";
import { z } from "zod";

import { eq } from "@polaris/db";
import { getDb } from "@polaris/db/client";
import { Chat, Message as DBMessage } from "@polaris/db/schema";

import { getAuthUser } from "~/app/utils/supabase/server";
import { sanitizeResponseMessages } from "~/components/chat/utils";
import { env } from "~/env";
import { systemPrompt } from "./prompt";

export const runtime = "edge";

export const maxDuration = 60;

export async function POST(request: Request) {
  const {
    id,
    messages,
  }: { id: string; messages: Message[]; companyId: string } =
    await request.json();

  const db = getDb(env.POSTGRES_URL);

  const user = await getAuthUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  await db
    .insert(Chat)
    .values({
      chatId: id,
      createdAt: new Date(),
      title: "Chat",
      userId: user.id,
    })
    .onConflictDoNothing();

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage) throw new Error("No messages");

  if (messages.length === 1) {
    generateObject({
      model: openai("gpt-4o-mini"),
      system: "Generate a chat title for this conversation",
      prompt: lastMessage.content,
      schema: z.object({
        title: z.string(),
      }),
    })
      .then(async (res) => {
        await db
          .update(Chat)
          .set({ title: res.object.title })
          .where(eq(Chat.chatId, id));
      })
      .catch((e) => console.error("Failed to generate title:", e));
  }

  await db.insert(DBMessage).values({
    chatId: id,
    role: "user",
    content: lastMessage.content,
    createdAt: new Date(),
  });

  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
    maxSteps: 5,
    system: systemPrompt(),
    tools: {
      search: {
        description: "Search the web.",
        parameters: z.object({
          query: z.string().describe("Sök query på juridiskt språk"),
        }),
        execute: async ({ query }: { query: string }) => {
          if (!env.TAVILY_API_KEY) {
            throw new Error(
              "Tavily API key not set. User must set a Tavily API key in the environment variables.",
            );
          }
          const search = tavily({
            apiKey: env.TAVILY_API_KEY,
          });
          return await search.search(query, {});
        },
      },
    },
    onFinish: async ({ responseMessages }) => {
      try {
        const responseMessagesWithoutIncompleteToolCalls =
          sanitizeResponseMessages(responseMessages);

        await db.insert(DBMessage).values(
          responseMessagesWithoutIncompleteToolCalls.map((message) => ({
            chatId: id,
            role: message.role,
            content: message.content,
            createdAt: new Date(),
          })),
        );
      } catch (error) {
        console.error("Failed to save chat", error);
      }
    },
  });

  return result.toDataStreamResponse();
}

import { notFound } from "next/navigation";

import { asc, eq } from "@polaris/db";
import { getDb } from "@polaris/db/client";
import { Chat as DBChat, Message } from "@polaris/db/schema";

import { Chat } from "~/components/chat/chat";
import { convertToUIMessages } from "~/components/chat/utils";
import { env } from "~/env";

export const runtime = "edge";

export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const { chatId } = params;

  const db = getDb(env.POSTGRES_URL);

  const [chat] = await db
    .select()
    .from(DBChat)
    .where(eq(DBChat.chatId, chatId));

  if (!chat) {
    notFound();
  }

  const messagesFromDb = await db
    .select()
    .from(Message)
    .where(eq(Message.chatId, chatId))
    .orderBy(asc(Message.createdAt));

  return (
    <Chat
      id={chat.chatId}
      initialMessages={convertToUIMessages(messagesFromDb)}
      selectedModelId="gpt-4o"
    />
  );
}

"use client";

import type { Attachment, Message } from "ai";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useChat } from "ai/react";
import useSWR from "swr";

import type { Vote } from "@polaris/db/schema";

import { PreviewMessage, ThinkingMessage } from "~/components/chat/message";
import { MultimodalInput } from "./multimodal-input";
import { Overview } from "./overview";
import { useScrollToBottom } from "./use-scroll-to-bottom";
import { fetcher } from "./utils";

export function Chat({
  id,
  initialMessages,
  selectedModelId,
}: {
  id: string;
  initialMessages: Message[];
  selectedModelId: string;
}) {
  const { companyId } = useParams<{ companyId: string }>();

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
  } = useChat({
    body: { id, modelId: selectedModelId, companyId },
    initialMessages,
  });

  const { data: votes } = useSWR<Vote[]>(`/api/vote?chatId=${id}`, fetcher);

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  return (
    <div className="relative flex h-full flex-1 flex-col">
      <form className="pointer-events-none absolute bottom-0 left-0 right-0 px-4 py-4 md:py-6">
        <div className="pointer-events-auto mx-auto w-full md:max-w-3xl">
          <MultimodalInput
            className="shadow-lg"
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            append={append}
          />
        </div>
      </form>

      <div
        ref={messagesContainerRef}
        className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll pt-4"
      >
        {messages.length === 0 && <Overview />}

        {messages.map((message, index) => (
          <PreviewMessage
            key={message.id}
            chatId={id}
            message={message}
            isLoading={isLoading && messages.length - 1 === index}
            vote={
              votes
                ? votes.find((vote) => vote.messageId === message.id)
                : undefined
            }
          />
        ))}

        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && <ThinkingMessage />}

        <div
          ref={messagesEndRef}
          className="min-h-[24px] min-w-[24px] shrink-0 pb-32"
        />
      </div>
    </div>
  );
}

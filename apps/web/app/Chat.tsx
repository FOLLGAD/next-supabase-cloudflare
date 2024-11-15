"use client"
import { useState } from "react";
import { Chat } from "~/components/chat/chat";
import { generateUUID } from "~/components/chat/utils";

export const runtime = "edge";

export default function Page() {
  const [id] = useState(generateUUID())

  return (
    <Chat key={id} id={id} initialMessages={[]} selectedModelId="gpt-4o" />
  );
}

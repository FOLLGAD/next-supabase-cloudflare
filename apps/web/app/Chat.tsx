import { Chat } from "~/components/chat/chat";
import { generateUUID } from "~/components/chat/utils";

export const runtime = "edge";

export default function Page() {
  const id = generateUUID();

  return (
    <Chat key={id} id={id} initialMessages={[]} selectedModelId="gpt-4o" />
  );
}

import Chat from "./Chat";

export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="container flex h-screen flex-col">
      <Chat />
    </main>
  );
}

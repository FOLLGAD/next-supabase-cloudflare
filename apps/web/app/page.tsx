import Chat from "./Chat";

export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="container min-h-screen">
      <Chat />
    </main>
  );
}

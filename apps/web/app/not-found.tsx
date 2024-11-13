import Link from "next/link";

export const runtime = "edge";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-gray-600">Sorry, an error occurred.</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Return home
      </Link>
    </div>
  );
}

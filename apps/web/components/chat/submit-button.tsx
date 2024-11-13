"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@polaris/ui/button";

import { LoaderIcon } from "~/components/chat/icons";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type={pending ? "button" : "submit"}
      aria-disabled={pending}
      disabled={pending}
      className="relative"
    >
      {children}
      {pending && (
        <span className="absolute right-4 animate-spin">
          <LoaderIcon />
        </span>
      )}
      <span aria-live="polite" className="sr-only" role="status">
        {pending ? "Loading" : "Submit form"}
      </span>
    </Button>
  );
}

"use client";

import { useRouter } from "next/navigation";

import { Button } from "@polaris/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@polaris/ui/card";
import { Input } from "@polaris/ui/input";
import { Label } from "@polaris/ui/label";

import { createUser } from "../(auth)/login/actions";
import { useSession } from "../utils/auth";

export const runtime = "edge";

export default function OnboardingPage() {
  const router = useRouter();

  const session = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session) {
      const formData = new FormData(e.currentTarget);
      formData.append("userId", session.user.id);
      formData.append("imageUrl", session.user.user_metadata.avatar_url);

      try {
        await createUser(formData);
        router.push("/");
      } catch (error) {
        console.error("Failed to create user:", error);
      }
    }
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Welcome to Polaris</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Label>
              What's your name?
              <Input
                className="mt-2"
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={session?.user.user_metadata.name}
              />
            </Label>
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

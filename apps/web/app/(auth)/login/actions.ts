"use server";

import type { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "~/app/utils/supabase/server";
import { env } from "~/env";

export async function createUser(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const userId = formData.get("userId") as string;
  const imageUrl = formData.get("imageUrl") as string;

  const { error } = await supabase.from("user").upsert({
    user_id: userId,
    name: name,
    image: imageUrl,
  });

  if (error) {
    throw new Error("Failed to create user");
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function loginSocial(provider: Provider) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  return data.url;
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

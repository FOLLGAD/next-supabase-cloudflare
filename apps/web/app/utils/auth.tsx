"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import type { User as DBUser, User } from "@polaris/db/schema";

import { createClient } from "~/app/utils/supabase/client";

export const RedirectIfNotAuthenticated = () => {
  const client = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    if (!pathname.startsWith("/onboarding") && session?.user)
      client
        .from("user")
        .select()
        .eq("user_id", session.user.id)
        .single<typeof User.$inferSelect | null>()
        .then((r) => {
          if (!r.data) {
            router.push("/onboarding");
          }
        });
  }, [client, session, router, pathname]);

  return null;
};

export const useSupabaseUser = () => {
  const client = createClient();
  const [user, setUser] = useState<typeof DBUser.$inferSelect | null>(null);

  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      if (session) {
        client
          .from("user")
          .select()
          .eq("user_id", session.user.id)
          .single()
          .then((r) => {
            setUser(r.data);
          });
      } else {
        setUser(null);
      }
    });
  }, [client]);

  return user;
};

export const useSession = () => {
  const client = createClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      if (session) {
        setSession(session);
      } else {
        setSession(null);
      }
    });
  }, [client.auth]);

  return session;
};

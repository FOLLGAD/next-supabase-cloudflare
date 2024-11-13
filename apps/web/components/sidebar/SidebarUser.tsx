import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sun,
  UserIcon,
} from "lucide-react";

import type { User } from "@polaris/db/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@polaris/ui/avatar";
import { Button } from "@polaris/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@polaris/ui/dropdown-menu";
import { ThemeToggle } from "@polaris/ui/theme";

import { loginSocial, logout } from "~/app/(auth)/login/actions";
import { createClient } from "~/app/utils/supabase/server";

export async function SidebarUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const { data: realUser, error: realUserError } = await supabase
    .from("user")
    .select("*")
    .eq("user_id", user?.id)
    .single<typeof User.$inferSelect>();

  const metadata = user?.user_metadata;

  if (!user) {
    return (
      <form
        action={async () => {
          "use server";
          const url = await loginSocial("google");
          if (url) {
            redirect(url);
          }
        }}
      >
        <Button type="submit" variant="link">
          Sign in
        </Button>
      </form>
    );
  }
  const avatar =
    realUser?.image ??
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(`"${user.email}"`)}`;

  const name = realUser?.name ?? user.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full rounded-md outline-none ring-ring hover:bg-accent focus-visible:ring-2 data-[state=open]:bg-accent">
        <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm transition-all">
          <Avatar className="h-7 w-7 rounded-md border">
            <AvatarImage
              src={avatar}
              alt={name ?? "User name"}
              className="animate-in fade-in-50 zoom-in-90"
            />
            <AvatarFallback className="rounded-md">
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 leading-none">
            <div className="font-medium">{name}</div>
            <div className="overflow-hidden text-xs text-muted-foreground">
              <div className="line-clamp-1">{user.email}</div>
            </div>
          </div>
          <ChevronsUpDown className="ml-auto mr-0.5 h-4 w-4 text-muted-foreground/50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52"
        align="end"
        side="right"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm transition-all">
            <Avatar className="h-7 w-7 rounded-md">
              <AvatarImage
                src={avatar}
                alt={name ?? "User name"}
                className="animate-in fade-in-50 zoom-in-90"
              />
              <AvatarFallback className="rounded-md">
                <UserIcon />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1">
              <div className="font-medium">{name}</div>
              <div className="overflow-hidden overflow-ellipsis text-xs text-muted-foreground">
                <div className="line-clamp-1">{user.email}</div>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2">
            <BadgeCheck className="h-4 w-4 text-muted-foreground" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <ThemeToggle />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form
          className="w-full"
          action={async () => {
            "use server";
            logout();
            revalidatePath("/", "layout");
            redirect("/");
          }}
        >
          <DropdownMenuItem className="w-full cursor-pointer gap-2" asChild>
            <button type="submit">
              <LogOut className="h-4 w-4 text-muted-foreground" />
              Log out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

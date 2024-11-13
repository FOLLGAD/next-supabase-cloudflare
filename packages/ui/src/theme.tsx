"use client";

import type * as React from "react";
import { ThemeProvider, useTheme } from "next-themes";

import { cn } from "@polaris/ui";

import type { DropdownMenu } from "./dropdown-menu";
import { DropdownMenuItem } from "./dropdown-menu";

function ThemeToggle({
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenu>) {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <DropdownMenuItem
        onClick={() => setTheme("light")}
        className={cn(
          "cursor-pointer",
          theme === "light" && "bg-accent text-accent-foreground",
        )}
      >
        Light
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => setTheme("dark")}
        className={cn(
          "cursor-pointer",
          theme === "dark" && "bg-accent text-accent-foreground",
        )}
      >
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => setTheme("system")}
        className={cn(
          "cursor-pointer",
          theme === "system" && "bg-accent text-accent-foreground",
        )}
      >
        System
      </DropdownMenuItem>
    </>
  );
}

export { ThemeProvider, ThemeToggle };

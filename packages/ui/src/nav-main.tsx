"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@polaris/ui";
import { Button } from "@polaris/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@polaris/ui/collapsible";

export function NavMain({
  className,
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    key?: string;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
      description?: string;
      isActive?: boolean;
      key?: string;
    }[];
  }[];
} & React.ComponentProps<"ul">) {
  return (
    <ul className={cn("grid gap-0.5", className)}>
      {items.map((item) => (
        <Collapsible
          key={item.key ?? item.title}
          asChild
          defaultOpen={item.isActive}
        >
          <li>
            <div className="relative flex items-center">
              <Link
                href={item.url}
                className={cn(
                  "flex h-8 min-w-8 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2",
                  item.isActive && "bg-accent/50",
                )}
              >
                {item.icon ? <item.icon className="h-4 w-4 shrink-0" /> : null}
                <div className="flex flex-1 overflow-hidden">
                  <div className="line-clamp-1 pr-6">{item.title}</div>
                </div>
              </Link>
              <CollapsibleTrigger
                asChild
                className={cn(!item.items?.length ? "hidden" : "")}
              >
                <Button
                  variant="ghost"
                  className="absolute right-1 h-6 w-6 rounded-md p-0 ring-ring transition-all focus-visible:ring-2 data-[state=open]:rotate-90"
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="px-4">
              {item.items && (
                <ul className="grid border-l px-2">
                  {item.items.map((subItem) => (
                    <li key={subItem.key ?? subItem.title}>
                      <Link
                        href={subItem.url}
                        className={cn(
                          "flex h-8 min-w-8 items-center gap-2 overflow-hidden rounded-md px-2 text-sm font-medium text-muted-foreground ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2",
                          subItem.isActive && "bg-accent/50",
                        )}
                      >
                        {subItem.icon ? (
                          <subItem.icon className="h-4 w-4 shrink-0" />
                        ) : null}
                        <div className="line-clamp-1">{subItem.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CollapsibleContent>
          </li>
        </Collapsible>
      ))}
    </ul>
  );
}

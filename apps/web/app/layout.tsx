import type { Metadata, Viewport } from "next";

import "./globals.css";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@polaris/ui";
import { SidebarProvider } from "@polaris/ui/sidebar";
import { Toaster } from "@polaris/ui/sonner";
import { ThemeProvider } from "@polaris/ui/theme";
import { TooltipProvider } from "@polaris/ui/tooltip";

import { Sidebar } from "~/components/sidebar/Sidebar";
import { TRPCProvider } from "~/trpc/client";
import { env } from "../env";
import { RedirectIfNotAuthenticated } from "./utils/auth";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.NODE_ENV === "production"
      ? "https://usepolaris.co"
      : "http://localhost:3000",
  ),
  title: "Polaris",
  description: "P O L A R I S",
  openGraph: {
    title: "Polaris",
    description: "P O L A R I S",
    url: "https://usepolaris.co",
    siteName: "Polaris",
  },
  twitter: {
    card: "summary_large_image",
    site: "@emilahlback",
    creator: "@emilahlback",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-accent/25 font-sans text-foreground antialiased dark:bg-background",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider delayDuration={200}>
            <TRPCProvider>
              <SidebarProvider>
                <div className="flex h-screen w-full">
                  <Sidebar />

                  <div className="flex h-full flex-grow flex-col overflow-x-auto p-0">
                    <div className="h-full overflow-y-auto overflow-x-hidden pt-12 dark:bg-accent/50 md:rounded-3xl md:pt-0">
                      <RedirectIfNotAuthenticated />
                      {props.children}
                    </div>
                  </div>
                </div>
              </SidebarProvider>
            </TRPCProvider>

            <Toaster closeButton />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

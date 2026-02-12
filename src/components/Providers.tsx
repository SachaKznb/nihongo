"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/ui/Toast";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <PostHogProvider>
        <ToastProvider>{children}</ToastProvider>
      </PostHogProvider>
    </SessionProvider>
  );
}

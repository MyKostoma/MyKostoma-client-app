"use client";

import { MessagesSquare, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MessagesNoSelectionProps } from "./types";

export function MessagesNoSelection({ className }: MessagesNoSelectionProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between h-full bg-background/50 p-6 sm:p-10 text-center select-none",
        className
      )}
    >
      <div aria-hidden="true" />

      <div className="max-w-md mx-auto flex flex-col items-center space-y-5">
        <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
          <MessagesSquare className="size-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
            Your Messages
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Select a conversation from the list to start messaging or view your
            chat history with tenants and service providers.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-2xs">
            <Zap className="size-3.5 text-muted-foreground" />
            <span>Instant Replies</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-2xs">
            <ShieldCheck className="size-3.5 text-muted-foreground" />
            <span>Secure Chat</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xs flex items-center gap-3 pt-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 whitespace-nowrap">
          MYKOSTOMA MESSAGING ENGINE
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}


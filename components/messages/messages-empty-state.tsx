"use client";

import { MessageSquare, Plus, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MessagesEmptyStateProps } from "./types";

export function MessagesEmptyState({
  onFindService,
  onBrowseProfessionals,
  className,
}: MessagesEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between min-h-[calc(100vh-8.5rem)] rounded-2xl border border-border bg-card/50 p-6 sm:p-10 text-center",
        className
      )}
    >
      <div aria-hidden="true" />

      <div className="max-w-lg w-full mx-auto flex flex-col items-center space-y-6 py-6">
        {/* Icon Badge with Plus */}
        <div className="relative size-24 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground">
          <MessageSquare className="size-10 fill-muted-foreground/20" />
          <span className="absolute top-1 right-1 size-6 rounded-full bg-card border border-border shadow-xs flex items-center justify-center text-primary">
            <Plus className="size-3.5 stroke-[2.5]" />
          </span>
        </div>

        {/* Heading & Copy */}
        <div className="space-y-2 max-w-sm">
          <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
            No messages yet
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Your inbox is currently empty. When you start a conversation with a
            professional or a tenant, your messages will appear here.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-xs space-y-2.5 pt-1">
          <Button
            type="button"
            variant="default"
            onClick={onFindService}
            className="w-full h-10 rounded-lg text-xs sm:text-sm font-semibold shadow-xs"
          >
            Find a Service
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onBrowseProfessionals}
            className="w-full h-10 rounded-lg text-xs sm:text-sm font-semibold"
          >
            Browse Professionals
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4 text-left">
          <div className="rounded-xl border border-border bg-card p-4 space-y-2 shadow-2xs">
            <div className="size-8 rounded-lg bg-accent text-primary flex items-center justify-center">
              <Zap className="size-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground">
              Quick Responses
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Get notified immediately when someone replies to your inquiry.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2 shadow-2xs">
            <div className="size-8 rounded-lg bg-info-bg text-info flex items-center justify-center">
              <ShieldCheck className="size-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground">
              Secure Chat
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All communications are encrypted and kept within the platform.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Watermark */}
      <div className="w-full pt-6 border-t border-border/60 flex items-center justify-center gap-3">
        <div className="h-px w-10 bg-border" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
          MYKOSTOMA SECURE MESSAGING
        </span>
        <div className="h-px w-10 bg-border" />
      </div>
    </div>
  );
}


"use client";

import type { HTMLAttributes } from "react";
import { MessageSquare } from "lucide-react";
import { SectionHeader } from "@/components/consumer-home/section-header";
import { cn } from "@/lib/utils";
import { FollowButton } from "./follow-button";

export interface ProfileInteractionDetailsProps
  extends HTMLAttributes<HTMLElement> {
  recipientName: string;
  responseTimeText?: string;
  quickActions: string[];
  onSelectQuickAction: (actionText: string) => void;
  onSetFollowing: (following: boolean) => void;
}

export function ProfileInteractionDetails({
  recipientName,
  responseTimeText = "2 hours",
  quickActions,
  onSelectQuickAction,
  onSetFollowing,
  className,
  ...props
}: ProfileInteractionDetailsProps) {
  const firstName = recipientName.split(" ")[0] || recipientName;

  return (
    <section
      aria-label="Follow and message interaction details"
      className={cn(
        "w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch animate-in fade-in duration-200",
        className
      )}
      {...props}
    >
      {/* Left Card: Follow Interaction States */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs flex flex-col justify-between space-y-6">
        <SectionHeader title="Follow Interaction States" />

        <div className="space-y-4">
          {/* State 1: Default */}
          <div className="rounded-xl bg-secondary/50 border border-border/60 p-4 sm:px-5 sm:py-4 flex items-center justify-between gap-4">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                STATE: DEFAULT
              </span>
              <span className="block text-xs font-medium text-foreground mt-0.5">
                User not following professional
              </span>
            </div>

            <FollowButton
              forceState="default"
              onToggleFollow={() => onSetFollowing(true)}
            />
          </div>

          {/* State 2: Active */}
          <div className="rounded-xl bg-accent/35 border border-primary/15 p-4 sm:px-5 sm:py-4 flex items-center justify-between gap-4">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-primary">
                STATE: ACTIVE
              </span>
              <span className="block text-xs font-medium text-foreground mt-0.5">
                User is currently following
              </span>
            </div>

            <FollowButton
              forceState="active"
              onToggleFollow={() => onSetFollowing(true)}
            />
          </div>

          {/* State 3: Hover Unfollow */}
          <div className="rounded-xl bg-error-bg/40 border border-error/15 p-4 sm:px-5 sm:py-4 flex items-center justify-between gap-4">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-error">
                STATE: HOVER UNFOLLOW
              </span>
              <span className="block text-xs font-medium text-foreground mt-0.5">
                Visual intent to unfollow
              </span>
            </div>

            <FollowButton
              forceState="hover-unfollow"
              onToggleFollow={() => onSetFollowing(false)}
            />
          </div>
        </div>
      </div>

      {/* Right Card: Message Entry Details */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          <SectionHeader title="Message Entry Details" />

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              QUICK ACTIONS
            </h3>

            <div className="flex flex-wrap items-center gap-2.5">
              {quickActions.map((action) => {
                const cleanText = action.replace(/^["']|["']$/g, "");
                return (
                  <button
                    key={action}
                    type="button"
                    onClick={() => onSelectQuickAction(cleanText)}
                    className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary-hover text-xs font-semibold text-foreground transition-colors cursor-pointer"
                  >
                    &ldquo;{cleanText}&rdquo;
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-t border-border/60" />

          {/* Messaging Policies */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              MESSAGING POLICIES
            </h3>

            <div className="rounded-xl bg-info-bg border border-info/20 p-4 flex items-center gap-3.5">
              <div className="size-9 rounded-lg bg-card text-info flex items-center justify-center shrink-0 shadow-2xs">
                <MessageSquare className="size-4" />
              </div>

              <p className="text-[11px] sm:text-xs text-info leading-relaxed">
                {firstName} typically responds within{" "}
                <span className="font-bold underline">{responseTimeText}.</span>{" "}
                All project payments must be handled via MyKostoma Secure Pay
                for project protection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

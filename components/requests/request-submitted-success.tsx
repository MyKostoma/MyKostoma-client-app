"use client";

import { Bell, Check, Mail, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface RequestSubmittedSuccessProps {
  onViewRequestDetail: () => void;
  onBackToMyRequests: () => void;
  onNotificationsClick?: () => void;
  onInboxClick?: () => void;
  onSettingsClick?: () => void;
  className?: string;
}

export function RequestSubmittedSuccess({
  onViewRequestDetail,
  onBackToMyRequests,
  onNotificationsClick,
  onInboxClick,
  onSettingsClick,
  className,
}: RequestSubmittedSuccessProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6",
        className
      )}
    >
      <div className="w-full max-w-md sm:max-w-lg rounded-2xl border border-border bg-card p-7 sm:p-10 text-center shadow-2xs animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Logo */}
        <div className="flex justify-center">
          <img
            src="/mykostoma_full_logo.png"
            alt="MyKostoma"
            className="h-7 sm:h-8 w-auto object-contain select-none"
          />
        </div>

        {/* Success Checkmark Badge */}
        <div className="size-16 rounded-full bg-success-bg flex items-center justify-center mx-auto mt-6">
          <div className="size-11 rounded-full bg-success text-success-foreground flex items-center justify-center shadow-xs">
            <Check className="size-6 stroke-[2.5]" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mt-5">
          Request Submitted Successfully
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto mt-2.5">
          Your request has been posted to the marketplace. Professionals will
          review your requirements and provide quotes shortly.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 mt-7">
          <Button
            type="button"
            variant="default"
            onClick={onViewRequestDetail}
            className="w-full h-11 rounded-lg text-xs font-semibold shadow-xs"
          >
            View Request Detail
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onBackToMyRequests}
            className="w-full h-11 rounded-lg text-xs font-semibold"
          >
            Back to My Requests
          </Button>
        </div>

        <hr className="border-t border-border/60 my-7" />

        {/* Quick Utility Icons */}
        <div className="flex items-center justify-center gap-7 sm:gap-9">
          <button
            type="button"
            onClick={onNotificationsClick}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <span className="size-9 rounded-lg border border-border bg-card group-hover:bg-secondary text-foreground flex items-center justify-center transition-colors shadow-2xs">
              <Bell className="size-4" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
              NOTIFICATIONS
            </span>
          </button>

          <button
            type="button"
            onClick={onInboxClick}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <span className="size-9 rounded-lg border border-border bg-card group-hover:bg-secondary text-foreground flex items-center justify-center transition-colors shadow-2xs">
              <Mail className="size-4" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
              INBOX
            </span>
          </button>

          <button
            type="button"
            onClick={onSettingsClick}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <span className="size-9 rounded-lg border border-border bg-card group-hover:bg-secondary text-foreground flex items-center justify-center transition-colors shadow-2xs">
              <Settings className="size-4" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
              SETTINGS
            </span>
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
          <a href="#docs" className="hover:text-foreground transition-colors">
            DOCUMENTATION
          </a>
          <span aria-hidden="true">•</span>
          <a
            href="#support"
            className="hover:text-foreground transition-colors"
          >
            SUPPORT
          </a>
        </div>
      </div>
    </div>
  );
}

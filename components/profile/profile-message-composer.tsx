"use client";

import { ArrowRight, CloudUpload, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";

export interface ProfileMessageComposerProps {
  recipientName: string;
  messageValue: string;
  onMessageChange: (value: string) => void;
  onCancel: () => void;
  onSendMessage: () => void;
  onAttachClick?: () => void;
  onSettingsClick?: () => void;
  placeholder?: string;
  className?: string;
}

export function ProfileMessageComposer({
  recipientName,
  messageValue,
  onMessageChange,
  onCancel,
  onSendMessage,
  onAttachClick,
  onSettingsClick,
  placeholder,
  className,
}: ProfileMessageComposerProps) {
  const firstName = recipientName.split(" ")[0] || recipientName;
  const resolvedPlaceholder =
    placeholder ??
    `Hi ${firstName}, I'm interested in a consultation for my home in Lekki...`;

  return (
    <div
      className={cn(
        "relative mt-7 rounded-2xl border border-primary/20 bg-accent/35 p-4 sm:p-6 pt-6 sm:pt-7 transition-all animate-in fade-in slide-in-from-top-2 duration-200",
        className
      )}
    >
      {/* Floating Header Pill */}
      <span className="absolute -top-3 left-5 sm:left-6 inline-flex items-center px-3.5 py-1 rounded-full bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-xs select-none">
        NEW MESSAGE FOR {firstName.toUpperCase()}
      </span>

      {/* Avatar + Textarea Row */}
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          aria-hidden="true"
          className="size-9 sm:size-10 rounded-full bg-info/25 border border-info/20 shrink-0 mt-0.5"
        />

        <div className="flex-1 min-w-0">
          <Textarea
            value={messageValue}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder={resolvedPlaceholder}
            aria-label={`Message to ${recipientName}`}
            className="min-h-28 sm:min-h-32 rounded-xl border-border/80 bg-card p-3.5 sm:p-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 resize-none shadow-2xs"
          />
        </div>
      </div>

      {/* Bottom Controls Row */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:pl-14">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onAttachClick}
            aria-label="Attach files"
            title="Attach files"
            className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            <CloudUpload className="size-4.5" />
          </button>

          <button
            type="button"
            onClick={onSettingsClick}
            aria-label="Message preferences"
            title="Message preferences"
            className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            <Settings className="size-4.5" />
          </button>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onCancel}
            className="h-9 px-4 sm:px-5 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            CANCEL
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onSendMessage}
            trailingIcon={<ArrowRight className="size-3.5" />}
            className="h-9 px-4 sm:px-5 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-xs"
          >
            SEND MESSAGE
          </Button>
        </div>
      </div>
    </div>
  );
}

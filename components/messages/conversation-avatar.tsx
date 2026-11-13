"use client";

import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type {
  ConversationAvatarProps,
  ConversationAvatarVariant,
} from "./types";

const AVATAR_VARIANT_STYLES: Record<ConversationAvatarVariant, string> = {
  primary: "bg-primary text-primary-foreground",
  info: "bg-info text-info-foreground",
  warning: "bg-warning text-warning-foreground",
  success: "bg-success text-success-foreground",
  secondary: "bg-secondary text-secondary-foreground border border-border",
};

const AVATAR_SIZE_STYLES = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-11 text-sm",
} as const;

export function ConversationAvatar({
  name,
  initials,
  variant = "primary",
  avatarUrl,
  isOnline = false,
  size = "md",
  className,
}: ConversationAvatarProps) {
  return (
    <div className={cn("relative shrink-0 inline-flex", className)}>
      {avatarUrl ? (
        <FallbackImage
          src={avatarUrl}
          alt={name}
          width={44}
          height={44}
          fallbackType="user"
          variant="avatar"
          className={cn(
            "rounded-full object-cover border border-border",
            AVATAR_SIZE_STYLES[size]
          )}
        />
      ) : (
        <div
          className={cn(
            "rounded-full font-bold flex items-center justify-center select-none",
            AVATAR_SIZE_STYLES[size],
            AVATAR_VARIANT_STYLES[variant]
          )}
        >
          {initials}
        </div>
      )}

      {isOnline && (
        <span
          aria-label="Online"
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-success border-2 border-card",
            size === "sm" ? "size-2.5" : "size-3"
          )}
        />
      )}
    </div>
  );
}


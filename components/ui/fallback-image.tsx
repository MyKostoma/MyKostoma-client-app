"use client";

import { useState, useEffect, type ImgHTMLAttributes } from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";
import {
  Building2,
  Image as ImageIcon,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type FallbackType = "user" | "company" | "portfolio" | "general";

export interface FallbackImageProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: FallbackType;
  fallbackIcon?: LucideIcon;
  variant?: "card" | "avatar";
  fallbackClassName?: string;
}

const GENERIC_ALT_LABELS = new Set([
  "avatar",
  "user",
  "profile",
  "image",
  "placeholder",
  "client",
  "professional",
]);

function extractInitials(alt?: string): string | null {
  if (!alt) return null;
  const cleaned = alt.trim();
  if (!cleaned || GENERIC_ALT_LABELS.has(cleaned.toLowerCase())) {
    return null;
  }
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function FallbackImage({
  src,
  alt,
  className,
  fallbackType = "general",
  fallbackIcon,
  variant = "card",
  fallbackClassName,
  onError,
  ...props
}: FallbackImageProps) {
  const [hasError, setHasError] = useState<boolean>(!src);

  useEffect(() => {
    setHasError(!src);
  }, [src]);

  const IconComponent =
    fallbackIcon ??
    (fallbackType === "user"
      ? User
      : fallbackType === "company"
        ? Building2
        : ImageIcon);

  if (variant === "avatar") {
    const initials = fallbackType === "user" ? extractInitials(alt) : null;

    return (
      <AvatarPrimitive.Root
        className={cn(
          "relative inline-flex size-full shrink-0 overflow-hidden rounded-full bg-secondary align-middle select-none",
          className
        )}
      >
        {src && !hasError && (
          <AvatarPrimitive.Image
            src={src}
            alt={alt || "Avatar"}
            onError={(e) => {
              setHasError(true);
              onError?.(e);
            }}
            className="aspect-square size-full object-cover"
            {...props}
          />
        )}
        <AvatarPrimitive.Fallback
          delayMs={0}
          aria-label={alt || "Avatar"}
          className={cn(
            "flex size-full items-center justify-center bg-secondary text-muted-foreground font-bold tracking-tight select-none",
            initials && "bg-primary/10 text-primary text-xs",
            fallbackClassName
          )}
        >
          {initials ? (
            <span>{initials}</span>
          ) : (
            <IconComponent className="size-1/2 max-w-5 max-h-5 shrink-0" />
          )}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt || "Placeholder"}
        className={cn(
          "w-full h-full flex items-center justify-center bg-secondary/80 text-muted-foreground select-none",
          className,
          fallbackClassName
        )}
      >
        <div className="size-10 sm:size-12 rounded-full bg-card border border-border/80 flex items-center justify-center shadow-2xs text-muted-foreground/80 shrink-0">
          <IconComponent className="size-5 sm:size-6 shrink-0" />
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        setHasError(true);
        onError?.(e);
      }}
      className={className}
      {...props}
    />
  );
}

export default FallbackImage;

"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Building2,
  Image as ImageIcon,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type FallbackType = "user" | "company" | "portfolio" | "general";

export interface FallbackImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: FallbackType;
  fallbackIcon?: LucideIcon;
  variant?: "card" | "avatar";
  fallbackClassName?: string;
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

  // If the src changes, reset error state so we attempt to load the new image
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

  if (!src || hasError) {
    if (variant === "avatar") {
      return (
        <div
          role="img"
          aria-label={alt || "Avatar"}
          className={cn(
            "w-full h-full flex items-center justify-center bg-secondary text-muted-foreground select-none shrink-0",
            fallbackClassName
          )}
        >
          <IconComponent className="size-1/2 max-w-6 max-h-6 shrink-0" />
        </div>
      );
    }

    // Default "card" variant: centered pill badge inside the card's image area
    return (
      <div
        role="img"
        aria-label={alt || "Placeholder"}
        className={cn(
          "w-full h-full flex items-center justify-center bg-secondary/80 text-muted-foreground select-none",
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


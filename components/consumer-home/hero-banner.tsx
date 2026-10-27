"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blackYouthsTalking } from "@/lib";
import { cn } from "@/lib/utils";
import type { ConsumerHeroBannerProps } from "./types";

export function ConsumerHeroBanner({
  badgeText = "VERIFIED EXCELLENCE",
  title = "Find the perfect professional for your home.",
  subtitle = "Trusted plumbers, electricians, and interior designers, all vetted by the MyKostoma community for quality and reliability.",
  primaryButtonText = "Browse All Pros",
  secondaryButtonText = "How it Works",
  referenceId = "ID: MK-2024-X89",
  backgroundImage = blackYouthsTalking,
  onPrimaryClick,
  onSecondaryClick,
  className,
  ...props
}: ConsumerHeroBannerProps) {
  const imgSrc =
    typeof backgroundImage === "string"
      ? backgroundImage
      : backgroundImage?.src || "/images/black_youths_talking.jpg";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden rounded-2xl sm:rounded-3xl min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center border border-border/50 shadow-xs",
        className
      )}
      {...props}
    >
      <img
        src={imgSrc}
        alt="Verified professionals collaborating"
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-transparent"
      />

      <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14 max-w-xl space-y-5">
        {badgeText && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest shadow-2xs select-none">
            {badgeText}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-primary-foreground tracking-tight leading-[1.12]">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xs sm:text-sm lg:text-base text-primary-foreground/85 leading-relaxed max-w-md">
            {subtitle}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            variant="default"
            size="default"
            onClick={onPrimaryClick}
            trailingIcon={<ChevronRight className="size-4" />}
            className="h-11 px-6 text-xs sm:text-sm font-semibold rounded-lg shadow-xs"
          >
            {primaryButtonText}
          </Button>

          <Button
            variant="ghost"
            size="default"
            onClick={onSecondaryClick}
            className="h-11 px-6 text-xs sm:text-sm font-semibold rounded-lg bg-primary-foreground/15 hover:bg-primary-foreground/25 active:bg-primary-foreground/30 text-primary-foreground border border-primary-foreground/20 backdrop-blur-xs"
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>

      {/* {referenceId && (
        <div className="hidden sm:inline-flex absolute bottom-4 right-5 z-10 px-2.5 py-1 rounded-md bg-primary-foreground/20 backdrop-blur-xs border border-primary-foreground/25 text-[10px] font-medium text-primary-foreground/90 select-none">
          {referenceId}
        </div>
      )} */}
    </section>
  );
}

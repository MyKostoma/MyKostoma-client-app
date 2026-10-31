"use client";

import * as React from "react";
import { ArrowRight, Paintbrush, Sun } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { SpotlightProviderItem } from "./types";

export interface SpotlightProviderCardProps {
  item: SpotlightProviderItem;
  className?: string;
}

export function SpotlightProviderCard({
  item,
  className,
}: SpotlightProviderCardProps) {
  const Icon = item.icon ?? Paintbrush;

  return (
    <button
      type="button"
      onClick={() => item.onClick?.(item.id)}
      className={cn(
        "group w-full rounded-xl bg-background/8 hover:bg-background/14 border border-background/15 p-3.5",
        "flex items-center justify-between gap-4 transition-all text-left cursor-pointer",
        className
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="size-10 rounded-lg bg-card text-foreground flex items-center justify-center shrink-0 shadow-2xs">
          <Icon className="size-4 text-muted-foreground" />
        </div>

        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-bold text-background leading-tight truncate">
            {item.name}
          </p>
          <p className="text-[11px] text-background/60 mt-0.5 truncate">
            {item.category}
          </p>
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-success shrink-0">
        <span>{item.matchText}</span>
        <ArrowRight className="size-3.5 text-background/60 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </button>
  );
}

export interface TopRatedSpotlightSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  spotlightImageUrl?: string;
  spotlightImageAlt?: string;
  providers: SpotlightProviderItem[];
}

export function TopRatedSpotlightSection({
  title = "Top Rated in Manhattan",
  description = "We've identified the absolute best service providers in the Manhattan area based on over 10,000 community reviews and background checks.",
  spotlightImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
  spotlightImageAlt = "Modern renovated Manhattan interior",
  providers,
  className,
  ...props
}: TopRatedSpotlightSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full rounded-3xl bg-foreground text-background p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs",
        className
      )}
      {...props}
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-chart-5 text-primary-foreground flex items-center justify-center shrink-0 shadow-xs">
              <Sun className="size-4.5" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-background">
              {title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-background/70 leading-relaxed max-w-md">
            {description}
          </p>

          <div className="space-y-3 pt-2 max-w-lg">
            {providers.map((provider) => (
              <SpotlightProviderCard key={provider.id} item={provider} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden border border-background/15 shadow-lg aspect-4/3 bg-secondary/20">
            <FallbackImage
              src={spotlightImageUrl}
              alt={spotlightImageAlt}
              fallbackType="portfolio"
              className="w-full h-full object-cover select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Check, Heart, MapPin, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SearchProfessionalItem } from "./types";

export interface SearchResultStudioCardProps {
  professional: SearchProfessionalItem;
  onBookNow?: (id: string) => void;
  onMessageClick?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  className?: string;
}

export function SearchResultStudioCard({
  professional: pro,
  onBookNow,
  onMessageClick,
  onToggleFavorite,
  className,
}: SearchResultStudioCardProps) {
  const isCompany = pro.verification === "company";

  return (
    <article
      className={cn(
        "group bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xs hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-secondary">
        <img
          src={pro.imageUrl}
          alt={pro.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
        />

        {pro.isTopRated && (
          <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/95 backdrop-blur-xs text-foreground text-[10px] font-bold uppercase tracking-wider shadow-xs select-none">
            <Heart className="size-3 fill-foreground text-foreground shrink-0" />
            <span>TOP RATED</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => onToggleFavorite?.(pro.id)}
          aria-label={`Save ${pro.name}`}
          className="absolute top-3.5 right-3.5 size-8 rounded-full bg-card/90 hover:bg-card text-muted-foreground hover:text-primary backdrop-blur-xs shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              pro.isFavorite && "fill-primary text-primary"
            )}
          />
        </button>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug truncate">
                {pro.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {pro.subtitle}
              </p>
            </div>

            <span
              title={isCompany ? "Company Verified" : "Individual Verified"}
              className="size-8 rounded-full bg-info-bg flex items-center justify-center shrink-0"
            >
              <span
                className={cn(
                  "size-4.5 rounded-full flex items-center justify-center text-primary-foreground",
                  isCompany ? "bg-info" : "bg-warning"
                )}
              >
                <Check className="size-2.5 stroke-[3]" />
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-3.5">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5 shrink-0 text-muted-foreground/80" />
              <span>{pro.location}</span>
            </span>

            <span className="text-border select-none">•</span>

            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 text-warning fill-warning shrink-0" />
              <span className="font-bold text-foreground">
                {pro.rating.toFixed(1)}
              </span>
              {pro.reviewCount !== undefined && (
                <span className="text-muted-foreground">
                  ({pro.reviewCount})
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="default"
            size="default"
            onClick={() => onBookNow?.(pro.id)}
            className="flex-1 h-10 text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs"
          >
            BOOK NOW
          </Button>

          <button
            type="button"
            onClick={() => onMessageClick?.(pro.id)}
            aria-label={`Message ${pro.name}`}
            className="size-10 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-2xs"
          >
            <MessageSquare className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

"use client";

import {
  BadgeCheck,
  Building2,
  Check,
  Heart,
  MapPin,
  MessageSquare,
  Plus,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FeaturedProItem } from "./types";
import type { SearchProfessionalItem } from "@/components/consumer-search/types";

export type ProfessionalCardVariant = "default" | "horizontal" | "studio";

export type ProfessionalCardData = FeaturedProItem | SearchProfessionalItem;

export interface ProfessionalCardProps {
  professional: ProfessionalCardData;
  variant?: ProfessionalCardVariant;
  onViewDetails?: (id: string) => void;
  onBookNow?: (id: string) => void;
  onMessageClick?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  className?: string;
}

function isSearchProItem(
  pro: ProfessionalCardData
): pro is SearchProfessionalItem {
  return "verification" in pro || "subtitle" in pro;
}

export function ProfessionalCard({
  professional: pro,
  variant = "default",
  onViewDetails,
  onBookNow,
  onMessageClick,
  onToggleFavorite,
  className,
}: ProfessionalCardProps) {
  const isCompany = isSearchProItem(pro)
    ? pro.verification === "company"
    : pro.badgeVariant === "corporate";

  const subtitle = isSearchProItem(pro) ? pro.subtitle : pro.specialty;
  const formattedRating =
    typeof pro.rating === "number" ? pro.rating.toFixed(1) : pro.rating;

  if (variant === "horizontal") {
    const handleAction = () => {
      if (onViewDetails) {
        onViewDetails(pro.id);
      } else if (!isSearchProItem(pro) && pro.onBookClick) {
        pro.onBookClick(pro.id);
      }
    };

    return (
      <article
        className={cn(
          "group h-full bg-card border border-border rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-2xs hover:shadow-md transition-all duration-200",
          className
        )}
      >
        <div className="relative w-full sm:w-44 md:w-48 h-48 sm:h-auto sm:self-stretch shrink-0 overflow-hidden bg-secondary">
          <img
            src={pro.imageUrl}
            alt={pro.name}
            className="w-full h-full sm:absolute sm:inset-0 object-cover group-hover:scale-105 transition-transform duration-300 select-none"
          />
        </div>

        <div className="p-4 sm:p-5 flex flex-col flex-1 min-w-0 justify-between gap-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-bold text-foreground tracking-tight leading-snug line-clamp-1">
                {pro.name}
              </h3>

              <span
                title={isCompany ? "Company Verified" : "Individual Verified"}
                className={cn(
                  "size-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-primary-foreground shadow-2xs",
                  isCompany ? "bg-info" : "bg-warning"
                )}
              >
                <Check className="size-2.5 stroke-[3]" />
              </span>
            </div>

            <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-1">
              {subtitle}
            </p>
          </div>

          <div className="pt-2.5 border-t border-border/60 space-y-3">
            <div className="flex items-center gap-1.5 text-xs min-w-0">
              <span className="inline-flex items-center gap-1 font-bold text-foreground shrink-0">
                <Star className="size-3.5 text-warning fill-warning shrink-0" />
                {formattedRating}
              </span>
              <span className="text-border select-none shrink-0">•</span>
              <span className="text-muted-foreground truncate">
                {pro.location}
              </span>
            </div>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleAction}
              className="w-full h-9 text-xs font-semibold rounded-lg"
            >
              View Details
            </Button>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "studio") {
    const isTopRated = isSearchProItem(pro) ? pro.isTopRated : false;
    const isFavorite = isSearchProItem(pro) ? pro.isFavorite : false;
    const reviewCount = isSearchProItem(pro) ? pro.reviewCount : undefined;

    const handleBook = () => {
      if (onBookNow) {
        onBookNow(pro.id);
      } else if (!isSearchProItem(pro) && pro.onBookClick) {
        pro.onBookClick(pro.id);
      }
    };

    return (
      <article
        className={cn(
          "group h-full bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xs hover:shadow-md transition-all duration-200",
          className
        )}
      >
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-secondary shrink-0">
          <img
            src={pro.imageUrl}
            alt={pro.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
          />

          {isTopRated && (
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
                isFavorite && "fill-primary text-primary"
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
                  {subtitle}
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
                  {formattedRating}
                </span>
                {reviewCount !== undefined && (
                  <span className="text-muted-foreground">
                    ({reviewCount})
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="default"
              size="default"
              onClick={handleBook}
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

  // Default variant ("default")
  const badgeText = !isSearchProItem(pro)
    ? pro.badgeText
    : isCompany
    ? "CORPORATE PARTNER"
    : "VERIFIED PRO";
  const showQuickAction = !isSearchProItem(pro) ? pro.showQuickAction : false;
  const statLabel = !isSearchProItem(pro) ? pro.statLabel : "REVIEWS";
  const statValue = !isSearchProItem(pro)
    ? pro.statValue
    : `${pro.reviewCount ?? 0} Reviews`;
  const ctaText = !isSearchProItem(pro) ? pro.ctaText ?? "Book Now" : "Book Now";

  const handleBookClick = () => {
    if (onBookNow) {
      onBookNow(pro.id);
    } else if (!isSearchProItem(pro)) {
      pro.onBookClick?.(pro.id);
    }
  };

  return (
    <article
      className={cn(
        "group h-full bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xs hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <div className="relative h-48 w-full overflow-hidden bg-secondary shrink-0">
        <img
          src={pro.imageUrl}
          alt={pro.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
        />

        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-card/95 backdrop-blur-xs text-foreground text-[9px] font-bold uppercase tracking-wider shadow-xs select-none">
          {isCompany ? (
            <Building2 className="size-3 text-info shrink-0" />
          ) : (
            <BadgeCheck className="size-3.5 text-warning shrink-0" />
          )}
          <span>{badgeText}</span>
        </div>

        {showQuickAction && !isSearchProItem(pro) && (
          <button
            type="button"
            onClick={() => pro.onQuickActionClick?.(pro.id)}
            aria-label={`Quick save ${pro.name}`}
            className="absolute bottom-3 right-3 size-8 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-md flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
          >
            <Plus className="size-4 stroke-[2.5]" />
          </button>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-foreground tracking-tight leading-snug">
              {pro.name}
            </h3>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-warning-bg text-warning text-[11px] font-bold shrink-0">
              {formattedRating}
              <Star className="size-2.5 fill-current" />
            </span>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-1">
            {subtitle}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2.5">
            <MapPin className="size-3.5 shrink-0 text-muted-foreground/80" />
            <span className="truncate">{pro.location}</span>
          </div>
        </div>

        <div className="pt-3.5 border-t border-border/70 flex items-center justify-between gap-2">
          <div>
            <span className="block text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              {statLabel}
            </span>
            <span className="text-xs font-bold text-foreground">
              {statValue}
            </span>
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={handleBookClick}
            className="h-8 px-3.5 text-xs font-semibold rounded-md shadow-2xs"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ProfessionalCard;

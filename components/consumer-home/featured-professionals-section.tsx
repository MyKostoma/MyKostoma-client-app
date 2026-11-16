"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";
import type { FeaturedProItem } from "./types";
import ProfessionalCard from "./professional-card";
import { HTMLAttributes, useRef, useState, useCallback, useEffect } from "react";

export interface FeaturedProfessionalsSectionProps
  extends HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  professionals: FeaturedProItem[];
}

export function FeaturedProfessionalsSection({
  title = "Featured Professionals",
  subtitle = "Top-rated and verified partners chosen for quality service.",
  actionLabel,
  actionHref,
  onActionClick,
  professionals,
  className,
  ...props
}: FeaturedProfessionalsSectionProps) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons, professionals.length]);

  const scrollByOneCard = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstCard = container.firstElementChild as HTMLElement | null;
    const gap = 24; // gap-6 = 24px
    const scrollStep = firstCard ? firstCard.offsetWidth + gap : 300;

    container.scrollBy({
      left: direction === "left" ? -scrollStep : scrollStep,
      behavior: "smooth",
    });
  };

  return (
    <section className={cn("w-full space-y-6", className)} {...props}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          actionLabel={actionLabel}
          actionHref={actionHref}
          onActionClick={onActionClick}
          className="flex-1"
        />

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollByOneCard("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll previous professional"
            className={cn(
              "size-9 rounded-full border border-border bg-card text-foreground shadow-2xs flex items-center justify-center transition-all cursor-pointer",
              "hover:bg-secondary hover:border-primary/40 active:scale-95",
              "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed"
            )}
          >
            <ChevronLeft className="size-4.5" />
          </button>

          <button
            type="button"
            onClick={() => scrollByOneCard("right")}
            disabled={!canScrollRight}
            aria-label="Scroll next professional"
            className={cn(
              "size-9 rounded-full border border-border bg-card text-foreground shadow-2xs flex items-center justify-center transition-all cursor-pointer",
              "hover:bg-secondary hover:border-primary/40 active:scale-95",
              "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed"
            )}
          >
            <ChevronRight className="size-4.5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className={cn(
          "flex flex-nowrap gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden no-scrollbar"
        )}
      >
        {professionals.map((pro) => (
          <div
            key={pro.id}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-start"
          >
            <ProfessionalCard
              professional={pro}
              onBookNow={(id) => router.push(`/profile/${id}`)}
              onViewDetails={(id) => router.push(`/profile/${id}`)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

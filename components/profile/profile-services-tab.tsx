"use client";

import { ChevronRight, Clock, Plus, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Input } from "@/components/ui/form-fields";
import type { ProfileServicesTabProps } from "./types";

export function ProfileServicesTab({
  services,
  searchQuery,
  isOwner = false,
  onSearchChange,
  onBookService,
  onInquireService,
  onManageService,
  onAddNewService,
}: ProfileServicesTabProps) {
  return (
    <section aria-label="Services catalog" className="space-y-5">
      {/* Top Search & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="w-full sm:max-w-sm">
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search services..."
            leadingIcon={<Search className="size-4" />}
            className="h-10 rounded-xl bg-card"
          />
        </div>

        {isOwner && onAddNewService && (
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onAddNewService}
            leadingIcon={<Plus className="size-3.5" />}
            className="h-10 px-4 rounded-xl text-xs font-semibold shadow-xs shrink-0"
          >
            Add Service
          </Button>
        )}
      </div>

      {services.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center space-y-2 shadow-2xs">
          <p className="text-sm font-semibold text-foreground">
            No matching services found
          </p>
          <p className="text-xs text-muted-foreground">
            Try clearing your search query to view all available services.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => {
            const badgeTags =
              service.categoryTags && service.categoryTags.length > 0
                ? service.categoryTags
                : service.tags.slice(0, 2);

            return (
              <article
                key={service.id}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-5"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-44 md:w-36 aspect-4/3 md:aspect-square rounded-xl border border-border bg-secondary overflow-hidden shrink-0">
                  <FallbackImage
                    src={service.imageUrl}
                    alt={service.title}
                    fallbackType="portfolio"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="space-y-1.5">
                    {badgeTags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {badgeTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-secondary text-muted-foreground text-[9px] font-bold uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] sm:text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5 shrink-0" />
                      <span>
                        {service.deliveryTime ||
                          service.tags[0] ||
                          "Flexible Timeline"}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <RefreshCw className="size-3.5 shrink-0" />
                      <span>
                        {service.revisionsLabel ||
                          service.tags[1] ||
                          "Revisions Included"}
                      </span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {isOwner ? (
                      <>
                        <Button
                          type="button"
                          variant="default"
                          size="sm"
                          onClick={() => onManageService(service)}
                          className="h-9 px-5 rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-xs"
                        >
                          MANAGE SERVICE
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => onInquireService(service)}
                          className="h-9 px-5 rounded-lg text-[11px] font-bold uppercase tracking-wider"
                        >
                          PREVIEW INQUIRY
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="button"
                          variant="default"
                          size="sm"
                          onClick={() => onBookService(service)}
                          className="h-9 px-5 rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-xs"
                        >
                          BOOK NOW
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => onInquireService(service)}
                          className="h-9 px-5 rounded-lg text-[11px] font-bold uppercase tracking-wider"
                        >
                          INQUIRE
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Price Column */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-border/60 shrink-0">
                  <div className="flex items-center gap-1.5 md:text-right">
                    <div>
                      <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {service.priceLabel}
                      </span>
                      <span className="block text-lg sm:text-xl font-extrabold text-foreground tracking-tight mt-0.5">
                        {service.priceValue}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        isOwner
                          ? onManageService(service)
                          : onBookService(service)
                      }
                      aria-label={`Open ${service.title}`}
                      className="hidden md:flex p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

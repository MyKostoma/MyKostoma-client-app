"use client";

import {
  Briefcase,
  Check,
  Heart,
  MapPin,
  MessageSquare,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { ConsumerSavedProsSectionProps } from "../types";

export function ConsumerSavedProsSection({
  professionals,
  onViewProfile,
  onMessagePro,
  onRemoveSavedPro,
  onExplorePros,
}: ConsumerSavedProsSectionProps) {
  return (
    <section aria-label="Saved professionals" className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            Saved &amp; Followed Professionals
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Artisans and verified studios you shortlisted for upcoming projects.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onExplorePros}
          leadingIcon={<Search className="size-3.5" />}
          className="h-10 px-4 rounded-xl text-xs font-semibold shrink-0 self-start sm:self-center"
        >
          Find More Pros
        </Button>
      </div>

      {professionals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center space-y-3 shadow-2xs">
          <div className="size-12 rounded-2xl bg-secondary text-muted-foreground flex items-center justify-center mx-auto">
            <Heart className="size-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground">
              No saved professionals yet
            </p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Follow professionals or verified companies while browsing so you
              can re-book or request quotes effortlessly.
            </p>
          </div>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onExplorePros}
            className="h-9 px-5 rounded-xl text-xs font-semibold"
          >
            Browse Professionals
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {professionals.map((pro) => {
            const isCompany = pro.verificationType === "company";

            return (
              <article
                key={pro.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-2xs flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {isCompany && !pro.avatarUrl && pro.logoMonogram ? (
                        <div className="size-12 rounded-xl bg-foreground text-background flex items-center justify-center font-extrabold text-sm shrink-0">
                          {pro.logoMonogram}
                        </div>
                      ) : (
                        <div className="size-12 rounded-xl border border-border bg-secondary overflow-hidden shrink-0">
                          <FallbackImage
                            src={pro.avatarUrl}
                            alt={pro.name}
                            fallbackType={isCompany ? "company" : "user"}
                            variant="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-foreground truncate">
                          {pro.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {pro.roleTitle}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveSavedPro(pro.id)}
                      aria-label={`Remove ${pro.name} from saved pros`}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-error-bg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>

                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider w-fit",
                      isCompany
                        ? "bg-info-bg border-info/25 text-info"
                        : "bg-warning-bg border-warning/25 text-warning"
                    )}
                  >
                    {isCompany ? (
                      <Briefcase className="size-3 shrink-0" />
                    ) : (
                      <Check className="size-3 shrink-0" />
                    )}
                    <span>{pro.verificationLabel}</span>
                  </span>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                      <Star className="size-3.5 text-warning fill-warning shrink-0" />
                      <span>{pro.rating.toFixed(1)}</span>
                      <span className="font-normal text-muted-foreground">
                        ({pro.reviewCount})
                      </span>
                    </span>

                    <span className="inline-flex items-center gap-1 truncate">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="truncate">{pro.location}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-3 border-t border-border/70">
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={() => onViewProfile(pro.id)}
                    className="flex-1 h-9 rounded-lg text-xs font-semibold shadow-xs"
                  >
                    View Profile
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onMessagePro(pro.id)}
                    leadingIcon={<MessageSquare className="size-3.5" />}
                    className="h-9 px-3 rounded-lg text-xs font-semibold"
                  >
                    Message
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

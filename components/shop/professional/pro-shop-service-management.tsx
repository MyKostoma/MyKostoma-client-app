"use client";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pause,
  Play,
  Plus,
  ShoppingCart,
  SquarePen,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { ProShopServiceItem } from "../types";

export interface ProShopServiceManagementWorkspaceProps {
  service: ProShopServiceItem;
  activeImageIndex: number;
  onSelectImage: (idx: number) => void;
  onEditService: () => void;
  onTogglePublish: () => void;
  onRequestDelete: () => void;
  onViewAnalytics: () => void;
}

export function ProShopServiceManagementWorkspace({
  service,
  activeImageIndex,
  onSelectImage,
  onEditService,
  onTogglePublish,
  onRequestDelete,
  onViewAnalytics,
}: ProShopServiceManagementWorkspaceProps) {
  const images =
    service.galleryImages.length > 0
      ? service.galleryImages
      : [service.coverImageUrl];
  const safeIndex = Math.min(activeImageIndex, images.length - 1);
  const activeImage = images[safeIndex];
  const isPublished = service.status === "active";

  const handlePrev = () => {
    onSelectImage(safeIndex <= 0 ? images.length - 1 : safeIndex - 1);
  };

  const handleNext = () => {
    onSelectImage(safeIndex >= images.length - 1 ? 0 : safeIndex + 1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8 space-y-6">
        <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
          <div className="relative aspect-[16/10] w-full bg-secondary/40 overflow-hidden">
            {activeImage ? (
              <FallbackImage
                src={activeImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                Main Service Image
              </div>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={handlePrev}
                  className="size-8 rounded-full bg-card/90 border border-border flex items-center justify-center text-foreground hover:bg-card transition-colors shadow-xs cursor-pointer"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={handleNext}
                  className="size-8 rounded-full bg-card/90 border border-border flex items-center justify-center text-foreground hover:bg-card transition-colors shadow-xs cursor-pointer"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border/70 grid grid-cols-4 gap-3">
            {images.slice(0, 3).map((imgUrl, idx) => (
              <button
                key={`${imgUrl}-${idx}`}
                type="button"
                onClick={() => onSelectImage(idx)}
                className={cn(
                  "relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-secondary/40",
                  idx === safeIndex
                    ? "border-primary shadow-2xs"
                    : "border-transparent hover:border-border"
                )}
              >
                <FallbackImage
                  src={imgUrl}
                  alt={`${service.title} preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}

            <button
              type="button"
              onClick={onEditService}
              aria-label="Add or manage service images"
              className="aspect-[4/3] rounded-xl border-2 border-dashed border-border bg-secondary/20 hover:bg-secondary/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Plus className="size-5" />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-border/70">
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-extrabold text-foreground">
                Service Description
              </h2>
              <p className="text-xs text-muted-foreground">
                {service.category} • {service.packageLabel}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-lg sm:text-xl font-extrabold text-foreground">
                {service.priceFormatted}
              </p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                {service.priceUnitLabel}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                DELIVERY TIME
              </p>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                {service.deliveryLabel}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                REVISIONS
              </p>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                {service.revisionsLabel}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              ABOUT THIS SERVICE
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {service.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-[10px] font-bold uppercase tracking-wider text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-5">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            MANAGEMENT ACTIONS
          </p>

          <div className="space-y-2.5">
            <Button
              type="button"
              variant="default"
              onClick={onEditService}
              leadingIcon={<SquarePen className="size-4" />}
              className="w-full h-10 rounded-xl text-xs font-bold shadow-xs"
            >
              Edit Service
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onTogglePublish}
              leadingIcon={
                isPublished ? (
                  <Pause className="size-3.5" />
                ) : (
                  <Play className="size-3.5" />
                )
              }
              className="w-full h-10 rounded-xl text-xs font-bold"
            >
              {isPublished ? "Unpublish Service" : "Publish Service"}
            </Button>
          </div>

          <div className="pt-3 border-t border-border/70">
            <button
              type="button"
              onClick={onRequestDelete}
              className="w-full py-2 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-error hover:bg-error-bg/50 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="size-3.5" />
              <span>Delete Service</span>
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            INSIGHTS (30 DAYS)
          </p>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                  <Eye className="size-4" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  Impressions
                </span>
              </div>
              <span className="text-sm font-extrabold text-foreground">
                {service.insights.impressions}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                  <ShoppingCart className="size-4" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  Orders
                </span>
              </div>
              <span className="text-sm font-extrabold text-foreground">
                {service.insights.orders}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-warning-bg flex items-center justify-center text-warning shrink-0">
                  <Star className="size-4 fill-warning" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  Avg. Rating
                </span>
              </div>
              <span className="text-sm font-extrabold text-foreground">
                {service.insights.avgRating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-border/70 text-center">
            <button
              type="button"
              onClick={onViewAnalytics}
              className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              VIEW DETAILED ANALYTICS
            </button>
          </div>
        </div>

        {service.latestReview && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              LATEST REVIEW
            </p>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <FallbackImage
                  src={service.latestReview.reviewerAvatarUrl}
                  alt={service.latestReview.reviewerName}
                  variant="avatar"
                  className="size-7 text-[10px]"
                />
                <span className="text-xs font-bold text-foreground truncate">
                  {service.latestReview.reviewerName}
                </span>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground shrink-0">
                <Star className="size-3 text-warning fill-warning" />
                <span>{service.latestReview.rating.toFixed(1)}</span>
              </span>
            </div>

            <p className="text-xs italic text-muted-foreground leading-relaxed">
              &ldquo;{service.latestReview.comment}&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { FallbackImage } from "@/components/ui/fallback-image";
import type { ShopServiceGalleryProps } from "./types";

export function ShopServiceGallery({
  images,
  title,
  activeIndex,
  onSelect,
  className,
}: ShopServiceGalleryProps) {
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-secondary shadow-2xs">
        <FallbackImage
          src={activeImage}
          alt={title}
          fallbackType="portfolio"
          className="size-full object-cover select-none"
        />
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`View preview ${index + 1}`}
            aria-current={index === activeIndex}
            className={cn(
              "relative aspect-video rounded-xl overflow-hidden border-2 bg-secondary transition-all cursor-pointer",
              index === activeIndex
                ? "border-primary shadow-xs"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <FallbackImage
              src={image}
              alt={`${title} preview ${index + 1}`}
              fallbackType="portfolio"
              className="size-full object-cover select-none"
            />
          </button>
        ))}
      </div>
    </div>
  );
}


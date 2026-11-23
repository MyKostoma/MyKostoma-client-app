"use client";

import { Check, Globe, Link2, MessageCircle, Play, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import type { ReelUploadSuccessProps } from "./types";

const SHARE_PLATFORMS = [
  { id: "Facebook", label: "Facebook", icon: Share2 },
  { id: "Copy Link", label: "Copy link", icon: Link2 },
  { id: "Instagram", label: "Instagram", icon: Globe },
  { id: "WhatsApp", label: "WhatsApp", icon: MessageCircle },
];

export function ReelUploadSuccess({
  title,
  thumbnailUrl,
  followersCountLabel,
  onViewReel,
  onDone,
  onSharePlatform,
}: ReelUploadSuccessProps) {
  return (
    <div className="max-w-lg mx-auto py-4 sm:py-6 space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-2xs text-center space-y-5">
        {/* Soft Halo Check Icon */}
        <div className="flex justify-center pt-1">
          <div className="size-16 rounded-full bg-success-bg flex items-center justify-center">
            <div className="size-11 rounded-full bg-success text-success-foreground flex items-center justify-center shadow-xs">
              <Check className="size-5 stroke-[2.75]" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Reel Uploaded Successfully!
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Your reel{" "}
            <strong className="font-semibold text-foreground">
              &ldquo;{title}&rdquo;
            </strong>{" "}
            is now live and being shared with your{" "}
            <strong className="font-bold text-success">
              {followersCountLabel}
            </strong>
            .
          </p>
        </div>

        {/* Uploaded Reel Thumbnail Preview */}
        <button
          type="button"
          onClick={onViewReel}
          aria-label={`Preview ${title}`}
          className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-black group cursor-pointer block"
        >
          <FallbackImage
            src={thumbnailUrl}
            alt={title}
            fallbackType="portfolio"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
            <span className="size-11 rounded-full bg-card/85 text-foreground flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Play className="size-4 ml-0.5 fill-current" />
            </span>
          </div>
        </button>

        {/* Actions */}
        <div className="space-y-2.5 pt-1">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onViewReel}
            className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
          >
            View Reel
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onDone}
            className="w-full h-10 rounded-xl text-xs sm:text-sm font-semibold"
          >
            Done
          </Button>
        </div>
      </div>

      {/* Share Row Below Card */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="text-[10px] font-bold uppercase tracking-wider">
          SHARE ON
        </span>

        <div className="flex items-center gap-2">
          {SHARE_PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                type="button"
                aria-label={`Share on ${platform.label}`}
                onClick={() => onSharePlatform(platform.id)}
                className="size-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center justify-center transition-colors cursor-pointer"
              >
                <Icon className="size-3.5" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

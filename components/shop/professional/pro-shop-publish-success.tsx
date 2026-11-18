"use client";

import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProShopPublishSuccessProps {
  onGoToMyShop: () => void;
  onViewService: () => void;
}

export function ProShopPublishSuccess({
  onGoToMyShop,
  onViewService,
}: ProShopPublishSuccessProps) {
  return (
    <div className="py-10 sm:py-16 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 sm:p-12 shadow-2xs flex flex-col items-center text-center space-y-6">
        <div className="size-16 rounded-full bg-success-bg flex items-center justify-center">
          <div className="size-10 rounded-full bg-success text-white flex items-center justify-center">
            <Check className="size-5 stroke-[2.5]" />
          </div>
        </div>

        <div className="space-y-2 max-w-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Service Published Successfully!
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Your service card is now live and visible to customers. You can
            manage it from your shop dashboard.
          </p>
        </div>

        <div className="w-full max-w-xs space-y-2.5 pt-1">
          <Button
            type="button"
            variant="default"
            onClick={onGoToMyShop}
            className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
          >
            Go to My Shop
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onViewService}
            className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold"
          >
            View Service
          </Button>
        </div>

        <div className="pt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
          <Share2 className="size-3" />
          <span>SHARE LINK COMING SOON</span>
        </div>
      </div>
    </div>
  );
}

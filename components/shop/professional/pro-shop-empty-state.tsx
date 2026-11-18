"use client";

import { ImageIcon, Plus, Store, Tag, Type } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProShopEmptyStateProps {
  onCreateService: () => void;
}

const GROWTH_TIPS = [
  {
    id: "tip-title",
    title: "Clear Title",
    description:
      "Use descriptive, keyword-rich titles that tell clients exactly what you offer at a glance.",
    icon: Type,
  },
  {
    id: "tip-images",
    title: "High-quality Images",
    description:
      "Visuals are the first thing clients see. Use bright, high-resolution photos of your best work.",
    icon: ImageIcon,
  },
  {
    id: "tip-pricing",
    title: "Competitive Pricing",
    description:
      "Research similar services to ensure your rates are attractive while reflecting your expertise.",
    icon: Tag,
  },
];

export function ProShopEmptyState({ onCreateService }: ProShopEmptyStateProps) {
  return (
    <div className="py-10 sm:py-16 flex flex-col items-center text-center space-y-12">
      <div className="flex flex-col items-center space-y-4 max-w-md">
        <div className="size-24 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
          <Store className="size-10" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            No services yet
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Create your first service card to start reaching customers and
            growing your business.
          </p>
        </div>

        <Button
          type="button"
          variant="default"
          onClick={onCreateService}
          leadingIcon={<Plus className="size-4" />}
          className="h-11 px-6 rounded-xl text-xs sm:text-sm font-bold shadow-xs mt-1"
        >
          Create Service Card
        </Button>
      </div>

      <div className="w-full max-w-3xl space-y-5">
        <div className="flex items-center gap-4">
          <span className="flex-1 h-px bg-border" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            HOW TO GROW YOUR SHOP
          </span>
          <span className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {GROWTH_TIPS.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-3"
              >
                <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                  <Icon className="size-4" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xs sm:text-sm font-extrabold text-foreground">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { FallbackImage } from "@/components/ui/fallback-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ShopProfessionalAboutProps } from "./types";

export function ShopProfessionalAbout({
  provider,
  onContact,
  className,
}: ShopProfessionalAboutProps) {
  const details = [
    { label: "From", value: provider.location },
    { label: "Response Time", value: provider.responseTime },
    { label: "Last Delivery", value: provider.lastDelivery },
  ];

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs",
        className
      )}
    >
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-primary">
        About the professional
      </h3>

      <div className="flex items-center gap-3">
        <div className="size-11 rounded-full overflow-hidden bg-secondary shrink-0">
          <FallbackImage
            src={provider.avatarUrl}
            alt={provider.name}
            variant="avatar"
            fallbackType="user"
            className="size-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground truncate">
            {provider.name}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Member since {provider.memberSince}
          </p>
        </div>
      </div>

      <dl className="space-y-2.5 text-xs">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex items-center justify-between gap-3"
          >
            <dt className="text-muted-foreground">{detail.label}</dt>
            <dd className="font-bold text-foreground text-right">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>

      <Button
        variant="default"
        size="default"
        onClick={onContact}
        className="w-full h-10 xl:h-10 text-xs font-bold uppercase tracking-wider rounded-lg"
      >
        Contact Me
      </Button>
    </div>
  );
}


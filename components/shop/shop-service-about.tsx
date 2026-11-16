"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShopServiceAboutProps } from "./types";

export function ShopServiceAbout({
  paragraphs,
  deliverables,
  className,
}: ShopServiceAboutProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
        About This Service
      </h2>

      <div className="space-y-3">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="space-y-3 pt-1">
        <h3 className="text-xs sm:text-sm font-bold text-foreground">
          Deliverables included in this package:
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
          {deliverables.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-xs text-muted-foreground"
            >
              <ArrowRight className="size-3.5 text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


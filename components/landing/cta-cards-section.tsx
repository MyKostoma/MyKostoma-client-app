"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CtaCardItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export interface CtaCardsSectionProps extends React.HTMLAttributes<HTMLElement> {
  cards: CtaCardItem[];
}

function CtaCard({ card }: { card: CtaCardItem }) {
  return (
    <div className="rounded-3xl bg-secondary/40 border border-border/60 p-8 sm:p-10 flex flex-col justify-between items-start min-h-[220px] space-y-6 shadow-2xs hover:shadow-xs transition-shadow">
      <div className="space-y-3">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {card.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
          {card.description}
        </p>
      </div>

      <Button
        variant="default"
        size="default"
        onClick={card.onButtonClick}
        className="h-10 px-5 text-sm font-semibold rounded-md shadow-xs"
      >
        {card.buttonText}
      </Button>
    </div>
  );
}

export function CtaCardsSection({
  cards,
  className,
  ...props
}: CtaCardsSectionProps) {
  return (
    <section
      className={cn(
        "w-full container px-6 sm:px-8 lg:px-12 pb-16 sm:pb-24",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {cards.map((card) => (
          <CtaCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

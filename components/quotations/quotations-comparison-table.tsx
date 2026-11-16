"use client";

import {
  BadgeCheck,
  Clock,
  MessageSquare,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuotationItem } from "./types";

export interface QuotationsComparisonTableProps {
  quotations: QuotationItem[];
  onAcceptQuote: (quotation: QuotationItem) => void;
  onViewDetail: (quotation: QuotationItem) => void;
  onRejectQuote: (quotation: QuotationItem) => void;
  className?: string;
}

const INFO_CARDS = [
  {
    id: "secure-payments",
    title: "Secure Payments",
    description:
      "Payments are held in escrow and only released when you sign off on a project milestone. Never pay a contractor directly outside the platform.",
    icon: ShieldCheck,
  },
  {
    id: "need-revision",
    title: "Need a Revision?",
    description:
      "You can message any professional to request a change to their quote before accepting. Revisions are tracked for your protection.",
    icon: MessageSquare,
  },
] as const;

export function QuotationsComparisonTable({
  quotations,
  onAcceptQuote,
  onViewDetail,
  onRejectQuote,
  className,
}: QuotationsComparisonTableProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-180">
            <thead>
              <tr className="border-b border-border bg-secondary/25">
                <th className="p-5 w-48 align-bottom text-[10px] font-bold uppercase tracking-wider text-muted-foreground select-none">
                  Specifications
                </th>
                {quotations.map((quote) => (
                  <th
                    key={quote.id}
                    className="p-5 border-l border-border/70 min-w-60 align-top"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-foreground tracking-tight">
                          {quote.providerName}
                        </span>
                        {quote.providerVerified && (
                          <BadgeCheck className="size-4 text-foreground fill-foreground/10 shrink-0" />
                        )}
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs">
                        <Star className="size-3.5 fill-foreground text-foreground" />
                        <span className="font-bold text-foreground">
                          {quote.rating.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">
                          ({quote.reviewsCount})
                        </span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-border/70 text-xs">
              <tr>
                <td className="p-5 font-bold text-foreground bg-secondary/10">
                  Total Price
                </td>
                {quotations.map((quote) => (
                  <td key={quote.id} className="p-5 border-l border-border/70">
                    <p className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
                      {quote.totalAmount}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {quote.priceSubtitle || "All-inclusive"}
                    </p>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-5 font-bold text-foreground bg-secondary/10">
                  Estimated Duration
                </td>
                {quotations.map((quote) => (
                  <td key={quote.id} className="p-5 border-l border-border/70">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                      <Clock className="size-3.5 text-muted-foreground" />
                      <span>{quote.estimatedDuration}</span>
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-5 font-bold text-foreground bg-secondary/10 align-top">
                  Proposal Summary
                </td>
                {quotations.map((quote) => (
                  <td
                    key={quote.id}
                    className="p-5 border-l border-border/70 text-muted-foreground leading-relaxed align-top"
                  >
                    {quote.proposalSummary}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-5 font-bold text-foreground bg-secondary/10">
                  Trust &amp; Safety
                </td>
                {quotations.map((quote) => (
                  <td key={quote.id} className="p-5 border-l border-border/70">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Warranty
                    </span>
                    <span className="font-semibold text-foreground mt-0.5 block">
                      {quote.warrantyLabel}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-5 font-bold text-foreground bg-secondary/10">
                  Platform Experience
                </td>
                {quotations.map((quote) => (
                  <td
                    key={quote.id}
                    className="p-5 border-l border-border/70 font-semibold text-foreground"
                  >
                    {quote.jobsCompleted} Jobs Completed
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-5 bg-secondary/10" />
                {quotations.map((quote) => (
                  <td
                    key={quote.id}
                    className="p-5 border-l border-border/70 space-y-2.5 text-center"
                  >
                    <Button
                      type="button"
                      variant="default"
                      size="sm"
                      onClick={() => onAcceptQuote(quote)}
                      className="w-full h-9 rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-xs"
                    >
                      Accept Quote
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetail(quote)}
                      className="w-full h-9 rounded-lg text-xs font-semibold"
                    >
                      View Detail
                    </Button>

                    <button
                      type="button"
                      onClick={() => onRejectQuote(quote)}
                      className="inline-block pt-1 text-xs font-semibold text-error hover:underline underline-offset-4 cursor-pointer"
                    >
                      Reject
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INFO_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="rounded-2xl border border-border bg-card p-5 flex items-start gap-3.5 shadow-2xs"
            >
              <div className="size-9 rounded-full bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
                <Icon className="size-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


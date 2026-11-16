"use client";

import { ChevronDown, Info, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNairaWithDecimals } from "@/features/quotations/services/quotationsHelpers";
import type {
  ProfessionalQuotationItem,
  ProfessionalUpdateQuoteFormValues,
} from "../types";

export interface ProUpdateQuoteFormProps {
  quotation: ProfessionalQuotationItem;
  values: ProfessionalUpdateQuoteFormValues;
  formattedTotal: string;
  onChange: (values: ProfessionalUpdateQuoteFormValues) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const DURATION_OPTIONS = [
  "1 Hour",
  "2 Hours",
  "3 Hours",
  "4 Hours",
  "6 Hours",
  "8 Hours",
  "1 Day",
  "2 Days",
  "1 Week",
  "2 Weeks",
];

export function ProUpdateQuoteForm({
  quotation,
  values,
  formattedTotal,
  onChange,
  onCancel,
  onSubmit,
}: ProUpdateQuoteFormProps) {
  const previousMaterialsFormatted = formatNairaWithDecimals(
    quotation.previousMaterialsCost ?? quotation.materialsCost
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="rounded-2xl border border-border bg-card shadow-2xs p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Update Quotation #{quotation.code}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Adjust your pricing or terms based on the consumer&apos;s request.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-secondary/40 p-4 flex items-start gap-3">
          <MessageSquare className="size-4 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground">
              CONSUMER FEEDBACK
            </p>
            <p className="text-xs italic text-muted-foreground leading-relaxed">
              &ldquo;
              {quotation.consumerFeedback ||
                "The total is a bit higher than my budget. Could you look into reducing the materials cost? I have some of the cleaning agents already at home."}
              &rdquo;
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label
              htmlFor="pro-update-service-fee"
              className="block text-[10px] font-bold uppercase tracking-wider text-foreground"
            >
              SERVICE FEE (₦)
            </label>
            <input
              id="pro-update-service-fee"
              type="text"
              value={values.serviceFee}
              onChange={(e) =>
                onChange({ ...values, serviceFee: e.target.value })
              }
              className="w-full h-11 px-3.5 rounded-lg border border-border bg-secondary/40 text-xs sm:text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="pro-update-materials-cost"
              className="block text-[10px] font-bold uppercase tracking-wider text-foreground"
            >
              MATERIALS COST (₦)
            </label>
            <input
              id="pro-update-materials-cost"
              type="text"
              placeholder="e.g. 3,500.00"
              value={values.materialsCost}
              onChange={(e) =>
                onChange({ ...values, materialsCost: e.target.value })
              }
              className="w-full h-11 px-3.5 rounded-lg border border-primary bg-card text-xs sm:text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <p className="text-[10px] text-muted-foreground">
              Previous: {previousMaterialsFormatted}
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="pro-update-logistics-cost"
              className="block text-[10px] font-bold uppercase tracking-wider text-foreground"
            >
              LOGISTICS/TRANSPORT (₦)
            </label>
            <input
              id="pro-update-logistics-cost"
              type="text"
              value={values.logisticsCost}
              onChange={(e) =>
                onChange({ ...values, logisticsCost: e.target.value })
              }
              className="w-full h-11 px-3.5 rounded-lg border border-border bg-secondary/40 text-xs sm:text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="pro-update-total-price"
              className="block text-[10px] font-bold uppercase tracking-wider text-foreground"
            >
              TOTAL PRICE (₦)
            </label>
            <input
              id="pro-update-total-price"
              type="text"
              readOnly
              value={formattedTotal}
              className="w-full h-11 px-3.5 rounded-lg border border-primary/30 bg-accent/40 text-xs sm:text-sm font-bold text-primary outline-none cursor-default"
            />
            <p className="text-[10px] text-primary">
              Auto-calculated from fields above
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="pro-update-duration"
              className="block text-[10px] font-bold uppercase tracking-wider text-foreground"
            >
              ESTIMATED DURATION
            </label>
            <div className="relative">
              <select
                id="pro-update-duration"
                value={values.estimatedDuration}
                onChange={(e) =>
                  onChange({ ...values, estimatedDuration: e.target.value })
                }
                className="w-full h-11 pl-3.5 pr-9 rounded-lg border border-border bg-card text-xs sm:text-sm font-medium text-foreground appearance-none outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                {DURATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="pro-update-validity"
              className="block text-[10px] font-bold uppercase tracking-wider text-foreground"
            >
              VALIDITY PERIOD
            </label>
            <input
              id="pro-update-validity"
              type="date"
              value={values.validityPeriod}
              onChange={(e) =>
                onChange({ ...values, validityPeriod: e.target.value })
              }
              className="w-full h-11 px-3.5 rounded-lg border border-border bg-card text-xs sm:text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="pro-update-note"
            className="block text-[10px] font-bold uppercase tracking-wider text-foreground"
          >
            PROFESSIONAL&apos;S UPDATED NOTE
          </label>
          <textarea
            id="pro-update-note"
            rows={4}
            value={values.updatedNote}
            onChange={(e) =>
              onChange({ ...values, updatedNote: e.target.value })
            }
            placeholder="Explain the adjustments made to your quotation..."
            className="w-full p-3.5 rounded-lg border border-border bg-card text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
          />
        </div>

        <div className="pt-4 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full sm:w-auto h-10 px-6 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="default"
            onClick={onSubmit}
            leadingIcon={<Send className="size-3.5" />}
            className="w-full sm:w-auto h-10 px-6 rounded-lg text-xs font-semibold shadow-xs"
          >
            Submit Updated Quote
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-2xs flex items-start gap-3.5">
        <div className="size-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
          <Info className="size-4" />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-foreground">
            IMPORTANT
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Once you submit this updated quotation, the client will be notified
            immediately. They can either accept the new price or request further
            changes. All previous versions are stored in the history log.
          </p>
        </div>
      </div>
    </div>
  );
}

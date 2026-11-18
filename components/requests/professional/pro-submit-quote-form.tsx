"use client";

import {
  ArrowLeft,
  Clock,
  Lightbulb,
  MapPin,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  ProfessionalRequestItem,
  ProfessionalSubmitQuoteFormValues,
} from "../types";

export interface ProSubmitQuoteFormProps {
  request: ProfessionalRequestItem;
  values: ProfessionalSubmitQuoteFormValues;
  totalMilestoneAllocationFormatted: string;
  onChange: (values: ProfessionalSubmitQuoteFormValues) => void;
  onAddMilestone: () => void;
  onRemoveMilestone: (id: string) => void;
  onUpdateMilestone: (
    id: string,
    field: "name" | "amount",
    value: string
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function ProSubmitQuoteForm({
  request,
  values,
  totalMilestoneAllocationFormatted,
  onChange,
  onAddMilestone,
  onRemoveMilestone,
  onUpdateMilestone,
  onSubmit,
  onCancel,
}: ProSubmitQuoteFormProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Request Details</span>
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Submit Your Quote
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Provide a detailed breakdown of your services and cost for the
            client.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs space-y-5">
            <h2 className="text-sm sm:text-base font-extrabold text-foreground pb-3 border-b border-border/70">
              General Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="pro-quote-total-price"
                  className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                >
                  TOTAL QUOTE PRICE
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                    ₦
                  </span>
                  <input
                    id="pro-quote-total-price"
                    type="text"
                    placeholder="0.00"
                    value={values.totalQuotePrice}
                    onChange={(e) =>
                      onChange({ ...values, totalQuotePrice: e.target.value })
                    }
                    className="w-full h-10 pl-8 pr-3.5 rounded-lg border border-border bg-card text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Total amount client will pay for the entire project.
                </p>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="pro-quote-duration"
                  className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                >
                  ESTIMATED DURATION
                </label>
                <div className="relative">
                  <Clock className="size-3.5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="pro-quote-duration"
                    type="text"
                    placeholder="e.g. 2 weeks, 5 days"
                    value={values.estimatedDuration}
                    onChange={(e) =>
                      onChange({
                        ...values,
                        estimatedDuration: e.target.value,
                      })
                    }
                    className="w-full h-10 pl-9 pr-3.5 rounded-lg border border-border bg-card text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Estimated time to complete the work.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="pro-quote-note"
                className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
              >
                PROFESSIONAL NOTE
              </label>
              <textarea
                id="pro-quote-note"
                rows={4}
                value={values.professionalNote}
                onChange={(e) =>
                  onChange({ ...values, professionalNote: e.target.value })
                }
                placeholder="Describe your approach, relevant experience, and why you're a good fit..."
                className="w-full p-3.5 rounded-lg border border-border bg-card text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/70">
              <h2 className="text-sm sm:text-base font-extrabold text-foreground">
                Staged Payment Proposal
              </h2>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onAddMilestone}
                leadingIcon={<Plus className="size-3.5" />}
                className="h-8 px-3 rounded-lg text-xs font-semibold shrink-0"
              >
                Add Milestone
              </Button>
            </div>

            <div className="space-y-3">
              {values.milestones.map((milestone, idx) => (
                <div
                  key={milestone.id}
                  className="rounded-xl border border-border/70 bg-secondary/35 p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
                >
                  <div className="sm:col-span-7 space-y-1.5">
                    <label
                      htmlFor={`milestone-name-${milestone.id}`}
                      className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      MILESTONE NAME
                    </label>
                    <input
                      id={`milestone-name-${milestone.id}`}
                      type="text"
                      placeholder={
                        idx === 0
                          ? "Initial Deposit & Material Sourcing"
                          : "e.g. Completion of Wiring"
                      }
                      value={milestone.name}
                      onChange={(e) =>
                        onUpdateMilestone(milestone.id, "name", e.target.value)
                      }
                      className="w-full h-10 px-3 rounded-lg border border-border bg-card text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-4 space-y-1.5">
                    <label
                      htmlFor={`milestone-amount-${milestone.id}`}
                      className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      AMOUNT (₦)
                    </label>
                    <input
                      id={`milestone-amount-${milestone.id}`}
                      type="text"
                      placeholder="0.00"
                      value={milestone.amount}
                      onChange={(e) =>
                        onUpdateMilestone(
                          milestone.id,
                          "amount",
                          e.target.value
                        )
                      }
                      className="w-full h-10 px-3 rounded-lg border border-border bg-card text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      aria-label="Remove milestone"
                      disabled={values.milestones.length <= 1}
                      onClick={() => onRemoveMilestone(milestone.id)}
                      className="size-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-error hover:bg-error-bg/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <div className="rounded-xl bg-secondary/50 border border-border/60 px-4 py-3.5 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-foreground">
                  Total Milestone Allocation:
                </span>
                <span className="text-sm font-extrabold text-foreground">
                  {totalMilestoneAllocationFormatted}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground text-right">
                Must equal Total Quote Price.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
            <div className="sm:col-span-8">
              <Button
                type="button"
                variant="default"
                onClick={onSubmit}
                className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
              >
                Submit Quote
              </Button>
            </div>
            <div className="sm:col-span-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full h-11 rounded-xl text-xs sm:text-sm font-semibold"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-5">
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                REQUEST SUMMARY
              </p>
              <h3 className="text-sm font-extrabold text-foreground">
                {request.title}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-secondary text-[9px] font-bold uppercase tracking-wider text-foreground">
                {request.category}
              </span>
            </div>

            <div className="space-y-3.5 pt-2 border-t border-border/70">
              <div className="flex items-start gap-2.5">
                <span className="text-xs font-bold text-muted-foreground w-4 text-center shrink-0 mt-0.5">
                  ₦
                </span>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                    BUDGET RANGE
                  </p>
                  <p className="text-xs font-bold text-foreground">
                    {request.budgetLabel.replace(/^₦\s*/, "")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                    LOCATION
                  </p>
                  <p className="text-xs font-bold text-foreground">
                    {request.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <User className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                    POSTED BY
                  </p>
                  <p className="text-xs font-bold text-foreground">
                    {request.client.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/70">
              <p className="text-xs italic text-muted-foreground leading-relaxed line-clamp-3">
                &ldquo;{request.shortDescription}&rdquo;
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
              <Lightbulb className="size-3.5 text-foreground shrink-0" />
              <span>QUOTE TIPS</span>
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
              <li>Be specific about material quality.</li>
              <li>Include your availability for a site visit.</li>
              <li>Break down costs clearly in milestones.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

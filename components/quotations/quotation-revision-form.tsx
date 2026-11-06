"use client";

import { useRef } from "react";
import { Hammer, Info, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { QuotationItem, QuotationRevisionFormValues } from "./types";

export interface QuotationRevisionFormProps {
  quotation: QuotationItem;
  values: QuotationRevisionFormValues;
  onChange: (nextValues: QuotationRevisionFormValues) => void;
  onCancel: () => void;
  onSubmit: () => void;
  className?: string;
}

export function QuotationRevisionForm({
  quotation,
  values,
  onChange,
  onCancel,
  onSubmit,
  className,
}: QuotationRevisionFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const added = Array.from(fileList).map((f) => f.name);
    onChange({
      ...values,
      attachments: [...values.attachments, ...added],
    });
  };

  const handleRemoveAttachment = (index: number) => {
    onChange({
      ...values,
      attachments: values.attachments.filter((_, idx) => idx !== index),
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={cn("w-full max-w-2xl mx-auto space-y-6", className)}
    >
      <div className="space-y-1.5">
        <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
          How would you like to update this quote?
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Provide details about the changes you need. The professional will
          review your request and issue an updated quote.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-3">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Quote Context
        </span>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-10 rounded-xl bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
              <Hammer className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                {quotation.requestTitle} #{quotation.requestCode}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {quotation.providerName} • {quotation.totalAmount}
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-md bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-wider shrink-0">
            Original Quote
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="revision-requested-changes"
            className="block text-xs sm:text-sm font-bold text-foreground"
          >
            Requested Changes
          </label>
          <p className="text-xs text-muted-foreground">
            Please be as specific as possible (e.g., &ldquo;Change cabinet
            material to Walnut&rdquo;, &ldquo;Remove waste disposal
            service&rdquo;, etc.)
          </p>
        </div>

        <Textarea
          id="revision-requested-changes"
          value={values.changesDescription}
          onChange={(e) =>
            onChange({ ...values, changesDescription: e.target.value })
          }
          placeholder="Describe the updates you need here..."
          className="min-h-36 text-xs sm:text-sm"
        />

        <div className="rounded-xl bg-secondary/45 p-4 flex items-start gap-3">
          <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-bold text-foreground">
              What happens next?
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Once you submit this request, the professional will be notified.
              They can either update the price and terms or message you for more
              information. You are not committed to the project until you
              &ldquo;Accept&rdquo; a quote.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-bold text-foreground">
            Attach Photos or Files (Optional)
          </h3>
          <p className="text-xs text-muted-foreground">
            Upload new sketches or inspiration photos related to these changes.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={(e) => handleFilesSelected(e.target.files)}
          className="hidden"
        />

        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className="rounded-xl border border-dashed border-border bg-secondary/20 hover:bg-secondary/40 transition-colors p-6 sm:p-8 text-center space-y-2 cursor-pointer"
        >
          <div className="size-10 rounded-full bg-secondary text-muted-foreground flex items-center justify-center mx-auto">
            <UploadCloud className="size-5" />
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            Drag and drop or{" "}
            <span className="font-bold text-foreground underline underline-offset-2">
              browse files
            </span>
          </p>
          <p className="text-[10px] text-muted-foreground">
            PNG, JPG or PDF up to 10MB
          </p>
        </div>

        {values.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {values.attachments.map((fileName, index) => (
              <span
                key={`${fileName}-${index}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary text-xs font-medium text-foreground"
              >
                <span className="truncate max-w-48">{fileName}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAttachment(index)}
                  aria-label={`Remove ${fileName}`}
                  className="text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <Button
          type="submit"
          variant="default"
          size="sm"
          className="h-10 px-6 rounded-lg text-xs font-semibold shadow-xs"
        >
          Send Revision Request
        </Button>
      </div>
    </form>
  );
}


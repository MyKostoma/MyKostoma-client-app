"use client";

import { useRef } from "react";
import {
  CheckCircle2,
  FileQuestion,
  MessageSquare,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Input,
  Label,
  Select,
  Textarea,
  type SelectOption,
} from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { RequestFormValues } from "./types";

export const REQUEST_CATEGORY_OPTIONS: SelectOption[] = [
  { value: "Plumbing & Roofing", label: "Plumbing & Roofing" },
  {
    value: "Interior Design & Furniture",
    label: "Interior Design & Furniture",
  },
  { value: "Electrical & Tech", label: "Electrical & Tech" },
  { value: "Carpentry", label: "Carpentry" },
  { value: "HVAC & Cooling", label: "HVAC & Cooling" },
  { value: "Painting & Finishes", label: "Painting & Finishes" },
  { value: "Cleaning Services", label: "Cleaning Services" },
];

export const REQUEST_TIMELINE_OPTIONS: SelectOption[] = [
  { value: "Within 24 hours", label: "Within 24 hours" },
  { value: "Within 3 days", label: "Within 3 days" },
  { value: "Within 1 week", label: "Within 1 week" },
  { value: "Within 2 weeks", label: "Within 2 weeks" },
  { value: "Within 1 month", label: "Within 1 month" },
  { value: "Within 3 months", label: "Within 3 months" },
  { value: "Flexible", label: "Flexible" },
];

export interface RequestFormProps {
  mode: "create" | "edit";
  values: RequestFormValues;
  onChange: (nextValues: RequestFormValues) => void;
  onCancel: () => void;
  onSubmit: () => void;
  className?: string;
}

export function RequestForm({
  mode,
  values,
  onChange,
  onCancel,
  onSubmit,
  className,
}: RequestFormProps) {
  const isCreate = mode === "create";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = <K extends keyof RequestFormValues>(
    field: K,
    val: RequestFormValues[K]
  ) => {
    onChange({
      ...values,
      [field]: val,
    });
  };

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const newNames = Array.from(fileList).map((f) => f.name);
    updateField("photos", [...values.photos, ...newNames]);
  };

  const handleRemovePhoto = (index: number) => {
    updateField(
      "photos",
      values.photos.filter((_, idx) => idx !== index)
    );
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto space-y-5", className)}>
      {/* Main Form Card */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-5"
      >
        {isCreate && (
          <div className="pb-5 border-b border-border/70">
            <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
              Request Details
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Fill in the details below to post your service request.
            </p>
          </div>
        )}

        {/* 1. Request Title */}
        <div>
          <Label htmlFor="request-title" required={isCreate}>
            Request Title
          </Label>
          <Input
            id="request-title"
            value={values.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Repair leaking roof in living room"
            className="h-10.5 text-xs sm:text-sm"
          />
          {isCreate && (
            <p className="text-[11px] text-muted-foreground mt-1.5">
              Be specific to help professionals understand your needs.
            </p>
          )}
        </div>

        {/* 2. Category */}
        <div>
          <Label htmlFor="request-category" required={isCreate}>
            Category
          </Label>
          <Select
            id="request-category"
            options={REQUEST_CATEGORY_OPTIONS}
            value={values.category}
            onChange={(val) => updateField("category", val)}
            placeholder="Select a category"
            className="h-10.5 text-xs sm:text-sm"
          />
        </div>

        {/* 3. Description */}
        <div>
          <Label htmlFor="request-description" required={isCreate}>
            Description
          </Label>
          <Textarea
            id="request-description"
            value={values.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Describe the work required in detail.."
            className="min-h-28 text-xs sm:text-sm leading-relaxed"
          />
        </div>

        {/* 4. Budget Range & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="request-budget-min">Budget Range (₦)</Label>
            <div className="flex items-center gap-2.5">
              <Input
                id="request-budget-min"
                value={values.budgetMin}
                onChange={(e) => updateField("budgetMin", e.target.value)}
                placeholder="Min"
                leadingIcon={
                  <span className="text-xs font-medium text-muted-foreground">
                    ₦
                  </span>
                }
                className={cn(
                  "h-10.5 text-xs sm:text-sm",
                  !isCreate && "text-center"
                )}
              />
              <span className="text-muted-foreground select-none shrink-0">
                —
              </span>
              <Input
                id="request-budget-max"
                 aria-label="Maximum budget"
                value={values.budgetMax}
                onChange={(e) => updateField("budgetMax", e.target.value)}
                placeholder="Max"
                leadingIcon={
                  <span className="text-xs font-medium text-muted-foreground">
                    ₦
                  </span>
                }
                className={cn(
                  "h-10.5 text-xs sm:text-sm",
                  !isCreate && "text-center"
                )}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="request-timeline">Timeline</Label>
            <Select
              id="request-timeline"
              options={REQUEST_TIMELINE_OPTIONS}
              value={values.timeline}
              onChange={(val) => updateField("timeline", val)}
              placeholder="When do you need it?"
              className="h-10.5 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* 5. Location */}
        <div>
          <Label htmlFor="request-location">Location</Label>
          <Input
            id="request-location"
            value={values.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="Enter service address"
            leadingIcon={
              <CheckCircle2 className="size-3.5 text-muted-foreground/80" />
            }
            className={cn(
              "h-10.5 text-xs sm:text-sm",
              !isCreate && "text-center"
            )}
          />
        </div>

        {/* 6. Photos (Attach Photos in Create Mode / Current Photos in Edit Mode) */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg"
            multiple
            className="hidden"
            onChange={(e) => handleFilesSelected(e.target.files)}
          />

          {isCreate ? (
            <>
              <Label>
                Attach Photos{" "}
                <span className="text-muted-foreground font-normal ml-0.5">
                  (Optional)
                </span>
              </Label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border-2 border-dashed border-border bg-secondary/30 hover:bg-secondary/55 hover:border-primary/40 p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer select-none"
              >
                <div className="size-10 rounded-full bg-card border border-border text-muted-foreground flex items-center justify-center mb-3 shadow-2xs">
                  <Plus className="size-5" />
                </div>
                <p className="text-xs font-bold text-foreground tracking-tight">
                  Click to upload or drag and drop
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  PNG, JPG up to 10MB
                </p>
              </div>

              {values.photos.length > 0 && (
                <div className="flex flex-wrap items-center gap-2.5 mt-3">
                  {values.photos.map((photo, idx) => (
                    <span
                      key={`${photo}-${idx}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-foreground"
                    >
                      <span className="truncate max-w-36">{photo}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        aria-label={`Remove ${photo}`}
                        className="text-muted-foreground hover:text-error cursor-pointer"
                      >
                        <X className="size-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <Label>Current Photos</Label>
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                {values.photos.map((photo, idx) => (
                  <div
                    key={`${photo}-${idx}`}
                    className="relative size-18 sm:size-20 rounded-xl bg-secondary/70 border border-border flex items-center justify-center text-muted-foreground"
                  >
                    <FileQuestion className="size-5" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      aria-label={`Remove photo ${idx + 1}`}
                      className="absolute -top-1.5 -right-1.5 size-4.5 rounded-full bg-error text-error-foreground flex items-center justify-center shadow-xs hover:bg-destructive-hover transition-colors cursor-pointer"
                    >
                      <X className="size-2.5 stroke-[3]" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Add photo"
                  className="size-18 sm:size-20 rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-card hover:bg-secondary/40 flex items-center justify-center text-muted-foreground transition-colors cursor-pointer"
                >
                  <Plus className="size-5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Bottom Form Buttons */}
        <div className="pt-5 border-t border-border/70 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="h-10 px-6 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="default"
            size="sm"
            className="h-10 px-6 rounded-lg text-xs font-semibold shadow-xs"
          >
            {isCreate ? "Submit Request" : "Save Changes"}
          </Button>
        </div>
      </form>

      {/* Contextual Bottom Banner */}
      {isCreate ? (
        <div className="rounded-2xl border border-border bg-card p-5 flex items-start gap-3.5 shadow-2xs">
          <div className="size-9 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
            <MessageSquare className="size-4 fill-current" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground">
              What happens next?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              After submission, your request will be reviewed and sent to
              verified professionals. You&apos;ll receive quotes within 2–4
              hours. You can compare reviews and portfolios before making a
              choice.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-warning/25 bg-warning-bg p-5 flex items-start gap-3.5">
          <div className="size-9 rounded-full bg-warning/15 text-warning flex items-center justify-center shrink-0">
            <MessageSquare className="size-4 fill-current" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-warning">
              Modifying your request
            </h3>
            <p className="text-xs text-warning/90 leading-relaxed mt-1">
              Changing major details like the location or category may affect
              existing quotes you have received. Professionals already in
              contact with you will be notified of these updates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

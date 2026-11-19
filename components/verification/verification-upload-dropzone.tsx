"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { FileUp, RefreshCw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormErrorMessage, Label } from "@/components/ui/form-fields";
import type { VerificationUploadDropzoneProps } from "./types";

export function VerificationUploadDropzone({
  id,
  label,
  subtitle = "PNG, JPG up to 10MB",
  file,
  error,
  disabled = false,
  onFileSelect,
  onFileRemove,
}: VerificationUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleOpenPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked) {
      onFileSelect(picked);
    }
    e.target.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      onFileSelect(dropped);
    }
  };

  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        state={error ? "error" : "default"}
        className="text-xs font-semibold text-foreground"
      >
        {label}
      </Label>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".png,.jpg,.jpeg,image/png,image/jpeg"
        disabled={disabled}
        onChange={handleInputChange}
        className="hidden"
      />

      {file ? (
        <div
          className={cn(
            "rounded-xl border border-border bg-card p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-2xs transition-colors",
            error && "border-error bg-error-bg/40"
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-14 w-20 rounded-lg border border-border bg-secondary overflow-hidden shrink-0">
              <img
                src={file.previewUrl}
                alt={file.name}
                className="size-full object-cover"
              />
            </div>

            <div className="min-w-0 space-y-0.5">
              <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {file.name}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {file.sizeLabel} • Ready to upload
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleOpenPicker}
              disabled={disabled}
              className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg border border-border bg-card hover:bg-secondary text-xs font-medium text-foreground transition-colors cursor-pointer"
            >
              <RefreshCw className="size-3.5" />
              <span className="hidden sm:inline">Replace</span>
            </button>

            <button
              type="button"
              onClick={onFileRemove}
              disabled={disabled}
              aria-label={`Remove ${label}`}
              className="size-8 rounded-lg border border-border bg-card hover:bg-error-bg hover:text-error hover:border-error/30 text-muted-foreground flex items-center justify-center transition-colors cursor-pointer"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={handleOpenPicker}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpenPicker();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "rounded-xl border-2 border-dashed p-6 sm:p-8 min-h-[144px] flex flex-col items-center justify-center text-center transition-all cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
            error
              ? "border-error bg-error-bg/40"
              : isDragOver
                ? "border-primary bg-accent/50"
                : "border-border bg-card hover:border-primary/50 hover:bg-secondary/20",
            disabled && "opacity-60 cursor-not-allowed pointer-events-none"
          )}
        >
          <div className="size-10 rounded-lg bg-secondary/70 border border-border/50 text-muted-foreground flex items-center justify-center mb-2.5">
            <FileUp className="size-5" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-foreground">
            Click to upload
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">{subtitle}</p>
        </div>
      )}

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </div>
  );
}

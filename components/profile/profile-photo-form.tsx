"use client";

import { useRef, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft,
  Camera,
  ChevronRight,
  Eye,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { FormErrorMessage } from "@/components/ui/form-fields";
import type {
  ProfilePhotoFormProps,
  ProfilePhotoGuidelineItem,
} from "./types";

const GUIDELINE_ICONS: Record<
  ProfilePhotoGuidelineItem["icon"],
  typeof ScanSearch
> = {
  requirements: ScanSearch,
  safety: ShieldCheck,
  quality: Sparkles,
  visibility: Eye,
};

export function ProfilePhotoForm({
  displayName,
  previewUrl,
  hasCustomPhoto,
  selectedFileName,
  fileError,
  dimensionWarning,
  guidelines,
  isSaving = false,
  onFileSelect,
  onRemovePhoto,
  onBack,
  onCancel,
  onSubmit,
}: ProfilePhotoFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked) {
      onFileSelect(picked);
    }
    e.target.value = "";
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-3xl mx-auto space-y-6 pb-8"
    >
      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to profile"
          className="size-9 rounded-xl border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary/70 transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="size-4" />
        </button>

        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Profile Photo
        </h1>
      </div>

      {/* Centered Avatar Upload Card */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-2xs flex flex-col items-center text-center space-y-6">
        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg,image/png,image/jpeg"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="relative">
          <div className="size-32 sm:size-36 rounded-2xl border-4 border-secondary bg-secondary overflow-hidden shadow-sm">
            <FallbackImage
              src={previewUrl}
              alt={displayName}
              fallbackType="user"
              variant="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-label="Choose new profile photo"
            className="absolute -bottom-2 -right-2 size-9 rounded-xl border-2 border-card bg-primary text-primary-foreground flex items-center justify-center shadow-sm hover:bg-primary-hover transition-colors cursor-pointer"
          >
            <Camera className="size-4" />
          </button>
        </div>

        {(selectedFileName || fileError || dimensionWarning) && (
          <div className="space-y-1 max-w-sm">
            {selectedFileName && !fileError && (
              <p className="text-xs font-medium text-muted-foreground">
                Selected:{" "}
                <strong className="font-semibold text-foreground">
                  {selectedFileName}
                </strong>
              </p>
            )}
            {fileError && <FormErrorMessage>{fileError}</FormErrorMessage>}
            {dimensionWarning && !fileError && (
              <p className="text-xs font-medium text-warning">
                {dimensionWarning}
              </p>
            )}
          </div>
        )}

        <div className="w-full max-w-xs space-y-2.5">
          <Button
            type="button"
            variant="default"
            size="sm"
            disabled={isSaving}
            onClick={() => inputRef.current?.click()}
            className="w-full h-11 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs"
          >
            UPLOAD NEW PHOTO
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSaving || !hasCustomPhoto}
            onClick={onRemovePhoto}
            className="w-full h-11 rounded-xl text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-destructive"
          >
            REMOVE CURRENT PHOTO
          </Button>
        </div>
      </div>

      {/* Photo Guidelines Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-2xs space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-full bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
            <ChevronRight className="size-3.5" />
          </div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            PHOTO GUIDELINES
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {guidelines.map((item) => {
            const Icon = GUIDELINE_ICONS[item.icon] ?? ScanSearch;
            return (
              <div key={item.id} className="flex items-start gap-3">
                <Icon className="size-4 text-foreground mt-0.5 shrink-0" />
                <div className="space-y-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isSaving}
          onClick={onCancel}
          className="h-10 px-6 rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          CANCEL
        </Button>

        <Button
          type="submit"
          variant="default"
          size="sm"
          loading={isSaving}
          loadingText="SAVING..."
          className="h-10 px-6 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs"
        >
          SAVE CHANGES
        </Button>
      </div>
    </form>
  );
}

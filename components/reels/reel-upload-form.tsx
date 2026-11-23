"use client";

import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { CheckCircle2, Film, Plus, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import {
  FormField,
  Input,
  Select,
  Textarea,
} from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { ReelUploadFormProps, ReelVisibility } from "./types";

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public (Feed & Profile)" },
  { value: "draft", label: "Save as Draft" },
  { value: "scheduled", label: "Schedule Release" },
];

export function ReelUploadForm({
  fileName,
  fileSizeLabel,
  videoPreviewUrl,
  title,
  caption,
  hashtags,
  visibility,
  coverOptions,
  selectedCoverUrl,
  titleError,
  fileError,
  onFileSelect,
  onUseSampleClip,
  onClearFile,
  onTitleChange,
  onCaptionChange,
  onHashtagsChange,
  onVisibilityChange,
  onSelectCover,
  onCustomCoverSelect,
  onCancel,
  onSubmit,
}: ReelUploadFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleVideoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = "";
  };

  const handleCoverInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onCustomCoverSelect(file);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-3xl mx-auto rounded-2xl border border-border bg-card shadow-2xs overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-3">
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-foreground">
          Upload Reel
        </h2>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close upload form"
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Video Dropzone */}
        <div className="md:col-span-5 space-y-2.5">
          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
            onChange={handleVideoInputChange}
            className="hidden"
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "rounded-2xl border-2 border-dashed p-5 min-h-80 flex flex-col items-center justify-center text-center transition-colors",
              isDragging
                ? "border-primary bg-accent/40"
                : fileError
                  ? "border-error/60 bg-error-bg/30"
                  : "border-border bg-secondary/25"
            )}
          >
            {fileName ? (
              <div className="w-full space-y-3">
                {videoPreviewUrl ? (
                  <div className="mx-auto w-36 aspect-9/16 rounded-xl overflow-hidden bg-black border border-border">
                    <video
                      src={videoPreviewUrl}
                      muted
                      playsInline
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="mx-auto size-12 rounded-full bg-success-bg text-success flex items-center justify-center">
                    <CheckCircle2 className="size-6" />
                  </div>
                )}

                <div className="space-y-0.5 px-2">
                  <p className="text-xs font-bold text-foreground truncate">
                    {fileName}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {fileSizeLabel} • Ready to upload
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => videoInputRef.current?.click()}
                    className="h-8 px-3 rounded-lg text-xs font-semibold"
                  >
                    Replace
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onClearFile}
                    className="h-8 px-3 rounded-lg text-xs font-semibold text-muted-foreground"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto size-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground">
                  <UploadCloud className="size-5" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">
                    Select video to upload
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    MP4 or WebM
                    <br />
                    Up to 10 minutes
                    <br />
                    Less than 2GB
                  </p>
                </div>

                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={() => videoInputRef.current?.click()}
                    className="h-9 px-5 rounded-lg text-xs font-bold shadow-xs"
                  >
                    Select File
                  </Button>

                  <div>
                    <button
                      type="button"
                      onClick={onUseSampleClip}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                    >
                      <Film className="size-3" />
                      <span>Load sample project clip</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {fileError && (
            <p className="text-xs font-medium text-error">{fileError}</p>
          )}
        </div>

        {/* Right Details Column */}
        <div className="md:col-span-7 space-y-4">
          <FormField
            id="upload-reel-title"
            label="TITLE"
            required
            state={titleError ? "error" : "default"}
            errorMessage={titleError}
          >
            <Input
              id="upload-reel-title"
              value={title}
              maxLength={90}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="e.g. Morning Workflow"
            />
          </FormField>

          <FormField id="upload-reel-caption" label="CAPTION">
            <Textarea
              id="upload-reel-caption"
              value={caption}
              maxLength={500}
              onChange={(e) => onCaptionChange(e.target.value)}
              placeholder="Write a caption..."
              className="min-h-24 resize-none text-xs sm:text-sm"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <FormField id="upload-reel-hashtags" label="HASHTAGS">
              <Input
                id="upload-reel-hashtags"
                value={hashtags}
                onChange={(e) => onHashtagsChange(e.target.value)}
                placeholder="#design #productivity"
              />
            </FormField>

            <FormField id="upload-reel-visibility" label="VISIBILITY">
              <Select
                id="upload-reel-visibility"
                value={visibility}
                onChange={(value) => onVisibilityChange(value as ReelVisibility)}
                options={VISIBILITY_OPTIONS}
              />
            </FormField>
          </div>

          {/* Cover Image Picker */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              COVER IMAGE
            </p>

            <input
              ref={coverInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleCoverInputChange}
              className="hidden"
            />

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                aria-label="Upload custom cover image"
                className="w-16 aspect-9/16 rounded-xl border border-dashed border-border bg-secondary/60 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
              >
                <Plus className="size-4" />
              </button>

              {coverOptions.slice(0, 3).map((coverUrl, idx) => {
                const isSelected = selectedCoverUrl === coverUrl;
                return (
                  <button
                    key={`${coverUrl}-${idx}`}
                    type="button"
                    onClick={() => onSelectCover(coverUrl)}
                    aria-label={`Select cover option ${idx + 1}`}
                    className={cn(
                      "w-16 aspect-9/16 rounded-xl overflow-hidden border transition-all cursor-pointer shrink-0",
                      isSelected
                        ? "border-primary ring-2 ring-primary/35 scale-105"
                        : "border-border opacity-80 hover:opacity-100"
                    )}
                  >
                    <FallbackImage
                      src={coverUrl}
                      alt={`Reel cover option ${idx + 1}`}
                      fallbackType="portfolio"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border bg-secondary/20 flex items-center justify-end gap-2.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="h-9 px-5 rounded-lg text-xs font-semibold"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="default"
          size="sm"
          className="h-9 px-5 rounded-lg text-xs font-bold shadow-xs"
        >
          Upload Reel
        </Button>
      </div>
    </form>
  );
}

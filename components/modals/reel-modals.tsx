"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Flag,
  Heart,
  Pause,
  Play,
  Plus,
  Share2,
  Trash2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import {
  FormField,
  Input,
  Select,
  Textarea,
} from "@/components/ui/form-fields";
import {
  formatCompactCount,
  parseHashtagsInput,
} from "@/features/reels/services/reelsHelpers";
import { cn } from "@/lib/utils";
import type { ReelVisibility } from "@/components/reels/types";
import type {
  DeleteReelModalProps,
  EditReelModalProps,
  ReelPlayerModalProps,
  ReportReelModalProps,
} from "./types";

export type {
  DeleteReelModalProps,
  EditReelModalProps,
  ReelPlayerModalProps,
  ReportReelModalProps,
} from "./types";

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public (Published)" },
  { value: "draft", label: "Draft (Private)" },
  { value: "scheduled", label: "Scheduled" },
];

export function EditReelModal({
  isOpen,
  reel,
  onClose,
  onSaveReel,
}: EditReelModalProps) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtagsRaw, setHashtagsRaw] = useState("");
  const [status, setStatus] = useState<ReelVisibility>("public");
  const [audioLabel, setAudioLabel] = useState("Original Audio");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen || !reel) return;
    setTitle(reel.title);
    setCaption(reel.caption);
    setHashtagsRaw(reel.hashtags.join(" "));
    setStatus(reel.status);
    setAudioLabel(reel.audioLabel || "Original Audio");
    setError(undefined);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, reel]);

  if (!isOpen || !reel) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please provide a title for this reel.");
      return;
    }

    onSaveReel({
      reelId: reel.id,
      title: title.trim(),
      caption: caption.trim() || reel.caption,
      hashtags: parseHashtagsInput(hashtagsRaw),
      status,
      audioLabel: audioLabel.trim() || "Original Audio",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-reel-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
              <Clapperboard className="size-4" />
            </div>
            <div>
              <h2
                id="edit-reel-modal-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                Edit Reel Details
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Update caption, hashtags, audio credit, and publishing status.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit reel modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <FormField
          id="edit-reel-title"
          label="Reel Title"
          required
          state={error ? "error" : "default"}
          errorMessage={error}
        >
          <Input
            id="edit-reel-title"
            value={title}
            maxLength={90}
            onChange={(e) => {
              setTitle(e.target.value);
              setError(undefined);
            }}
            placeholder="e.g. Morning Workflow"
          />
        </FormField>

        <FormField id="edit-reel-caption" label="Caption">
          <Textarea
            id="edit-reel-caption"
            value={caption}
            maxLength={500}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            className="min-h-24 resize-none"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <FormField id="edit-reel-visibility" label="Visibility">
            <Select
              id="edit-reel-visibility"
              value={status}
              onChange={(value) => setStatus(value as ReelVisibility)}
              options={VISIBILITY_OPTIONS}
            />
          </FormField>

          <FormField id="edit-reel-audio" label="Audio Credit">
            <Input
              id="edit-reel-audio"
              value={audioLabel}
              onChange={(e) => setAudioLabel(e.target.value)}
              placeholder="Original Audio"
            />
          </FormField>
        </div>

        <FormField id="edit-reel-hashtags" label="Hashtags">
          <Input
            id="edit-reel-hashtags"
            value={hashtagsRaw}
            onChange={(e) => setHashtagsRaw(e.target.value)}
            placeholder="#designlife #uidesign #productivity"
          />
        </FormField>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export function DeleteReelModal({
  isOpen,
  reelTitle,
  onClose,
  onConfirmDelete,
}: DeleteReelModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-reel-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="size-11 rounded-full bg-error-bg text-error flex items-center justify-center">
          <Trash2 className="size-5" />
        </div>

        <div className="space-y-2">
          <h2
            id="delete-reel-modal-title"
            className="text-base sm:text-lg font-bold text-foreground tracking-tight"
          >
            Delete Reel?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to permanently remove{" "}
            <strong className="font-semibold text-foreground">
              &ldquo;{reelTitle}&rdquo;
            </strong>
            ? All views, likes, and metrics for this reel will be removed from
            your creator studio.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => {
              onConfirmDelete();
              onClose();
            }}
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Delete Reel
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ReportReelModal({
  isOpen,
  creatorName,
  reasons,
  onClose,
  onSubmitReport,
}: ReportReelModalProps) {
  const [reason, setReason] = useState(
    reasons[0] ?? "Other community guideline violation"
  );
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    setReason(reasons[0] ?? "Other community guideline violation");
    setDetails("");
    setError(undefined);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, reasons]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError("Please choose a reason for reporting this reel.");
      return;
    }
    onSubmitReport({ reason, details: details.trim() });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-reel-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-error-bg text-error flex items-center justify-center shrink-0">
              <Flag className="size-4" />
            </div>
            <div>
              <h2
                id="report-reel-modal-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                Report Reel
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Flag {creatorName}&rsquo;s reel for Trust &amp; Safety review.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close report modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <FormField
          id="report-reel-reason"
          label="Reason"
          required
          state={error ? "error" : "default"}
          errorMessage={error}
        >
          <Select
            id="report-reel-reason"
            value={reason}
            onChange={(value) => {
              setReason(value);
              setError(undefined);
            }}
            options={reasons.map((item) => ({ label: item, value: item }))}
          />
        </FormField>

        <FormField id="report-reel-details" label="Additional Context (Optional)">
          <Textarea
            id="report-reel-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Tell our safety moderators what issue you noticed..."
            className="min-h-24 resize-none"
          />
        </FormField>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            size="sm"
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
}

export function ReelPlayerModal({
  isOpen,
  reels,
  activeIndex,
  likedReelIds,
  followedCreatorIds,
  onClose,
  onChangeIndex,
  onToggleLike,
  onToggleFollow,
  onShare,
}: ReelPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const safeIndex = Math.min(Math.max(0, activeIndex), Math.max(0, reels.length - 1));
  const currentReel = reels[safeIndex];

  useEffect(() => {
    if (!isOpen) return;
    setIsPlaying(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && safeIndex > 0) onChangeIndex(safeIndex - 1);
      if (e.key === "ArrowRight" && safeIndex < reels.length - 1) {
        onChangeIndex(safeIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onChangeIndex, onClose, reels.length, safeIndex]);

  if (!isOpen || !currentReel) return null;

  const isLiked = likedReelIds.includes(currentReel.id);
  const isFollowing = followedCreatorIds.includes(
    currentReel.creatorId.toLowerCase()
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={currentReel.title}
    >
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center gap-3 sm:gap-5 max-w-full">
        {reels.length > 1 && (
          <button
            type="button"
            disabled={safeIndex <= 0}
            onClick={() => onChangeIndex(Math.max(0, safeIndex - 1))}
            aria-label="Previous reel"
            className="hidden sm:flex size-10 rounded-full bg-card/90 text-foreground border border-border items-center justify-center shadow-md hover:bg-card disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

        <div className="flex items-end gap-3">
          {/* 9:16 Video Frame */}
          <div className="relative w-72 sm:w-88 aspect-9/16 rounded-2xl overflow-hidden bg-black border border-border/50 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-border/30">
              <div
                className={cn(
                  "h-full bg-primary transition-all duration-500",
                  isPlaying ? "w-2/5" : "w-1/4"
                )}
              />
            </div>

            {currentReel.videoUrl ? (
              <video
                key={currentReel.videoUrl}
                src={currentReel.videoUrl}
                poster={currentReel.thumbnailUrl}
                autoPlay={isPlaying}
                muted={isMuted}
                loop
                playsInline
                onClick={() => setIsPlaying((prev) => !prev)}
                className="w-full h-full object-cover cursor-pointer"
              />
            ) : (
              <FallbackImage
                src={currentReel.thumbnailUrl}
                alt={currentReel.title}
                fallbackType="portfolio"
                onClick={() => setIsPlaying((prev) => !prev)}
                className="w-full h-full object-cover cursor-pointer"
              />
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close reel player"
              className="absolute top-3 left-3 z-20 size-8 rounded-full bg-black/55 text-primary-foreground flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsMuted((prev) => !prev)}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="absolute top-3 right-3 z-20 size-8 rounded-full bg-black/55 text-primary-foreground flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? "Pause reel" : "Play reel"}
              className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            >
              <span
                className={cn(
                  "size-14 rounded-full bg-black/50 text-primary-foreground flex items-center justify-center transition-opacity",
                  isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                )}
              >
                {isPlaying ? (
                  <Pause className="size-6" />
                ) : (
                  <Play className="size-6 ml-0.5 fill-current" />
                )}
              </span>
            </button>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-15 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 pt-16 space-y-2 text-primary-foreground">
              <div className="flex items-center gap-2.5">
                <FallbackImage
                  src={currentReel.creatorAvatarUrl}
                  alt={currentReel.creatorName}
                  fallbackType="user"
                  variant="avatar"
                  className="size-8 rounded-full object-cover border border-border/50 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold flex items-center gap-1 truncate">
                    <span className="truncate">{currentReel.creatorName}</span>
                    {currentReel.creatorVerified && (
                      <BadgeCheck className="size-3.5 text-info fill-info shrink-0" />
                    )}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80 truncate">
                    {currentReel.creatorRole}
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed line-clamp-2 opacity-95">
                {currentReel.caption}
              </p>

              {currentReel.hashtags.length > 0 && (
                <p className="text-[11px] font-medium opacity-80 truncate">
                  {currentReel.hashtags.join(" ")}
                </p>
              )}
            </div>
          </div>

          {/* Floating Engagement Rail */}
          <div className="flex flex-col items-center gap-3 pb-3 shrink-0">
            <button
              type="button"
              onClick={() => onToggleLike(currentReel.id)}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <span
                className={cn(
                  "size-11 rounded-full border shadow-md flex items-center justify-center transition-colors",
                  isLiked
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground group-hover:bg-secondary"
                )}
              >
                <Heart className={cn("size-5", isLiked && "fill-current")} />
              </span>
              <span className="text-[11px] font-bold text-primary-foreground">
                {formatCompactCount(currentReel.likesCount)}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                onToggleFollow(currentReel.creatorId, currentReel.creatorName)
              }
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <span
                className={cn(
                  "size-11 rounded-full border shadow-md flex items-center justify-center transition-colors",
                  isFollowing
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground group-hover:bg-secondary"
                )}
              >
                {isFollowing ? (
                  <Check className="size-5" />
                ) : (
                  <Plus className="size-5" />
                )}
              </span>
              <span className="text-[10px] font-bold uppercase text-primary-foreground">
                {isFollowing ? "Following" : "Follow"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onShare(currentReel)}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <span className="size-11 rounded-full border border-border bg-card text-foreground group-hover:bg-secondary shadow-md flex items-center justify-center transition-colors">
                <Share2 className="size-5" />
              </span>
              <span className="text-[10px] font-bold uppercase text-primary-foreground">
                Share
              </span>
            </button>
          </div>
        </div>

        {reels.length > 1 && (
          <button
            type="button"
            disabled={safeIndex >= reels.length - 1}
            onClick={() =>
              onChangeIndex(Math.min(reels.length - 1, safeIndex + 1))
            }
            aria-label="Next reel"
            className="hidden sm:flex size-10 rounded-full bg-card/90 text-foreground border border-border items-center justify-center shadow-md hover:bg-card disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}

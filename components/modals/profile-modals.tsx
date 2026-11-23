"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Lock, Plus, Star, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { FormField, Input, Select, Textarea } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type {
  PortfolioProjectModalProps,
  RequestContactUpdateModalProps,
  WriteReviewModalProps,
} from "./types";

export type {
  PortfolioProjectModalProps,
  RequestContactUpdateModalProps,
  WriteReviewModalProps,
} from "./types";

const DEFAULT_PROJECT_IMAGE =
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80";

export function PortfolioProjectModal({
  isOpen,
  mode,
  project,
  categories = ["Residential", "Commercial", "Minimalist"],
  isOwner = false,
  onClose,
  onCreateProject,
  onDeleteProject,
}: PortfolioProjectModalProps) {
  const [title, setTitle] = useState("");
  const [filterCategory, setFilterCategory] = useState("Residential");
  const [description, setDescription] = useState("");
  const [tagsRaw, setTagsRaw] = useState("3D MODELING, SOURCING");
  const [imageUrl, setImageUrl] = useState(DEFAULT_PROJECT_IMAGE);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    if (mode === "create") {
      setTitle("");
      setFilterCategory("Residential");
      setDescription("");
      setTagsRaw("3D MODELING, SOURCING");
      setImageUrl(DEFAULT_PROJECT_IMAGE);
      setError(undefined);
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, mode, onClose]);

  if (!isOpen) return null;

  const handleSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Please enter a project title and short description.");
      return;
    }
    const parsedTags = tagsRaw
      .split(",")
      .map((t) => t.trim().toUpperCase())
      .filter(Boolean)
      .slice(0, 4);

    onCreateProject?.({
      title: title.trim(),
      filterCategory,
      description: description.trim(),
      tags: parsedTags.length > 0 ? parsedTags : [filterCategory.toUpperCase()],
      imageUrl: imageUrl.trim() || DEFAULT_PROJECT_IMAGE,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl rounded-2xl border border-border bg-card shadow-xl overflow-hidden animate-in zoom-in-95 duration-150">
        {mode === "view" && project ? (
          <div>
            <div className="relative aspect-16/10 w-full bg-secondary">
              <FallbackImage
                src={project.imageUrl}
                alt={project.title}
                fallbackType="portfolio"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project preview"
                className="absolute top-3 right-3 size-9 rounded-full bg-card/90 border border-border text-foreground flex items-center justify-center hover:bg-card transition-colors cursor-pointer shadow-xs"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {project.category}
                  {project.dateLabel ? ` • ${project.dateLabel}` : ""}
                </p>
                <h2
                  id="portfolio-modal-title"
                  className="text-lg sm:text-xl font-bold text-foreground tracking-tight"
                >
                  {project.title}
                </h2>
              </div>

              {project.description && (
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-secondary text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border/70">
                {isOwner && onDeleteProject && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      onDeleteProject(project.id);
                      onClose();
                    }}
                    leadingIcon={<Trash2 className="size-3.5" />}
                    className="h-9 px-4 rounded-lg text-xs font-semibold mr-auto"
                  >
                    Remove Project
                  </Button>
                )}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="h-9 px-5 rounded-lg text-xs font-semibold"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitCreate} className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Plus className="size-4" />
                </div>
                <h2
                  id="portfolio-modal-title"
                  className="text-base sm:text-lg font-bold text-foreground tracking-tight"
                >
                  Add Portfolio Project
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <FormField
              id="portfolio-title"
              label="Project Title"
              required
              state={error && !title.trim() ? "error" : "default"}
            >
              <Input
                id="portfolio-title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError(undefined);
                }}
                placeholder="e.g. Victoria Island Executive Lounge"
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormField id="portfolio-category" label="Category">
                <Select
                  id="portfolio-category"
                  value={filterCategory}
                  onChange={(value) => setFilterCategory(value)}
                  options={categories
                    .filter((c) => c !== "All Projects")
                    .map((c) => ({ label: c, value: c }))}
                />
              </FormField>

              <FormField id="portfolio-tags" label="Tags (comma-separated)">
                <Input
                  id="portfolio-tags"
                  value={tagsRaw}
                  onChange={(e) => setTagsRaw(e.target.value)}
                  placeholder="3D MODELING, SOURCING"
                />
              </FormField>
            </div>

            <FormField
              id="portfolio-desc"
              label="Project Summary"
              required
              state={error ? "error" : "default"}
              errorMessage={error}
            >
              <Textarea
                id="portfolio-desc"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError(undefined);
                }}
                placeholder="Briefly describe scope, materials, and outcome..."
                className="min-h-24 resize-none"
              />
            </FormField>

            <FormField id="portfolio-image" label="Cover Image URL">
              <Input
                id="portfolio-image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
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
                Publish Project
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function WriteReviewModal({
  isOpen,
  recipientName,
  onClose,
  onSubmitReview,
}: WriteReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    setRating(5);
    setComment("");
    setError(undefined);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim().length < 10) {
      setError("Please share at least 10 characters about your experience.");
      return;
    }
    onSubmitReview({ rating, comment: comment.trim() });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-review-dialog-title"
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
          <div>
            <h2
              id="write-review-dialog-title"
              className="text-base sm:text-lg font-bold text-foreground tracking-tight"
            >
              Review {recipientName}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Share honest feedback from your completed service.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close review modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-1.5">
          <span className="block text-xs font-semibold text-foreground">
            Your Rating
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <button
                key={starValue}
                type="button"
                onClick={() => setRating(starValue)}
                aria-label={`${starValue} stars`}
                className="p-1 rounded-md hover:bg-secondary cursor-pointer transition-colors"
              >
                <Star
                  className={cn(
                    "size-6",
                    starValue <= rating
                      ? "text-warning fill-warning"
                      : "text-border fill-border"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <FormField
          id="write-review-comment"
          label="Your Review"
          required
          state={error ? "error" : "default"}
          errorMessage={error}
        >
          <Textarea
            id="write-review-comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setError(undefined);
            }}
            placeholder={`How was working with ${recipientName}?`}
            className="min-h-28 resize-none"
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
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
}

export function RequestContactUpdateModal({
  isOpen,
  onClose,
  onSubmitRequest,
}: RequestContactUpdateModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    setEmail("");
    setPhone("");
    setReason("");
    setError(undefined);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((!email.trim() && !phone.trim()) || !reason.trim()) {
      setError(
        "Please provide a new phone number or email along with your reason."
      );
      return;
    }
    onSubmitRequest({
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      reason: reason.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-update-dialog-title"
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
            <div className="size-10 rounded-xl bg-secondary text-foreground flex items-center justify-center shrink-0">
              <Lock className="size-4" />
            </div>
            <div>
              <h2
                id="contact-update-dialog-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                Request Contact Update
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Changes to verified phone or email require security review.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact update modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <FormField id="contact-update-email" label="New Email Address (Optional)">
          <Input
            id="contact-update-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(undefined);
            }}
            placeholder="name@studio.com"
          />
        </FormField>

        <FormField id="contact-update-phone" label="New Phone Number (Optional)">
          <Input
            id="contact-update-phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError(undefined);
            }}
            placeholder="+234 800 000 0000"
          />
        </FormField>

        <FormField
          id="contact-update-reason"
          label="Reason for Update"
          required
          state={error ? "error" : "default"}
          errorMessage={error}
        >
          <Textarea
            id="contact-update-reason"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError(undefined);
            }}
            placeholder="Explain why you need to update your verified contact info..."
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
            variant="default"
            size="sm"
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Submit Request
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  CornerDownRight,
  ExternalLink,
  Flag,
  MoreHorizontal,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Textarea } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { ReviewCardProps } from "./types";

export function ReviewCard({
  review,
  isReported = false,
  onOpenDetail,
  onRespondClick,
  onSaveInlineResponse,
  onRequestDeleteResponse,
  onRequestReportReview,
}: ReviewCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingResponse, setEditingResponse] = useState(false);
  const [responseDraft, setResponseDraft] = useState(
    review.response?.text ?? ""
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  const showAttentionHighlight =
    review.direction === "received" &&
    Boolean(review.requiresAttention) &&
    !review.response;

  const isReceived = review.direction === "received";
  const displayName = isReceived ? review.authorName : review.recipientName;
  const displayAvatar = isReceived
    ? review.authorAvatarUrl
    : review.recipientAvatarUrl;

  const handleSaveEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!responseDraft.trim()) return;
    onSaveInlineResponse(review.id, responseDraft.trim());
    setEditingResponse(false);
  };

  return (
    <article
      className={cn(
        "rounded-2xl border bg-card shadow-2xs transition-colors",
        showAttentionHighlight ? "border-error/45" : "border-border"
      )}
    >
      <div className="p-5 sm:p-6 space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <FallbackImage
              src={displayAvatar}
              alt={displayName}
              fallbackType="user"
              variant="avatar"
              className="size-10 rounded-full border border-border bg-secondary object-cover shrink-0"
            />

            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/reviews/${encodeURIComponent(review.id)}`}
                  className="text-sm font-bold text-foreground hover:text-primary transition-colors truncate"
                >
                  {displayName}
                </Link>
                {!isReceived && (
                  <span className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-semibold text-muted-foreground">
                    #{review.orderCode}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div
                  aria-label={`${review.rating} out of 5 stars`}
                  className="flex items-center gap-0.5 shrink-0"
                >
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <Star
                      key={starIndex}
                      className={cn(
                        "size-3.5 shrink-0",
                        starIndex <= review.rating
                          ? "text-warning fill-warning"
                          : "text-border fill-border"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {review.dateLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {showAttentionHighlight && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-bg text-error text-[10px] font-bold uppercase tracking-wider">
                REQUIRES ATTENTION
              </span>
            )}

            {isReported && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-warning-bg text-warning text-[10px] font-bold uppercase tracking-wider">
                REPORTED
              </span>
            )}

            <div ref={menuRef} className="relative">
              <button
                type="button"
                aria-label="Review options"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
              >
                <MoreHorizontal className="size-4" />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-1.5 w-48 rounded-xl border border-border bg-card shadow-lg py-1.5 z-20"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenDetail(review.id);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-foreground hover:bg-secondary/70 flex items-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="size-3.5 text-muted-foreground" />
                    <span>View Review Detail</span>
                  </button>

                  {isReceived && (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        if (review.response) {
                          setResponseDraft(review.response.text);
                          setEditingResponse(true);
                        } else {
                          onRespondClick(review.id);
                        }
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-foreground hover:bg-secondary/70 flex items-center gap-2 cursor-pointer"
                    >
                      <CornerDownRight className="size-3.5 text-muted-foreground" />
                      <span>
                        {review.response ? "Edit Response" : "Respond to Review"}
                      </span>
                    </button>
                  )}

                  {review.response && (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        onRequestDeleteResponse(review);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-error hover:bg-error-bg/60 flex items-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="size-3.5" />
                      <span>Delete Response</span>
                    </button>
                  )}

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      onRequestReportReview(review);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/70 flex items-center gap-2 cursor-pointer"
                  >
                    <Flag className="size-3.5" />
                    <span>{isReported ? "Reported" : "Report Review"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
          {review.comment}
        </p>
      </div>

      {/* Response / Action Footer */}
      {editingResponse ? (
        <form
          onSubmit={handleSaveEdit}
          className="border-t border-border bg-secondary/35 p-5 sm:px-6 space-y-3 rounded-b-2xl"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
            <CornerDownRight className="size-3.5" />
            <span>EDIT YOUR RESPONSE</span>
          </div>

          <Textarea
            value={responseDraft}
            maxLength={500}
            onChange={(e) => setResponseDraft(e.target.value)}
            placeholder="Update your public response..."
            className="min-h-20 bg-card text-xs sm:text-sm resize-none"
          />

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setEditingResponse(false)}
              className="h-8 px-3 rounded-lg text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!responseDraft.trim()}
              className="h-8 px-4 rounded-lg text-xs font-semibold"
            >
              Save Response
            </Button>
          </div>
        </form>
      ) : review.response ? (
        <div className="border-t border-border bg-secondary/35 px-5 py-4 sm:px-6 space-y-2.5 rounded-b-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <CornerDownRight className="size-3.5 text-primary shrink-0" />
              <span>
                {isReceived ? "YOUR RESPONSE" : "PROFESSIONAL RESPONSE"}
              </span>
            </div>

            <span className="text-[11px] italic text-muted-foreground">
              Replied on {review.response.repliedAtLabel}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
            {review.response.text}
          </p>

          {isReceived && (
            <div className="flex items-center gap-4 pt-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setResponseDraft(review.response?.text ?? "");
                  setEditingResponse(true);
                }}
                className="text-foreground underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
              >
                Edit response
              </button>
              <button
                type="button"
                onClick={() => onRequestDeleteResponse(review)}
                className="text-muted-foreground hover:text-error transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ) : isReceived ? (
        <div className="border-t border-border px-5 py-3.5 sm:px-6 flex flex-wrap items-center justify-between gap-2">
          <Link
            href={`/reviews/${encodeURIComponent(review.id)}`}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            View Details
          </Link>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => onRespondClick(review.id)}
            leadingIcon={<CornerDownRight className="size-3.5" />}
            className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
          >
            Respond to Review
          </Button>
        </div>
      ) : (
        <div className="border-t border-border px-5 py-3.5 sm:px-6 flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground truncate">
            {review.serviceTitle} • {review.locationLabel}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenDetail(review.id)}
            className="h-8 px-3.5 rounded-lg text-xs font-semibold shrink-0"
          >
            View Detail
          </Button>
        </div>
      )}
    </article>
  );
}

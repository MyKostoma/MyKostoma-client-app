"use client";

import { FileText, Image as ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import type { DisputeEvidenceThreadProps } from "./types";

export function DisputeEvidenceThread({
  responses,
  isProfessional,
  isResolved,
  onPreviewAttachment,
  onAddEvidence,
}: DisputeEvidenceThreadProps) {
  return (
    <section aria-labelledby="evidence-responses-heading" className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2
          id="evidence-responses-heading"
          className="text-base font-extrabold tracking-tight text-foreground"
        >
          Evidence &amp; Responses
        </h2>

        {!isResolved && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddEvidence}
            leadingIcon={<Plus className="size-3.5" />}
            className="h-8 px-3 rounded-lg text-xs font-semibold"
          >
            Add Response
          </Button>
        )}
      </div>

      {responses.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-6 text-center space-y-3">
          <p className="text-xs sm:text-sm text-muted-foreground">
            No follow-up evidence or statements have been uploaded yet.
          </p>
          {!isResolved && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAddEvidence}
              className="h-9 px-4 rounded-xl text-xs font-semibold"
            >
              Upload Supporting Evidence
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {responses.map((entry) => {
            const isSelf =
              (entry.authorRole === "professional" && isProfessional) ||
              (entry.authorRole === "consumer" && !isProfessional);

            const roleHeading =
              entry.authorRole === "consumer"
                ? isSelf
                  ? "Consumer (You)"
                  : `${entry.authorName} (Consumer)`
                : entry.authorRole === "professional"
                ? isSelf
                  ? `${entry.authorName} (You)`
                  : `${entry.authorName} (Professional)`
                : `${entry.authorName} (Mediator)`;

            const hasAttachments =
              Boolean(entry.attachments) && entry.attachments!.length > 0;

            return (
              <article
                key={entry.id}
                className="rounded-2xl border border-border bg-card p-5 space-y-3.5 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <FallbackImage
                    src={entry.authorAvatarUrl}
                    alt={entry.authorName}
                    fallbackType="user"
                    variant="avatar"
                    className="size-9 rounded-full object-cover border border-border bg-secondary shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">
                      {roleHeading}
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      {entry.timestampLabel}
                    </p>
                  </div>
                </div>

                {hasAttachments ? (
                  <>
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                      {entry.message}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                      {entry.attachments!.map((att) => (
                        <button
                          key={att.id}
                          type="button"
                          onClick={() => onPreviewAttachment(att)}
                          className="group rounded-xl border border-border bg-secondary/60 hover:bg-secondary p-3 min-h-24 flex flex-col items-center justify-center text-center gap-1.5 transition-colors cursor-pointer overflow-hidden"
                        >
                          {att.previewUrl ? (
                            <FallbackImage
                              src={att.previewUrl}
                              alt={att.label}
                              fallbackType="general"
                              variant="card"
                              className="h-14 w-full rounded-md object-cover"
                            />
                          ) : att.fileType === "image" ? (
                            <ImageIcon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          ) : (
                            <FileText className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                          <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-foreground leading-tight line-clamp-2">
                            {att.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl border border-border bg-secondary/35 px-4 py-3 text-xs sm:text-sm text-foreground leading-relaxed italic">
                    {entry.message}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

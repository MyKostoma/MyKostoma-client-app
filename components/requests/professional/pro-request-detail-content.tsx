"use client";

import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Download,
  MapPin,
  Paperclip,
  Shield,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import type { ProfessionalRequestItem } from "../types";

export interface ProRequestDetailContentProps {
  request: ProfessionalRequestItem;
  isSaved: boolean;
  onBack: () => void;
  onSubmitQuote: () => void;
  onToggleSave: () => void;
  onDownloadAttachment: () => void;
}

export function ProRequestDetailContent({
  request,
  isSaved,
  onBack,
  onSubmitQuote,
  onToggleSave,
  onDownloadAttachment,
}: ProRequestDetailContentProps) {
  const filledStars = Math.round(request.client.rating);

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <ArrowLeft className="size-3.5" />
        <span>Back to Requests</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-7">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-secondary text-[10px] font-bold uppercase tracking-wider text-foreground">
                {request.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="size-3 shrink-0" />
                <span>{request.postedDateLabel}</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              {request.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-border/70">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                BUDGET
              </p>
              <p className="text-xs sm:text-sm font-extrabold text-foreground">
                {request.budgetLabel}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                LOCATION
              </p>
              <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground">
                <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                <span>{request.location}</span>
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                TIMELINE
              </p>
              <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground">
                <Calendar className="size-3.5 text-muted-foreground shrink-0" />
                <span>{request.timeline}</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-foreground">
              Project Description
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {request.fullDescription.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-foreground">
              Requirements
            </h2>
            <ul className="space-y-2.5">
              {request.requirements.map((reqText, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
                >
                  <Check className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{reqText}</span>
                </li>
              ))}
            </ul>
          </div>

          {request.attachment && (
            <div className="rounded-xl border border-border bg-secondary/35 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-10 rounded-lg bg-secondary border border-border/60 flex items-center justify-center text-muted-foreground shrink-0">
                  <Paperclip className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">
                    {request.attachment.fileName}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {request.attachment.fileSize} •{" "}
                    {request.attachment.fileType}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onDownloadAttachment}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
              >
                <span>Download</span>
                <Download className="size-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-6">
            <div className="space-y-3">
              <h2 className="text-sm font-extrabold text-foreground">
                Interested in this project?
              </h2>

              <div className="space-y-2.5">
                <Button
                  type="button"
                  variant="default"
                  onClick={onSubmitQuote}
                  className="w-full h-10 rounded-lg text-xs font-semibold shadow-xs"
                >
                  Submit Quote
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={onToggleSave}
                  className="w-full h-10 rounded-lg text-xs font-semibold"
                >
                  {isSaved ? "Saved for Later" : "Save for Later"}
                </Button>
              </div>
            </div>

            <div className="pt-5 border-t border-border/70 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                CLIENT INFORMATION
              </p>

              <div className="flex items-center gap-3">
                <FallbackImage
                  src={request.client.avatarUrl}
                  alt={request.client.name}
                  variant="avatar"
                  className="size-10 text-xs"
                />
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">
                    {request.client.name}
                  </p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={
                          idx < filledStars
                            ? "size-3 text-foreground fill-foreground"
                            : "size-3 text-muted-foreground/40"
                        }
                      />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1">
                      ({request.client.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="font-bold text-foreground">
                    {request.client.memberSince}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Verified identity
                  </span>
                  <CheckCircle2 className="size-4 text-success fill-success/15" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment method</span>
                  <CheckCircle2 className="size-4 text-success fill-success/15" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <Shield className="size-3.5 text-foreground shrink-0" />
              <span className="uppercase tracking-wider text-[10px]">
                SAFETY TIPS
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Always communicate through the MyKostoma platform. Never share
              personal bank details or make payments outside the system to
              ensure your protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

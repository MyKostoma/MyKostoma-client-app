"use client";

import { ArrowLeft, CheckCircle2, Lock, SearchX, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProRequestUnavailableStateProps {
  referenceId: string;
  onBackToRequests: () => void;
  onViewSimilarRequests: () => void;
}

export function ProRequestUnavailableState({
  referenceId,
  onBackToRequests,
  onViewSimilarRequests,
}: ProRequestUnavailableStateProps) {
  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-12 shadow-2xs flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
          <SearchX className="size-5" />
        </div>

        <div className="space-y-2 max-w-md">
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
            Request No Longer Available
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            This request has been closed, cancelled by the client, or awarded to
            another professional.
          </p>
        </div>

        <div className="w-full max-w-xs space-y-2.5">
          <Button
            type="button"
            variant="default"
            onClick={onBackToRequests}
            leadingIcon={<ArrowLeft className="size-4" />}
            className="w-full h-10 rounded-lg text-xs font-bold shadow-xs"
          >
            Back to Requests
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onViewSimilarRequests}
            className="w-full h-10 rounded-lg text-xs font-semibold"
          >
            View Similar Requests
          </Button>
        </div>

        <div className="w-full pt-5 border-t border-border/70">
          <p className="text-[11px] text-muted-foreground">
            Reference ID: {referenceId}
          </p>
        </div>
      </div>
    </div>
  );
}

export interface ProRequestPermissionErrorStateProps {
  restrictedCategory: string;
  reasons?: { id: string; label: string; isIssue: boolean }[];
  onCompleteVerification: () => void;
  onUpdateProfileCategory: () => void;
  onContactSupport: () => void;
}

export function ProRequestPermissionErrorState({
  restrictedCategory,
  reasons = [
    {
      id: "identity",
      label: "Identity verification not completed",
      isIssue: false,
    },
    {
      id: "category",
      label: "Primary category mismatch",
      isIssue: true,
    },
  ],
  onCompleteVerification,
  onUpdateProfileCategory,
  onContactSupport,
}: ProRequestPermissionErrorStateProps) {
  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-12 shadow-2xs flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
          <Lock className="size-5" />
        </div>

        <div className="space-y-2 max-w-md">
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
            Verification Required
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            This request is restricted to{" "}
            <strong className="font-bold text-foreground">
              Verified Professionals
            </strong>{" "}
            in the{" "}
            <strong className="font-bold text-foreground">
              {restrictedCategory}
            </strong>{" "}
            category.
          </p>
        </div>

        <div className="w-full max-w-xl rounded-xl border border-border bg-secondary/30 p-4 sm:p-5 text-left space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            WHY CAN&apos;T I SEE THIS?
          </p>

          <ul className="space-y-2">
            {reasons.map((reason) => (
              <li
                key={reason.id}
                className="flex items-center gap-2.5 text-xs text-muted-foreground"
              >
                {reason.isIssue ? (
                  <XCircle className="size-4 text-foreground shrink-0" />
                ) : (
                  <CheckCircle2 className="size-4 text-muted-foreground/50 shrink-0" />
                )}
                <span>{reason.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-xs space-y-2.5">
          <Button
            type="button"
            variant="default"
            onClick={onCompleteVerification}
            className="w-full h-10 rounded-lg text-xs font-bold shadow-xs"
          >
            Complete Verification
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onUpdateProfileCategory}
            className="w-full h-10 rounded-lg text-xs font-semibold"
          >
            Update Profile Category
          </Button>
        </div>

        <button
          type="button"
          onClick={onContactSupport}
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors cursor-pointer"
        >
          Contact Support for help
        </button>
      </div>
    </div>
  );
}

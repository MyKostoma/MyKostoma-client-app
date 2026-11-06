"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  RequestForm,
  type RequestFormValues,
} from "@/components/requests";
import { DEFAULT_EDIT_REQUEST_VALUES } from "./data";

export interface EditRequestViewProps {
  requestId?: string;
  initialValues?: RequestFormValues;
}

export function EditRequestView({
  requestId = "REQ-2026-0842",
  initialValues = DEFAULT_EDIT_REQUEST_VALUES,
}: EditRequestViewProps) {
  const router = useRouter();
  const [formValues, setFormValues] =
    useState<RequestFormValues>(initialValues);

  const handleBackToDetail = () => {
    router.push(`/requests/${encodeURIComponent(requestId)}`);
  };

  const handleSaveChanges = () => {
    toast.success("Request changes saved successfully.");
    router.push(`/requests/${encodeURIComponent(requestId)}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBackToDetail}
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <span className="size-4 rounded-full bg-muted-foreground text-card flex items-center justify-center shrink-0">
              <ArrowLeft className="size-2.5 stroke-[3]" />
            </span>
            <span>Back to Request Detail</span>
          </button>

          <span aria-hidden="true" className="h-4 w-px bg-border" />

          <h1 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
            Edit Request
          </h1>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBackToDetail}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Discard Changes
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleSaveChanges}
            className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <RequestForm
        mode="edit"
        values={formValues}
        onChange={setFormValues}
        onCancel={handleBackToDetail}
        onSubmit={handleSaveChanges}
      />
    </div>
  );
}

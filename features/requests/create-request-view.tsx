"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  RequestForm,
  RequestSubmittedSuccess,
  type RequestFormValues,
} from "@/components/requests";

export interface CreateRequestViewProps {
  initialSubmitted?: boolean;
}

export function CreateRequestView({
  initialSubmitted = false,
}: CreateRequestViewProps) {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(initialSubmitted);
  const [formValues, setFormValues] = useState<RequestFormValues>({
    title: "",
    category: "",
    description: "",
    budgetMin: "",
    budgetMax: "",
    timeline: "",
    location: "",
    photos: [],
  });

  const handleSaveDraft = () => {
    toast.success("Request saved as draft.");
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSubmitted) {
    return (
      <RequestSubmittedSuccess
        onViewRequestDetail={() => router.push("/requests/REQ-2026-0842")}
        onBackToMyRequests={() => router.push("/requests")}
        onNotificationsClick={() => router.push("/dashboard")}
        onInboxClick={() => router.push("/messages")}
        onSettingsClick={() => router.push("/settings")}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/requests")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Requests</span>
          </button>

          <span aria-hidden="true" className="h-4 w-px bg-border" />

          <h1 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
            Create New Request
          </h1>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Save as Draft
          </button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleSubmit}
            className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
          >
            Submit Request
          </Button>
        </div>
      </div>

      <RequestForm
        mode="create"
        values={formValues}
        onChange={setFormValues}
        onCancel={() => router.push("/requests")}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

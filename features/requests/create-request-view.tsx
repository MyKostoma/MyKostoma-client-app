"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  RequestForm,
  RequestSubmittedSuccess,
  type RequestFormValues,
} from "@/components/requests";
import {
  DashboardTopBarSlot,
  RequestFormTopBar,
} from "@/components/layouts/top-bars";

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
    <>
      {/* Dynamic TopBar mounted into DashboardLayout */}
      <DashboardTopBarSlot>
        <RequestFormTopBar
          title="Create New Request"
          backLabel="Back to Requests"
          onBack={() => router.push("/requests")}
          secondaryActionLabel="Save as Draft"
          onSecondaryAction={handleSaveDraft}
          primaryActionLabel="Submit Request"
          onPrimaryAction={handleSubmit}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <RequestForm
          mode="create"
          values={formValues}
          onChange={setFormValues}
          onCancel={() => router.push("/requests")}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

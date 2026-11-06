"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  RequestForm,
  type RequestFormValues,
} from "@/components/requests";
import {
  DashboardTopBarSlot,
  RequestFormTopBar,
} from "@/components/layouts/top-bars";
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
    <>
      {/* Dynamic TopBar mounted into DashboardLayout */}
      <DashboardTopBarSlot>
        <RequestFormTopBar
          title="Edit Request"
          backLabel="Back to Request Detail"
          onBack={handleBackToDetail}
          secondaryActionLabel="Discard Changes"
          onSecondaryAction={handleBackToDetail}
          primaryActionLabel="Save Changes"
          onPrimaryAction={handleSaveChanges}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <RequestForm
          mode="edit"
          values={formValues}
          onChange={setFormValues}
          onCancel={handleBackToDetail}
          onSubmit={handleSaveChanges}
        />
      </div>
    </>
  );
}

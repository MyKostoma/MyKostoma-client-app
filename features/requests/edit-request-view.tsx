"use client";

import { RequestForm } from "@/components/requests/request-form";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { RequestFormTopBar } from "@/components/layouts/top-bars/requests/request-form-top-bar";
import { Button } from "@/components/ui/button";
import { DEFAULT_EDIT_REQUEST_VALUES } from "./data";
import { useEditRequestService } from "./services/requestsApi";
import type { EditRequestViewProps } from "./types";

export type { EditRequestViewProps } from "./types";

export function EditRequestView({
  requestId = "REQ-2026-0842",
  initialValues = DEFAULT_EDIT_REQUEST_VALUES,
}: EditRequestViewProps) {
  const {
    formValues,
    setFormValues,
    handleBackToDetail,
    handleSaveChanges,
  } = useEditRequestService(requestId, initialValues);

  return (
    <>
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
        <div className="flex md:hidden items-center justify-end gap-2.5 sm:gap-3 shrink-0 ml-auto">
          <button
            type="button"
            onClick={handleBackToDetail}
            className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Discard Changes
          </button>

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

export default EditRequestView;

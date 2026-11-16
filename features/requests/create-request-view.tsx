"use client";

import { RequestForm } from "@/components/requests/request-form";
import { RequestSubmittedSuccess } from "@/components/requests/request-submitted-success";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { RequestFormTopBar } from "@/components/layouts/top-bars/requests/request-form-top-bar";
import { Button } from "@/components/ui/button";
import { useCreateRequestService } from "./services/requestsApi";
import type { CreateRequestViewProps } from "./types";

export type { CreateRequestViewProps } from "./types";

export function CreateRequestView({
  initialSubmitted = false,
}: CreateRequestViewProps) {
  const {
    isSubmitted,
    formValues,
    setFormValues,
    handleSaveDraft,
    handleSubmit,
    handleBackToRequests,
    handleViewRequestDetail,
    handleNotificationsClick,
    handleInboxClick,
    handleSettingsClick,
  } = useCreateRequestService(initialSubmitted);

  if (isSubmitted) {
    return (
      <RequestSubmittedSuccess
        onViewRequestDetail={handleViewRequestDetail}
        onBackToMyRequests={handleBackToRequests}
        onNotificationsClick={handleNotificationsClick}
        onInboxClick={handleInboxClick}
        onSettingsClick={handleSettingsClick}
      />
    );
  }

  return (
    <>
      <DashboardTopBarSlot>
        <RequestFormTopBar
          title="Create New Request"
          backLabel="Back to Requests"
          onBack={handleBackToRequests}
          secondaryActionLabel="Save as Draft"
          onSecondaryAction={handleSaveDraft}
          primaryActionLabel="Submit Request"
          onPrimaryAction={handleSubmit}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <div className="flex md:hidden items-center justify-end gap-2.5 sm:gap-3 shrink-0 ml-auto">
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

        <RequestForm
          mode="create"
          values={formValues}
          onChange={setFormValues}
          onCancel={handleBackToRequests}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default CreateRequestView;

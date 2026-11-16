"use client";

import { Plus } from "lucide-react";
import {
  RequestsFilterTabs,
  RequestsTableCard,
  RequestSupportHelpCard,
} from "@/components/requests/requests-table";
import {
  RequestsErrorState,
} from "@/components/requests/requests-state-cards";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { RequestsListTopBar } from "@/components/layouts/top-bars/requests/requests-list-top-bar";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import { useRequestsListService } from "./services/requestsApi";
import type { RequestsListViewProps } from "./types";

export type { RequestsListViewProps } from "./types";

export function RequestsListView({
  requests,
  totalCountLabel = "12 Total",
  error = null,
  onRetry,
}: RequestsListViewProps) {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredRequests,
    handleViewDetails,
    handleCreateRequest,
    handleContactSupport,
  } = useRequestsListService(requests);

  return (
    <>
      <DashboardTopBarSlot>
        <RequestsListTopBar
          totalCountLabel={totalCountLabel}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateRequest={handleCreateRequest}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <div className="flex md:hidden items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
          <div className="w-full md:w-64">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search requests..."
              className="h-9 text-xs bg-secondary/40"
            />
          </div>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => handleCreateRequest()}
            leadingIcon={<Plus className="size-4" />}
            className="h-9 px-3.5 sm:px-4 rounded-lg text-xs font-semibold shadow-xs shrink-0"
          >
            <span className="hidden sm:inline">Create Request</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>

        <RequestsFilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {error ? (
          <RequestsErrorState
            title="Failed to load requests"
            description={error}
            onRetry={onRetry}
          />
        ) : (
          <>
            <RequestsTableCard
              requests={filteredRequests}
              onViewDetails={handleViewDetails}
            />

            <RequestSupportHelpCard onContactSupport={handleContactSupport} />
          </>
        )}
      </div>
    </>
  );
}

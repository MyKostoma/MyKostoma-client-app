"use client";

import { Plus } from "lucide-react";
import {
  RequestsFilterTabs,
  RequestsTableCard,
  RequestSupportHelpCard,
} from "@/components/requests/requests-table";
import { RequestsErrorState } from "@/components/requests/requests-state-cards";
import { ProRequestsFilterBar } from "@/components/requests/professional/pro-requests-filter-bar";
import { ProRequestCard } from "@/components/requests/professional/pro-request-card";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { RequestsListTopBar } from "@/components/layouts/top-bars/requests/requests-list-top-bar";
import { ProfessionalRequestsTopBar } from "@/components/layouts/top-bars/requests/professional-requests-top-bar";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import {
  useProfessionalRequestsListService,
  useRequestsListService,
} from "./services/requestsApi";
import type { RequestsListViewProps } from "./types";

export type { RequestsListViewProps } from "./types";

function ConsumerRequestsListView({
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

export function ProfessionalRequestsListView() {
  const {
    draftFilters,
    setDraftFilters,
    filteredRequests,
    savedIds,
    currentPage,
    totalPages,
    handleApplyFilters,
    handleResetFilters,
    handlePageChange,
    handleViewDetails,
    handleToggleSave,
    handleLearnMoreVerification,
  } = useProfessionalRequestsListService();

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalRequestsTopBar
          breadcrumbs={[
            { label: "Pages", href: "/dashboard" },
            { label: "Requests" },
          ]}
          showVerifiedProBadge
        />
      </DashboardTopBarSlot>

      <div className="mx-auto space-y-6">
        <ProRequestsFilterBar
          filters={draftFilters}
          onChange={setDraftFilters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          onLearnMoreVerification={handleLearnMoreVerification}
        />

        {filteredRequests.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-3">
            <p className="text-xs sm:text-sm text-muted-foreground">
              No open requests match your selected filters.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="rounded-lg text-xs font-semibold"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((req) => (
              <ProRequestCard
                key={req.id}
                request={req}
                isSaved={savedIds.includes(req.id)}
                onViewDetails={handleViewDetails}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        )}

        <div className="pt-2 flex justify-center">
          <Pagination className="justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}

export function RequestsListView(props: RequestsListViewProps) {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  if (effectiveRole === "professional") {
    return <ProfessionalRequestsListView />;
  }

  return <ConsumerRequestsListView {...props} />;
}

"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ReviewsTopBar } from "@/components/layouts/top-bars/reviews/reviews-top-bar";
import { ReviewsTabsNav } from "@/components/reviews/reviews-tabs-nav";
import { ReviewsFilterBar } from "@/components/reviews/reviews-filter-bar";
import { ReviewsKpiRow } from "@/components/reviews/reviews-kpi-row";
import { ReviewCard } from "@/components/reviews/review-card";
import { PendingReviewCard } from "@/components/reviews/pending-review-card";
import { ReviewsPagination } from "@/components/reviews/reviews-pagination";
import { ReviewsEmptyState } from "@/components/reviews/reviews-empty-state";
import {
  DeleteReviewResponseModal,
  RateExperienceModal,
  ReportReviewModal,
  ReviewSubmittedModal,
} from "@/components/modals/review-modals";
import { REVIEW_REPORT_REASONS } from "./data";
import { useReviewsDashboardService } from "./services/reviewsApi";

export function ReviewsDashboardView() {
  const {
    activeTab,
    receivedCount,
    givenCount,
    pendingCount,
    kpiSummary,
    searchQuery,
    filterOpen,
    setFilterOpen,
    ratingFilter,
    responseStatusFilter,
    sortBy,
    activeFilterCount,
    filteredReviewsCount,
    paginatedReviews,
    filteredPendingCount,
    paginatedPending,
    reportedReviewIds,
    setCurrentPage,
    deleteResponseTarget,
    setDeleteResponseTarget,
    reportTarget,
    setReportTarget,
    quickRateTarget,
    setQuickRateTarget,
    submittedModalOpen,
    setSubmittedModalOpen,
    submittedVariant,
    handleTabChange,
    handleSearchChange,
    handleRatingChange,
    handleResponseStatusChange,
    handleSortChange,
    handleResetFilters,
    handleSaveInlineResponse,
    handleConfirmDeleteResponse,
    handleConfirmReportReview,
    handleSubmitQuickRate,
    handleNavigateDetail,
    handleNavigateRatePage,
    handleBrowseOrders,
  } = useReviewsDashboardService();

  return (
    <>
      <DashboardTopBarSlot>
        <ReviewsTopBar
          title="Reviews"
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filterOpen={filterOpen}
          activeFilterCount={activeFilterCount}
          onToggleFilters={() => setFilterOpen((prev) => !prev)}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6 pb-10">
        {/* Mobile Search & Filter Bar */}
        <div className="flex md:hidden items-center gap-2.5">
          <div className="flex-1 min-w-0">
            <SearchInput
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search reviews..."
              className="h-9 text-xs bg-card"
            />
          </div>

          <Button
            type="button"
            variant={filterOpen || activeFilterCount > 0 ? "secondary" : "outline"}
            size="sm"
            onClick={() => setFilterOpen((prev) => !prev)}
            leadingIcon={<SlidersHorizontal className="size-3.5" />}
            className="h-9 px-3.5 rounded-lg text-xs font-semibold shrink-0"
          >
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Navigation Tabs */}
        <ReviewsTabsNav
          activeTab={activeTab}
          receivedCount={receivedCount}
          givenCount={givenCount}
          pendingCount={pendingCount}
          onTabChange={handleTabChange}
        />

        {/* Collapsible Filter Controls */}
        {activeTab !== "pending" && (
          <ReviewsFilterBar
            isOpen={filterOpen}
            ratingFilter={ratingFilter}
            responseStatusFilter={responseStatusFilter}
            sortBy={sortBy}
            activeFilterCount={activeFilterCount}
            showResponseStatusFilter={activeTab === "received"}
            onRatingChange={handleRatingChange}
            onResponseStatusChange={handleResponseStatusChange}
            onSortChange={handleSortChange}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* KPI Row for Reviews Received */}
        {activeTab === "received" && <ReviewsKpiRow summary={kpiSummary} />}

        {/* Tab Body */}
        {activeTab === "pending" ? (
          paginatedPending.items.length === 0 ? (
            <ReviewsEmptyState
              tab="pending"
              hasActiveFilters={Boolean(searchQuery.trim())}
              onClearFilters={handleResetFilters}
              onBrowseOrders={handleBrowseOrders}
            />
          ) : (
            <div className="space-y-4">
              {paginatedPending.items.map((order) => (
                <PendingReviewCard
                  key={order.id}
                  order={order}
                  onQuickRate={setQuickRateTarget}
                  onRateOnPage={handleNavigateRatePage}
                />
              ))}

              <ReviewsPagination
                currentPage={paginatedPending.currentPage}
                totalPages={paginatedPending.totalPages}
                startIndex={paginatedPending.startIndex}
                endIndex={paginatedPending.endIndex}
                totalItems={filteredPendingCount}
                itemNoun="pending reviews"
                onPageChange={setCurrentPage}
              />
            </div>
          )
        ) : paginatedReviews.items.length === 0 ? (
          <ReviewsEmptyState
            tab={activeTab}
            hasActiveFilters={activeFilterCount > 0}
            onClearFilters={handleResetFilters}
            onBrowseOrders={handleBrowseOrders}
          />
        ) : (
          <div className="space-y-4">
            {paginatedReviews.items.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                isReported={reportedReviewIds.includes(review.id)}
                onOpenDetail={handleNavigateDetail}
                onRespondClick={handleNavigateDetail}
                onSaveInlineResponse={handleSaveInlineResponse}
                onRequestDeleteResponse={setDeleteResponseTarget}
                onRequestReportReview={setReportTarget}
              />
            ))}

            <ReviewsPagination
              currentPage={paginatedReviews.currentPage}
              totalPages={paginatedReviews.totalPages}
              startIndex={paginatedReviews.startIndex}
              endIndex={paginatedReviews.endIndex}
              totalItems={filteredReviewsCount}
              itemNoun="reviews"
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Independent Conditional Modals */}
      <DeleteReviewResponseModal
        isOpen={Boolean(deleteResponseTarget)}
        authorName={deleteResponseTarget?.authorName ?? "Client"}
        onClose={() => setDeleteResponseTarget(null)}
        onConfirmDelete={handleConfirmDeleteResponse}
      />

      <ReportReviewModal
        isOpen={Boolean(reportTarget)}
        authorName={reportTarget?.authorName ?? "User"}
        reasons={REVIEW_REPORT_REASONS}
        onClose={() => setReportTarget(null)}
        onSubmitReport={handleConfirmReportReview}
      />

      <RateExperienceModal
        isOpen={Boolean(quickRateTarget)}
        variant={
          quickRateTarget?.targetRole === "consumer"
            ? "professional"
            : "consumer"
        }
        recipientName={quickRateTarget?.recipientName ?? "Client"}
        recipientAvatarUrl={quickRateTarget?.recipientAvatarUrl}
        serviceTitle={quickRateTarget?.serviceTitle ?? "Completed Order"}
        completedDateLabel={quickRateTarget?.completedDateLabel ?? ""}
        orderCode={quickRateTarget?.orderCode}
        feeFormatted={quickRateTarget?.feeFormatted}
        onClose={() => setQuickRateTarget(null)}
        onSubmitReview={handleSubmitQuickRate}
      />

      <ReviewSubmittedModal
        isOpen={submittedModalOpen}
        variant={submittedVariant}
        actionLabel="RETURN TO REVIEWS"
        onClose={() => setSubmittedModalOpen(false)}
        onPrimaryAction={() => {
          setSubmittedModalOpen(false);
          handleTabChange("given");
        }}
      />
    </>
  );
}

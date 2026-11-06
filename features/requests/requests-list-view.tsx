"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  RequestsFilterTabs,
  RequestsTableCard,
  RequestSupportHelpCard,
  RequestsErrorState,
  type ConsumerRequestItem,
  type RequestTabFilter,
} from "@/components/requests";
import {
  DashboardTopBarSlot,
  RequestsListTopBar,
} from "@/components/layouts/top-bars";
import { DEFAULT_CONSUMER_REQUESTS } from "./data";

export interface RequestsListViewProps {
  requests?: ConsumerRequestItem[];
  totalCountLabel?: string;
  error?: string | null;
  onRetry?: () => void;
}

export function RequestsListView({
  requests = DEFAULT_CONSUMER_REQUESTS,
  totalCountLabel = "12 Total",
  error = null,
  onRetry,
}: RequestsListViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<RequestTabFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return requests.filter((req) => {
      if (activeTab !== "all" && req.status !== activeTab) {
        return false;
      }
      if (q) {
        const text =
          `${req.title} ${req.category} ${req.location} ${req.code}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [requests, activeTab, searchQuery]);

  const handleViewDetails = (request: ConsumerRequestItem) => {
    router.push(`/requests/${encodeURIComponent(request.id)}`);
  };

  const handleCreateRequest = () => {
    router.push("/requests/new");
  };

  const handleContactSupport = () => {
    toast.info("Connecting you with MyKostoma 24/7 Support...");
  };

  return (
    <>
      {/* Dynamic TopBar mounted into DashboardLayout */}
      <DashboardTopBarSlot>
        <RequestsListTopBar
          totalCountLabel={totalCountLabel}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateRequest={handleCreateRequest}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        {/* Status Filter Tabs (includes Closed tab) */}
        <RequestsFilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Error state if data fetch fails */}
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

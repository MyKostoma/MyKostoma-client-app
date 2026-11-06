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
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import { Plus } from "lucide-react";

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

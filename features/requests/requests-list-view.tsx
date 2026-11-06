"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import {
  RequestsFilterTabs,
  RequestsTableCard,
  RequestSupportHelpCard,
  RequestsErrorState,
  type ConsumerRequestItem,
  type RequestTabFilter,
} from "@/components/requests";
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
    <div className="space-y-6">
      {/* Page Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              My Requests
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs font-semibold select-none">
              {totalCountLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage your service requests, track received quotes, and communicate with professionals.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 md:grid-cols-2 items-center gap-3">
          <div className="w-full sm:col-span-2 md:col-span-1">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search requests..."
              className="h-9.5 text-xs bg-secondary/40"
            />
          </div>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleCreateRequest}
            leadingIcon={<Plus className="size-4" />}
            className="h-9.5 px-4 rounded-lg text-xs font-semibold shadow-xs w-full"
          >
            Create Request
          </Button>
        </div>
      </div>

      {/* Status Filter Tabs */}
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
  );
}

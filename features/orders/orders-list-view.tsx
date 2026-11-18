"use client";

import { Download, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import { OrderCard, OrderSupportCard } from "@/components/orders/order-card";
import { OrdersFilterTabs } from "@/components/orders/orders-filter-tabs";
import {
  ProOrdersFilterTabs,
  ProOrdersKpiRow,
  ProOrdersTable,
} from "@/components/orders/professional/pro-orders-table";
import {
  CancelOrderModal,
  ReleaseMilestoneModal,
} from "@/components/modals/order-modals";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { OrdersListTopBar } from "@/components/layouts/top-bars/orders/orders-list-top-bar";
import { ProfessionalOrdersListTopBar } from "@/components/layouts/top-bars/orders/professional-orders-top-bar";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import {
  useOrdersListService,
  useProfessionalOrdersListService,
} from "./services/ordersApi";
import { resolveNextEscrowMilestone } from "./services/ordersHelpers";
import type { OrdersListViewProps } from "./types";

export type { OrdersListViewProps } from "./types";

function ConsumerOrdersListView({
  initialOrders,
  totalCountLabel = "8 Total",
}: OrdersListViewProps) {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredOrders,
    releasingOrder,
    setReleasingOrder,
    cancellingOrder,
    setCancellingOrder,
    handleViewDetails,
    handleMessagePro,
    handleDepositFunds,
    handleConfirmReleaseMilestone,
    handleConfirmCancelOrder,
    handleDownloadReceipt,
    handleReorderService,
    handleToggleFilters,
    handleContactSupport,
  } = useOrdersListService(initialOrders);

  const releasingMilestone = releasingOrder
    ? resolveNextEscrowMilestone(releasingOrder)
    : null;

  return (
    <>
      <DashboardTopBarSlot>
        <OrdersListTopBar
          totalCountLabel={totalCountLabel}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleFilters={handleToggleFilters}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <div className="flex md:hidden items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
          <div className="w-full">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders..."
              className="h-9 text-xs bg-secondary/40"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleToggleFilters}
            leadingIcon={<SlidersHorizontal className="size-3.5" />}
            className="h-9 px-3.5 rounded-lg text-xs font-semibold shrink-0"
          >
            Filters
          </Button>
        </div>

        <OrdersFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-xs sm:text-sm text-muted-foreground">
            No orders match your current filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={handleViewDetails}
                onMessagePro={handleMessagePro}
                onConfirmMilestone={setReleasingOrder}
                onDepositFunds={handleDepositFunds}
                onCancelOrder={setCancellingOrder}
                onDownloadReceipt={handleDownloadReceipt}
                onReorderService={handleReorderService}
              />
            ))}
          </div>
        )}

        <OrderSupportCard onContactSupport={handleContactSupport} />
      </div>

      <ReleaseMilestoneModal
        isOpen={Boolean(releasingOrder)}
        orderCode={releasingOrder?.code || ""}
        orderTitle={releasingOrder?.title || ""}
        providerName={releasingOrder?.providerName || ""}
        milestoneTitle={releasingMilestone?.title || ""}
        releaseAmount={
          releasingMilestone?.amount || releasingOrder?.totalAmount || ""
        }
        onClose={() => setReleasingOrder(null)}
        onConfirmRelease={handleConfirmReleaseMilestone}
      />

      <CancelOrderModal
        isOpen={Boolean(cancellingOrder)}
        orderCode={cancellingOrder?.code || ""}
        providerName={cancellingOrder?.providerName || ""}
        onClose={() => setCancellingOrder(null)}
        onConfirmCancel={handleConfirmCancelOrder}
      />
    </>
  );
}

export function ProfessionalOrdersListView() {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalCount,
    totalPages,
    filteredOrders,
    kpis,
    handleViewOrder,
    handleRowPrimaryAction,
    handleToggleFilters,
    handleExportOrders,
  } = useProfessionalOrdersListService();

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalOrdersListTopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </DashboardTopBarSlot>

      <div className=" mx-auto space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Orders
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your active services and customer transactions.
          </p>
        </div>

        <div className="sm:hidden">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, clients, or services..."
            className="h-9 text-xs bg-secondary/40"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <ProOrdersFilterTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleToggleFilters}
              leadingIcon={<Filter className="size-3.5" />}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold"
            >
              Filters
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExportOrders}
              leadingIcon={<Download className="size-3.5" />}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold"
            >
              Export
            </Button>
          </div>
        </div>

        <ProOrdersTable
          orders={filteredOrders}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
          onSelectOrder={handleViewOrder}
          onRowAction={handleRowPrimaryAction}
        />

        <ProOrdersKpiRow metrics={kpis} />
      </div>
    </>
  );
}

export function OrdersListView(props: OrdersListViewProps) {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  if (effectiveRole === "professional") {
    return <ProfessionalOrdersListView />;
  }

  return <ConsumerOrdersListView {...props} />;
}

export default OrdersListView;

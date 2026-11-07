"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderDetailOverview } from "@/components/orders/order-detail-overview";
import { OrderStatusWorkspace } from "@/components/orders/order-status-workspace";
import { OrderCompletionWorkspace } from "@/components/orders/order-completion-workspace";
import { ReleaseMilestoneModal } from "@/components/modals/order-modals";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { OrderDetailTopBar } from "@/components/layouts/top-bars/orders/order-detail-top-bar";
import { useOrderDetailService } from "./services/ordersApi";
import type { OrderDetailViewProps } from "./types";

export type { OrderDetailViewProps } from "./types";

export function OrderDetailView({
  orderId = "ORD-5547",
  initialMode = "overview",
}: OrderDetailViewProps) {
  const {
    order,
    completedReferenceOrder,
    cancelledReferenceOrder,
    nextMilestone,
    activeMode,
    setActiveMode,
    releaseModalOpen,
    setReleaseModalOpen,
    handleBackToOrders,
    handleMessagePro,
    handleManageOrder,
    handleViewOriginalQuote,
    handleViewProfile,
    handleLeaveReview,
    handleDisputeOrder,
    handleContactSupport,
    handleViewPaymentHistory,
    handleViewProjectSpecs,
    handleEscrowFaq,
    handleViewReceipt,
    handleConfirmRelease,
  } = useOrderDetailService(orderId, initialMode);

  const topBarTitle =
    activeMode === "status"
      ? "Order Status"
      : activeMode === "completion"
        ? "Order Completion"
        : `Order #${order.code}`;

  const topBarSubtitle =
    activeMode === "overview"
      ? order.title
      : `Order #${order.code} • ${order.title}`;

  const topBarStatus =
    activeMode === "completion" && order.status !== "completed"
      ? "awaiting-confirmation"
      : order.status;

  const messageLabel =
    activeMode === "completion"
      ? "Message Artisan"
      : activeMode === "status"
        ? "Message Pro"
        : "Message Professional";

  return (
    <>
      <DashboardTopBarSlot>
        <OrderDetailTopBar
          title={topBarTitle}
          subtitle={topBarSubtitle}
          status={topBarStatus}
          onBack={handleBackToOrders}
          messageLabel={messageLabel}
          onMessagePro={handleMessagePro}
          primaryActionLabel={
            activeMode === "overview" ? "Manage Order" : undefined
          }
          onPrimaryAction={
            activeMode === "overview" ? handleManageOrder : undefined
          }
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <div className="flex sm:hidden flex-wrap items-center justify-end gap-2 shrink-0 ml-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleMessagePro}
            leadingIcon={<MessageSquare className="size-3.5" />}
            className="h-9 px-3.5 rounded-lg text-xs font-semibold"
          >
            {messageLabel}
          </Button>

          {activeMode === "overview" && (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleManageOrder}
              className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
            >
              Manage Order
            </Button>
          )}
        </div>

        {activeMode === "overview" && (
          <OrderDetailOverview
            order={order}
            onViewOriginalQuote={handleViewOriginalQuote}
            onReleaseFinalMilestone={() => setReleaseModalOpen(true)}
            onViewProfile={handleViewProfile}
            onLeaveReview={handleLeaveReview}
            onDisputeOrder={handleDisputeOrder}
            onContactSupport={handleContactSupport}
          />
        )}

        {activeMode === "status" && (
          <OrderStatusWorkspace
            order={order}
            onViewPaymentHistory={handleViewPaymentHistory}
            onReleaseRemainingFunds={() => setReleaseModalOpen(true)}
            onViewProjectSpecs={handleViewProjectSpecs}
            onDisputeOrder={handleDisputeOrder}
            onEscrowFaq={handleEscrowFaq}
          />
        )}

        {activeMode === "completion" && (
          <OrderCompletionWorkspace
            order={order}
            completedReferenceOrder={completedReferenceOrder}
            cancelledReferenceOrder={cancelledReferenceOrder}
            onConfirmAndRelease={() => setReleaseModalOpen(true)}
            onRaiseConcern={handleDisputeOrder}
            onLeaveReview={handleLeaveReview}
            onViewReceipt={handleViewReceipt}
            onDisputeResolution={handleDisputeOrder}
            onViewHistory={handleViewPaymentHistory}
          />
        )}
      </div>

      <ReleaseMilestoneModal
        isOpen={releaseModalOpen}
        orderCode={order.code}
        orderTitle={order.title}
        providerName={order.providerName}
        milestoneTitle={nextMilestone.title}
        releaseAmount={nextMilestone.amount}
        onClose={() => setReleaseModalOpen(false)}
        onConfirmRelease={handleConfirmRelease}
      />
    </>
  );
}

export default OrderDetailView;

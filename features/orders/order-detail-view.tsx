"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderDetailOverview } from "@/components/orders/order-detail-overview";
import { OrderStatusWorkspace } from "@/components/orders/order-status-workspace";
import { OrderCompletionWorkspace } from "@/components/orders/order-completion-workspace";
import { ProOrderDetailWorkspace } from "@/components/orders/professional/pro-order-detail-workspace";
import { ProOrderEscrowStatus } from "@/components/orders/professional/pro-order-escrow-status";
import { ReleaseMilestoneModal } from "@/components/modals/order-modals";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { OrderDetailTopBar } from "@/components/layouts/top-bars/orders/order-detail-top-bar";
import { ProfessionalOrderSubpageTopBar } from "@/components/layouts/top-bars/orders/professional-orders-top-bar";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import { DEFAULT_PROFESSIONAL_ORDERS } from "./data";
import {
  useOrderDetailService,
  useProfessionalOrderDetailService,
} from "./services/ordersApi";
import type { OrderDetailViewProps } from "./types";

export type { OrderDetailViewProps } from "./types";

function ConsumerOrderDetailView({
  orderId = "ORD-5547",
  initialMode = "overview",
}: OrderDetailViewProps) {
  const {
    order,
    completedReferenceOrder,
    cancelledReferenceOrder,
    nextMilestone,
    activeMode,
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

export function ProfessionalOrderDetailView({
  orderId = "ORD-2026-001",
  initialMode = "overview",
}: OrderDetailViewProps) {
  const {
    order,
    completionNotes,
    setCompletionNotes,
    uploadedDeliverableName,
    handleBackToOrders,
    handleBackToOrderDetail,
    handleStartOrder,
    handleMarkCompleted,
    handleUploadDeliverable,
    handleMessageConsumer,
    handleViewConsumerProfile,
    handleViewEscrowDetails,
    handleRaiseDispute,
    handleLeaveReview,
    handleDownloadAttachment,
    handleOrderGuidelines,
    handleContactSupport,
    handleReadEscrowPolicy,
  } = useProfessionalOrderDetailService(orderId);

  if (initialMode === "status") {
    return (
      <>
        <DashboardTopBarSlot>
          <ProfessionalOrderSubpageTopBar
            backLabel={`Back to Order #${order.code}`}
            onBack={handleBackToOrderDetail}
          />
        </DashboardTopBarSlot>

        <ProOrderEscrowStatus
          order={order}
          onContactSupport={handleContactSupport}
          onReadEscrowPolicy={handleReadEscrowPolicy}
          onMessageConsumer={handleMessageConsumer}
        />
      </>
    );
  }

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalOrderSubpageTopBar
          backLabel="Back to Orders"
          onBack={handleBackToOrders}
        />
      </DashboardTopBarSlot>

      <ProOrderDetailWorkspace
        order={order}
        completionNotes={completionNotes}
        uploadedDeliverableName={uploadedDeliverableName}
        onCompletionNotesChange={setCompletionNotes}
        onUploadDeliverable={handleUploadDeliverable}
        onStartOrder={handleStartOrder}
        onMarkCompleted={handleMarkCompleted}
        onLeaveReview={handleLeaveReview}
        onMessageConsumer={handleMessageConsumer}
        onViewProfile={handleViewConsumerProfile}
        onViewEscrowDetails={handleViewEscrowDetails}
        onRaiseDispute={handleRaiseDispute}
        onOrderGuidelines={handleOrderGuidelines}
        onDownloadAttachment={handleDownloadAttachment}
      />
    </>
  );
}

export function OrderDetailView(props: OrderDetailViewProps) {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  const orderId = props.orderId ?? "ORD-5547";
  const isProOrderId = DEFAULT_PROFESSIONAL_ORDERS.some(
    (o) =>
      o.id.toLowerCase() === orderId.toLowerCase() ||
      o.code.toLowerCase() === orderId.toLowerCase()
  );

  if (effectiveRole === "professional" || isProOrderId) {
    return <ProfessionalOrderDetailView {...props} />;
  }

  return <ConsumerOrderDetailView {...props} />;
}

export default OrderDetailView;

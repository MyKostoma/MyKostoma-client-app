"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderFeedbackForm } from "@/components/orders/order-feedback-form";
import { RaiseDisputeModal } from "@/components/modals/order-modals";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { OrderDetailTopBar } from "@/components/layouts/top-bars/orders/order-detail-top-bar";
import { useOrderFeedbackService } from "./services/ordersApi";
import type { OrderFeedbackViewProps } from "./types";

export type { OrderFeedbackViewProps } from "./types";

export function OrderFeedbackView({
  orderId = "ORD-8821",
}: OrderFeedbackViewProps) {
  const {
    order,
    formValues,
    setFormValues,
    disputeModalOpen,
    setDisputeModalOpen,
    handleBackToOrder,
    handleMessagePro,
    handleSubmitReview,
    handleConfirmDispute,
    handleLearnResolutionPolicy,
  } = useOrderFeedbackService(orderId);

  return (
    <>
      <DashboardTopBarSlot>
        <OrderDetailTopBar
          title="Project Feedback & Dispute"
          subtitle={`Order #${order.code} • ${order.title}`}
          status="awaiting-feedback"
          onBack={handleBackToOrder}
          messageLabel="Message Pro"
          onMessagePro={handleMessagePro}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <div className="flex sm:hidden items-center justify-end gap-2 shrink-0 ml-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleMessagePro}
            leadingIcon={<MessageSquare className="size-3.5" />}
            className="h-9 px-3.5 rounded-lg text-xs font-semibold"
          >
            Message Pro
          </Button>
        </div>

        <OrderFeedbackForm
          order={order}
          values={formValues}
          onChange={setFormValues}
          onSubmitReview={handleSubmitReview}
          onRaiseDispute={() => setDisputeModalOpen(true)}
          onLearnResolutionPolicy={handleLearnResolutionPolicy}
        />
      </div>

      <RaiseDisputeModal
        isOpen={disputeModalOpen}
        orderCode={order.code}
        providerName={order.providerName}
        escrowAmount={order.totalAmount}
        onClose={() => setDisputeModalOpen(false)}
        onSubmitDispute={handleConfirmDispute}
      />
    </>
  );
}

export default OrderFeedbackView;

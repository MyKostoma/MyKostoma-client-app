"use client";

import { ProOrderDisputeForm } from "@/components/orders/professional/pro-order-dispute-form";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ProfessionalOrderSubpageTopBar } from "@/components/layouts/top-bars/orders/professional-orders-top-bar";
import { useProfessionalOrderDisputeService } from "./services/ordersApi";
import type { OrderDisputeViewProps } from "./types";

export type { OrderDisputeViewProps } from "./types";

export function OrderDisputeView({
  orderId = "ORD-2026-001",
}: OrderDisputeViewProps) {
  const {
    order,
    values,
    setValues,
    handleBackToEscrow,
    handleAddEvidence,
    handleRemoveEvidence,
    handleSubmitDispute,
    handleMessageConsumer,
    handleContactSupport,
  } = useProfessionalOrderDisputeService(orderId);

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalOrderSubpageTopBar
          backLabel="Back to Escrow Details"
          onBack={handleBackToEscrow}
        />
      </DashboardTopBarSlot>

      <ProOrderDisputeForm
        order={order}
        values={values}
        onChange={setValues}
        onAddEvidence={handleAddEvidence}
        onRemoveEvidence={handleRemoveEvidence}
        onCancel={handleBackToEscrow}
        onSubmit={handleSubmitDispute}
        onMessageConsumer={handleMessageConsumer}
        onContactSupport={handleContactSupport}
      />
    </>
  );
}

export default OrderDisputeView;

import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { OrderFeedbackView } from "@/features/orders/order-feedback-view";
import { OrderFeedbackPageSkeleton } from "@/skeletons/(dashboard)/orders/[id]/feedback/page-skeleton";
import { DEFAULT_CONSUMER_ORDERS } from "@/features/orders/data";

export const metadata: Metadata = PAGE_METADATA.orderFeedbackDefault;

export function generateStaticParams() {
  return DEFAULT_CONSUMER_ORDERS.map((order) => ({
    id: order.id,
  }));
}

export default async function OrderFeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<OrderFeedbackPageSkeleton />}>
      <OrderFeedbackView orderId={decodeURIComponent(id)} />
    </Suspense>
  );
}

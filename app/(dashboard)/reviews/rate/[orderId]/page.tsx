import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import {
  DEFAULT_CONSUMER_ORDERS,
  DEFAULT_PROFESSIONAL_ORDERS,
} from "@/features/orders/data";
import {
  DEFAULT_PENDING_REVIEW_ORDERS,
  getDefaultPendingOrderById,
} from "@/features/reviews/data";
import { RateConsumerView } from "@/features/reviews/rate-consumer-view";
import { RateConsumerPageSkeleton } from "@/skeletons/(dashboard)/reviews/rate/[orderId]/page-skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderId: string }>;
}): Promise<Metadata> {
  const { orderId } = await params;
  const decodedOrderId = decodeURIComponent(orderId);
  const pending = getDefaultPendingOrderById(decodedOrderId);

  return PAGE_METADATA_GENERATORS.rateConsumer(
    pending?.recipientName,
    pending?.orderCode ?? decodedOrderId
  );
}

export function generateStaticParams() {
  const uniqueOrderIds = new Set<string>([
    ...DEFAULT_PENDING_REVIEW_ORDERS.map((item) => item.orderId),
    ...DEFAULT_CONSUMER_ORDERS.map((item) => item.id),
    ...DEFAULT_PROFESSIONAL_ORDERS.map((item) => item.id),
  ]);

  return Array.from(uniqueOrderIds).map((orderId) => ({
    orderId,
  }));
}

export default async function RateConsumerPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <Suspense fallback={<RateConsumerPageSkeleton />}>
      <RateConsumerView orderId={decodeURIComponent(orderId)} />
    </Suspense>
  );
}

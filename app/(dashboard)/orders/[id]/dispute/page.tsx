import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { OrderDisputeView } from "@/features/orders/order-dispute-view";
import { OrderDisputePageSkeleton } from "@/skeletons/(dashboard)/orders/[id]/dispute/page-skeleton";
import {
  DEFAULT_CONSUMER_ORDERS,
  DEFAULT_PROFESSIONAL_ORDERS,
} from "@/features/orders/data";

export const metadata: Metadata = PAGE_METADATA.orderDisputeDefault;

export function generateStaticParams() {
  return [...DEFAULT_CONSUMER_ORDERS, ...DEFAULT_PROFESSIONAL_ORDERS].map(
    (order) => ({
      id: order.id,
    })
  );
}

export default async function OrderDisputePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<OrderDisputePageSkeleton />}>
      <OrderDisputeView orderId={decodeURIComponent(id)} />
    </Suspense>
  );
}

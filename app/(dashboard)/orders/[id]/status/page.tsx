import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { OrderDetailView } from "@/features/orders/order-detail-view";
import { OrderStatusPageSkeleton } from "@/skeletons/(dashboard)/orders/[id]/status/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.orderStatusDefault;

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<OrderStatusPageSkeleton />}>
      <OrderDetailView orderId={decodeURIComponent(id)} initialMode="status" />
    </Suspense>
  );
}

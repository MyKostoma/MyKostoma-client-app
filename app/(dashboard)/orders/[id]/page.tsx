import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { OrderDetailView } from "@/features/orders/order-detail-view";
import { OrderDetailPageSkeleton } from "@/skeletons/(dashboard)/orders/[id]/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.orderDetailDefault;

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<OrderDetailPageSkeleton />}>
      <OrderDetailView orderId={decodeURIComponent(id)} initialMode="overview" />
    </Suspense>
  );
}

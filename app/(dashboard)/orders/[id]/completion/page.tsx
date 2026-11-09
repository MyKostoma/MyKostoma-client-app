import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { OrderDetailView } from "@/features/orders/order-detail-view";
import { OrderCompletionPageSkeleton } from "@/skeletons/(dashboard)/orders/[id]/completion/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.orderCompletionDefault;

export default async function OrderCompletionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<OrderCompletionPageSkeleton />}>
      <OrderDetailView
        orderId={decodeURIComponent(id)}
        initialMode="completion"
      />
    </Suspense>
  );
}

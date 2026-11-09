import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { OrdersListView } from "@/features/orders/orders-list-view";
import { OrdersPageSkeleton } from "@/skeletons/(dashboard)/orders/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.ordersList;

export default function OrdersPage() {
  return (
    <Suspense fallback={<OrdersPageSkeleton />}>
      <OrdersListView />
    </Suspense>
  );
}

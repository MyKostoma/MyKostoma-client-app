import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { OrdersListView } from "@/features/orders/orders-list-view";

export const metadata: Metadata = PAGE_METADATA.ordersList;

export default function OrdersPage() {
  return <OrdersListView />;
}

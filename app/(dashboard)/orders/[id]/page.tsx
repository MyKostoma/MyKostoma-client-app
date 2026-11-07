import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { OrderDetailView } from "@/features/orders/order-detail-view";
import { DEFAULT_CONSUMER_ORDERS } from "@/features/orders/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const matched = DEFAULT_CONSUMER_ORDERS.find(
    (o) => o.id === decodedId || o.code === decodedId
  );

  return PAGE_METADATA_GENERATORS.orderDetail(
    matched?.title,
    matched?.code ?? decodedId,
    matched?.providerName
  );
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <OrderDetailView orderId={decodeURIComponent(id)} initialMode="overview" />
  );
}

import { OrderDetailView } from "@/features/orders/order-detail-view";

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <OrderDetailView orderId={decodeURIComponent(id)} initialMode="status" />;
}


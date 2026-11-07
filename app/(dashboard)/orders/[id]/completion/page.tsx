import { OrderDetailView } from "@/features/orders/order-detail-view";

export default async function OrderCompletionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <OrderDetailView
      orderId={decodeURIComponent(id)}
      initialMode="completion"
    />
  );
}


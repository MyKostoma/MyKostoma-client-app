import { OrderFeedbackView } from "@/features/orders/order-feedback-view";

export default async function OrderFeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <OrderFeedbackView orderId={decodeURIComponent(id)} />;
}


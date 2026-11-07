import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { OrderFeedbackView } from "@/features/orders/order-feedback-view";

export const metadata: Metadata = PAGE_METADATA.orderFeedbackDefault;

export default async function OrderFeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <OrderFeedbackView orderId={decodeURIComponent(id)} />;
}

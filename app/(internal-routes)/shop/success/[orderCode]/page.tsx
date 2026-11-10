import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { ShopOrderSuccessView } from "@/features/shop/shop-order-success-view";
import { ShopOrderSuccessPageSkeleton } from "@/skeletons/(internal-routes)/shop/success/[orderCode]/page-skeleton";

interface ShopOrderSuccessPageProps {
  params: Promise<{ orderCode: string }>;
}

export function generateStaticParams() {
  return [
    { orderCode: "ORD-98421" },
    { orderCode: "ORD-98422" },
    { orderCode: "ORD-DEMO" },
  ];
}

export const metadata: Metadata = {
  title: "Order Confirmed",
  description:
    "Your service booking order is confirmed. Track real-time progress and milestones.",
};

export default async function ShopOrderSuccessPage({
  params,
}: ShopOrderSuccessPageProps) {
  const { orderCode } = await params;

  return (
    <Suspense fallback={<ShopOrderSuccessPageSkeleton />}>
      <ShopOrderSuccessView orderCode={orderCode} />
    </Suspense>
  );
}


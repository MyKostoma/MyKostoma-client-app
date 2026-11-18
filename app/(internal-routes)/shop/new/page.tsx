import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { ProShopServiceFormView } from "@/features/shop/pro-shop-service-form-view";
import { ProShopServiceFormPageSkeleton } from "@/skeletons/(internal-routes)/shop/new/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.proShopCreateService;

export default function ProShopCreateServicePage() {
  return (
    <Suspense fallback={<ProShopServiceFormPageSkeleton />}>
      <ProShopServiceFormView />
    </Suspense>
  );
}

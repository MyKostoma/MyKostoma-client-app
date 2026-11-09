import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { ConsumerHomeView } from "@/features/consumer/home/consumer-home-view";
import { CustomerHomePageSkeleton } from "@/skeletons/(internal-routes)/home/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.consumerHome;

export default function CustomerHomePage() {
  return (
    <Suspense fallback={<CustomerHomePageSkeleton />}>
      <ConsumerHomeView />
    </Suspense>
  );
}

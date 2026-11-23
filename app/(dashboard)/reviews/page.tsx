import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { ReviewsDashboardView } from "@/features/reviews/reviews-dashboard-view";
import { ReviewsPageSkeleton } from "@/skeletons/(dashboard)/reviews/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.reviewsDashboard;

export default function ReviewsPage() {
  return (
    <Suspense fallback={<ReviewsPageSkeleton />}>
      <ReviewsDashboardView />
    </Suspense>
  );
}

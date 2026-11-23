import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { ReelsView } from "@/features/reels/reels-view";
import { ReelsPageSkeleton } from "@/skeletons/(dashboard)/reels/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.reelsHome;

export default function ReelsPage() {
  return (
    <Suspense fallback={<ReelsPageSkeleton />}>
      <ReelsView />
    </Suspense>
  );
}

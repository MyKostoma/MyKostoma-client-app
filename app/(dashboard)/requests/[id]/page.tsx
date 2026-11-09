import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { RequestDetailView } from "@/features/requests/request-detail-view";
import { RequestDetailPageSkeleton } from "@/skeletons/(dashboard)/requests/[id]/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.requestDetailDefault;

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<RequestDetailPageSkeleton />}>
      <RequestDetailView requestId={decodeURIComponent(id)} />
    </Suspense>
  );
}

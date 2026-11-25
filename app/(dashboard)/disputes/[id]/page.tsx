import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import {
  DEFAULT_DISPUTE_CASES,
  getDefaultDisputeById,
} from "@/features/disputes/data";
import { DisputeDetailView } from "@/features/disputes/dispute-detail-view";
import { DisputeDetailPageSkeleton } from "@/skeletons/(dashboard)/disputes/[id]/page-skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const dispute = getDefaultDisputeById(decodedId);

  return PAGE_METADATA_GENERATORS.disputeDetail(
    dispute?.code,
    dispute?.orderCode
  );
}

export function generateStaticParams() {
  return DEFAULT_DISPUTE_CASES.map((item) => ({
    id: item.id,
  }));
}

export default async function DisputeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<DisputeDetailPageSkeleton />}>
      <DisputeDetailView disputeId={decodeURIComponent(id)} />
    </Suspense>
  );
}

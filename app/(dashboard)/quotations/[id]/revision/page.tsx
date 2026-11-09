import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { RequestRevisionView } from "@/features/quotations/request-revision-view";
import { QuotationRevisionPageSkeleton } from "@/skeletons/(dashboard)/quotations/[id]/revision/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.quotationRevisionDefault;

export default async function QuotationRevisionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<QuotationRevisionPageSkeleton />}>
      <RequestRevisionView quotationId={decodeURIComponent(id)} />
    </Suspense>
  );
}

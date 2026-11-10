import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { RequestRevisionView } from "@/features/quotations/request-revision-view";
import { QuotationRevisionPageSkeleton } from "@/skeletons/(dashboard)/quotations/[id]/revision/page-skeleton";
import { DEFAULT_QUOTATIONS } from "@/features/quotations/data";

export const metadata: Metadata = PAGE_METADATA.quotationRevisionDefault;

export function generateStaticParams() {
  return DEFAULT_QUOTATIONS.map((q) => ({
    id: q.id,
  }));
}

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

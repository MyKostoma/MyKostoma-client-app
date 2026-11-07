import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { QuotationDetailView } from "@/features/quotations/quotation-detail-view";

export const metadata: Metadata = PAGE_METADATA.quotationDetailDefault;

export default async function QuotationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <QuotationDetailView quotationId={decodeURIComponent(id)} />;
}

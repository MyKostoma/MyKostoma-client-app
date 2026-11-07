import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { QuotationDetailView } from "@/features/quotations/quotation-detail-view";
import { DEFAULT_QUOTATIONS } from "@/features/quotations/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const matched = DEFAULT_QUOTATIONS.find(
    (q) => q.id === decodedId || q.code === decodedId
  );

  return PAGE_METADATA_GENERATORS.quotationDetail(
    matched?.providerName,
    matched?.code ?? decodedId,
    matched?.message
  );
}

export default async function QuotationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <QuotationDetailView quotationId={decodeURIComponent(id)} />;
}

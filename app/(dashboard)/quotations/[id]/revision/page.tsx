import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { RequestRevisionView } from "@/features/quotations/request-revision-view";

export const metadata: Metadata = PAGE_METADATA.quotationRevisionDefault;

export default async function QuotationRevisionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RequestRevisionView quotationId={decodeURIComponent(id)} />;
}

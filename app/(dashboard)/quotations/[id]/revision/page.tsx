import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { RequestRevisionView } from "@/features/quotations/request-revision-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  return PAGE_METADATA_GENERATORS.quotationRevision(decodedId);
}

export default async function QuotationRevisionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RequestRevisionView quotationId={decodeURIComponent(id)} />;
}

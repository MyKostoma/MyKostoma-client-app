import { RequestRevisionView } from "@/features/quotations/request-revision-view";

export default async function QuotationRevisionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RequestRevisionView quotationId={decodeURIComponent(id)} />;
}


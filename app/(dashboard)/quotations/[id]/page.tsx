import { QuotationDetailView } from "@/features/quotations";

export default async function QuotationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <QuotationDetailView quotationId={decodeURIComponent(id)} />;
}


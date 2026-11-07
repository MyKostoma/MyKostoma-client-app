import { RequestDetailView } from "@/features/requests/request-detail-view";

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RequestDetailView requestId={decodeURIComponent(id)} />;
}

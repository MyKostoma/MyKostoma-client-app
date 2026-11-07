import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { RequestDetailView } from "@/features/requests/request-detail-view";

export const metadata: Metadata = PAGE_METADATA.requestDetailDefault;

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RequestDetailView requestId={decodeURIComponent(id)} />;
}

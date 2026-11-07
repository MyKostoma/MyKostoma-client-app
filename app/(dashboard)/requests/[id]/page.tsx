import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { RequestDetailView } from "@/features/requests/request-detail-view";
import { DEFAULT_CONSUMER_REQUESTS } from "@/features/requests/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const matched = DEFAULT_CONSUMER_REQUESTS.find(
    (r) => r.id === decodedId || r.code === decodedId
  );

  return PAGE_METADATA_GENERATORS.requestDetail(
    matched?.title,
    matched?.code ?? decodedId,
    matched?.description
  );
}

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RequestDetailView requestId={decodeURIComponent(id)} />;
}

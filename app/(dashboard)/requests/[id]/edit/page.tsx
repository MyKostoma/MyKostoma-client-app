import { EditRequestView } from "@/features/requests";

export default async function EditRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditRequestView requestId={decodeURIComponent(id)} />;
}

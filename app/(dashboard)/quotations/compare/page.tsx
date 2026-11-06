import { CompareQuotationsView } from "@/features/quotations";

export default async function CompareQuotationsPage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const selectedIds = ids
    ? ids
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    : undefined;

  return <CompareQuotationsView selectedIds={selectedIds} />;
}


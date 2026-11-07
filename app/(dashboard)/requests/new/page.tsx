import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { CreateRequestView } from "@/features/requests/create-request-view";

export const metadata: Metadata = PAGE_METADATA.requestCreate;

export default function CreateRequestPage() {
  return <CreateRequestView />;
}

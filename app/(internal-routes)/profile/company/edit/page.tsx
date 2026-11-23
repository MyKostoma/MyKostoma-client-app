import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { EditProfileView } from "@/features/profile/edit-profile-view";
import { EditCompanyProfilePageSkeleton } from "@/skeletons/(internal-routes)/profile/company/edit/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.companyProfileEdit;

export default function EditCompanyProfilePage() {
  return (
    <Suspense fallback={<EditCompanyProfilePageSkeleton />}>
      <EditProfileView mode="company" />
    </Suspense>
  );
}

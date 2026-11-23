import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { ProfileView } from "@/features/profile/profile-view";
import { CompanyProfilePageSkeleton } from "@/skeletons/(internal-routes)/profile/company/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.companyProfile;

export default function CompanyProfilePage() {
  return (
    <Suspense fallback={<CompanyProfilePageSkeleton />}>
      <ProfileView entityMode="company" />
    </Suspense>
  );
}

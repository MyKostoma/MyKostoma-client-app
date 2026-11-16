import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { ProfileView } from "@/features/profile/profile-view";
import { getProfessionalProfileById, MOCK_PROFESSIONAL_PROFILES } from "@/features/profile/data";
import { ProfileDetailPageSkeleton } from "@/skeletons/(internal-routes)/profile/[id]/page-skeleton";

export interface ProfileDynamicPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return Object.keys(MOCK_PROFESSIONAL_PROFILES).map((id) => ({
    id,
  }));
}

export const metadata: Metadata = {
  title: "Professional Profile",
  description:
    "View verified artisan credentials, ratings, portfolio items, and client reviews on MyKostoma.",
};

export default async function ProfileDynamicPage({
  params,
}: ProfileDynamicPageProps) {
  const { id } = await params;
  const profile = getProfessionalProfileById(id);

  if (!profile) {
    notFound();
  }

  return (
    <Suspense fallback={<ProfileDetailPageSkeleton />}>
      <ProfileView profile={profile} />
    </Suspense>
  );
}

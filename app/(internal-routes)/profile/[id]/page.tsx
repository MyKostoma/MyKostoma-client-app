import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { ProfileView } from "@/features/profile/profile-view";
import { getProfessionalProfileById } from "@/features/profile/data";
import { ProfileDetailPageSkeleton } from "@/skeletons/(internal-routes)/profile/[id]/page-skeleton";

export interface ProfileDynamicPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProfileDynamicPageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = getProfessionalProfileById(id);

  if (!profile) {
    return {
      title: "Profile Not Found",
    };
  }

  return PAGE_METADATA_GENERATORS.profileDetail(
    profile.name,
    profile.roleTitle,
    profile.bio
  );
}

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

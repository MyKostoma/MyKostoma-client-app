import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PAGE_METADATA } from "@/config/metadata";
import { ProfileView } from "@/features/profile/profile-view";
import { getProfessionalProfileById } from "@/features/profile/data";

export interface ProfileDynamicPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = PAGE_METADATA.profileFallback;

export default async function ProfileDynamicPage({
  params,
}: ProfileDynamicPageProps) {
  const { id } = await params;
  const profile = getProfessionalProfileById(id);

  if (!profile) {
    notFound();
  }

  return <ProfileView profile={profile} />;
}

import { notFound } from "next/navigation";
import { ProfileView } from "@/features/profile/profile-view";
import { getProfessionalProfileById } from "@/features/profile/data";

export interface ProfileDynamicPageProps {
  params: Promise<{ id: string }>;
}

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


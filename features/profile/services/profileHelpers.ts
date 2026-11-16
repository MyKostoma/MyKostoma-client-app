import type { ProfileServiceItem } from "@/components/profile/types";

export function buildServiceInquiryPrefill(
  professionalName: string,
  service: ProfileServiceItem
): string {
  const firstName = professionalName.split(" ")[0] || professionalName;
  return `Hi ${firstName}, I'm interested in your ${service.title} service.`;
}

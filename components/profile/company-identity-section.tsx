"use client";

import { CheckCircle2, Globe, MapPin, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/consumer-home/section-header";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/layouts/footers/icons";
import { cn } from "@/lib/utils";
import type { CompanyIdentitySectionProps } from "./types";

export function CompanyIdentitySection({
  profile,
  companyDetails,
  onSocialClick,
}: CompanyIdentitySectionProps) {
  const shortBrandName = profile.name.split(" ")[0]?.toUpperCase() || "COMPANY";

  const socialItems = [
    {
      id: "Instagram",
      url: companyDetails.socialLinks.instagram,
      icon: InstagramIcon,
    },
    {
      id: "LinkedIn",
      url: companyDetails.socialLinks.linkedin,
      icon: LinkedinIcon,
    },
    {
      id: "Facebook",
      url: companyDetails.socialLinks.facebook,
      icon: FacebookIcon,
    },
    {
      id: "Website",
      url: companyDetails.socialLinks.website,
      icon: Globe,
    },
  ].filter((item) => Boolean(item.url));

  return (
    <section
      aria-label="Company identity and overview"
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
    >
      {/* Left Main Column */}
      <div className="lg:col-span-8 space-y-6">
        {/* Business Overview Card */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs space-y-6">
          <SectionHeader title="Business Overview" />

          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>

            {profile.skills && profile.skills.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-secondary/80 border border-border/60 text-[11px] font-medium text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border/70 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                TEAM STRENGTH
              </span>
              <span className="block text-sm sm:text-base font-extrabold text-foreground">
                {companyDetails.teamStrength}
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                YEARS ACTIVE
              </span>
              <span className="block text-sm sm:text-base font-extrabold text-foreground">
                {companyDetails.yearsActive}
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                PROJECTS DONE
              </span>
              <span className="block text-sm sm:text-base font-extrabold text-foreground">
                {companyDetails.projectsCompleted}
              </span>
            </div>
          </div>
        </div>

        {/* Service Area Card */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionHeader title="Service Area" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {companyDetails.activeCoverageLabel}
            </span>
          </div>

          <div className="rounded-2xl border border-border bg-secondary/45 min-h-[210px] p-6 flex flex-col items-center justify-center gap-3 text-center">
            <div className="size-11 rounded-full bg-foreground text-background flex items-center justify-center shadow-sm">
              <MapPin className="size-5" />
            </div>

            <p className="text-xs font-extrabold uppercase tracking-wider text-foreground">
              {companyDetails.hqLabel}
            </p>

            {companyDetails.coverageZones.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 max-w-md">
                {companyDetails.coverageZones.map((zone) => (
                  <span
                    key={zone}
                    className="px-2.5 py-1 rounded-full bg-card border border-border text-[11px] font-medium text-muted-foreground"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar Info Column */}
      <div className="lg:col-span-4 space-y-6">
        {/* Trust & Verification Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
          <SectionHeader title="Trust & Verification" />

          <div className="rounded-xl border border-border bg-secondary/45 p-3.5 flex items-center gap-3">
            <div className="size-10 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                CAC REGISTERED
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {companyDetails.cacNumber}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-success">
                {companyDetails.cacStatusLabel}
              </p>
            </div>
          </div>

          <ul className="divide-y divide-border/60">
            {companyDetails.trustChecks.map((check) => (
              <li
                key={check.id}
                className="py-2.5 first:pt-1 last:pb-0 flex items-center justify-between gap-3 text-xs text-muted-foreground"
              >
                <span>{check.label}</span>
                <CheckCircle2
                  className={cn(
                    "size-4 shrink-0",
                    check.verified
                      ? "text-foreground"
                      : "text-muted-foreground/40"
                  )}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Operating Hours Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
          <SectionHeader title="Operating Hours" />

          <div className="space-y-2.5">
            {companyDetails.operatingHours.map((slot) => (
              <div
                key={slot.day}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <span className="text-muted-foreground">{slot.day}</span>
                <span
                  className={cn(
                    "font-semibold",
                    slot.isClosed
                      ? "text-muted-foreground"
                      : "text-foreground"
                  )}
                >
                  {slot.hours}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border/70 pt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span
              className={cn(
                "size-2 rounded-full shrink-0",
                companyDetails.isCurrentlyOpen
                  ? "bg-success"
                  : "bg-muted-foreground"
              )}
            />
            <span
              className={
                companyDetails.isCurrentlyOpen
                  ? "text-success"
                  : "text-muted-foreground"
              }
            >
              {companyDetails.isCurrentlyOpen
                ? "CURRENTLY OPEN"
                : "CURRENTLY CLOSED"}
            </span>
          </div>
        </div>

        {/* Social Connect Card */}
        {socialItems.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-3">
              {socialItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${profile.name} on ${item.id}`}
                    onClick={(e) => {
                      if (onSocialClick) {
                        e.preventDefault();
                        onSocialClick(item.id);
                      }
                    }}
                    className="size-8 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              CONNECT WITH {shortBrandName}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

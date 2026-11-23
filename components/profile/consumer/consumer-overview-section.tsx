"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  Plus,
  Settings,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/consumer-home/section-header";
import { cn } from "@/lib/utils";
import { formatConsumerContactPreference } from "@/features/profile/services/profileHelpers";
import type { ConsumerOverviewSectionProps } from "../types";

const STATUS_BADGE_CLASSES = {
  info: "bg-info-bg text-info",
  warning: "bg-warning-bg text-warning",
  success: "bg-success-bg text-success",
  muted: "bg-secondary text-muted-foreground",
};

export function ConsumerOverviewSection({
  profile,
  defaultAddress,
  recentActivity,
  onManageAddresses,
  onAddAddress,
  onEditProfile,
  onViewAllOrders,
  onViewAllRequests,
}: ConsumerOverviewSectionProps) {
  return (
    <section
      aria-label="Consumer account overview"
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
    >
      {/* Left Main Column */}
      <div className="lg:col-span-8 space-y-6">
        {/* Personal & Booking Overview Card */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionHeader title="Account Overview" />

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onEditProfile}
              leadingIcon={<Pencil className="size-3.5" />}
              className="h-8 px-3 rounded-lg text-xs font-semibold text-primary"
            >
              Edit Info
            </Button>
          </div>

          {profile.bio && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border/70 pt-5">
            <div className="space-y-1 min-w-0">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <Mail className="size-3 shrink-0" />
                <span>EMAIL ADDRESS</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {profile.email}
              </p>
            </div>

            <div className="space-y-1 min-w-0">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <Phone className="size-3 shrink-0" />
                <span>PHONE NUMBER</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {profile.phone}
              </p>
            </div>

            <div className="space-y-1 min-w-0">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <MessageSquare className="size-3 shrink-0" />
                <span>PREFERRED CONTACT</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {formatConsumerContactPreference(profile.preferredContact)}
              </p>
            </div>
          </div>

          {profile.serviceInterests.length > 0 && (
            <div className="border-t border-border/70 pt-5 space-y-2.5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                FREQUENT SERVICE INTERESTS
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.serviceInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-full bg-secondary/80 border border-border/60 text-xs font-medium text-foreground"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Orders & Requests */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionHeader title="Recent Orders & Requests" />

            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={onViewAllRequests}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                All Requests
              </button>
              <button
                type="button"
                onClick={onViewAllOrders}
                className="text-primary hover:text-primary-hover transition-colors cursor-pointer"
              >
                All Orders
              </button>
            </div>
          </div>

          {recentActivity.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-6 text-center space-y-1.5">
              <p className="text-xs font-semibold text-foreground">
                No recent bookings or requests
              </p>
              <p className="text-xs text-muted-foreground">
                Post a request or book a verified pro to see activity here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/70">
              {recentActivity.map((item) => (
                <Link
                  key={`${item.kind}-${item.id}`}
                  href={item.href}
                  className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-4 hover:opacity-85 transition-opacity group"
                >
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {item.kind === "order" ? "ORDER" : "REQUEST"}
                      </span>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          STATUS_BADGE_CLASSES[item.statusVariant]
                        )}
                      >
                        {item.statusLabel}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.subtitle}
                    </p>
                  </div>

                  <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-4 space-y-6">
        {/* Default Service Address Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between gap-2">
            <SectionHeader title="Default Address" />
            <button
              type="button"
              onClick={onManageAddresses}
              className="text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              Manage
            </button>
          </div>

          {defaultAddress ? (
            <div className="rounded-xl border border-border bg-secondary/35 p-4 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <MapPin className="size-3.5 text-primary shrink-0" />
                  <span>{defaultAddress.label}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-card border border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {defaultAddress.tag}
                </span>
              </div>

              <div className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                <p className="text-foreground font-medium">
                  {defaultAddress.streetAddress}
                </p>
                <p>{defaultAddress.area}</p>
                {defaultAddress.landmark && (
                  <p>Landmark: {defaultAddress.landmark}</p>
                )}
                {defaultAddress.accessNotes && (
                  <p className="pt-1 text-[11px] italic">
                    &ldquo;{defaultAddress.accessNotes}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-5 text-center space-y-3">
              <p className="text-xs text-muted-foreground">
                Save your home or office address for faster request posting.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onAddAddress}
                leadingIcon={<Plus className="size-3.5" />}
                className="h-8 px-4 rounded-lg text-xs font-semibold"
              >
                Add Address
              </Button>
            </div>
          )}
        </div>

        {/* Account Verification & Quick Links */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
          <SectionHeader title="Trust & Account Safety" />

          <div className="rounded-xl border border-border bg-secondary/35 p-3.5 flex items-center gap-3">
            <div className="size-9 rounded-lg bg-success-bg text-success flex items-center justify-center shrink-0">
              <ShieldCheck className="size-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground">
                Escrow Protected Buyer
              </p>
              <p className="text-[11px] text-muted-foreground">
                Payments stay secured until milestones are approved.
              </p>
            </div>
          </div>

          <ul className="divide-y divide-border/60 text-xs">
            <li className="py-2.5 flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Email Verification</span>
              <span className="inline-flex items-center gap-1 font-semibold text-success">
                <CheckCircle2 className="size-3.5" />
                <span>{profile.emailVerified ? "Verified" : "Pending"}</span>
              </span>
            </li>
            <li className="py-2.5 flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Phone Verification</span>
              <span className="inline-flex items-center gap-1 font-semibold text-success">
                <CheckCircle2 className="size-3.5" />
                <span>{profile.phoneVerified ? "Verified" : "Pending"}</span>
              </span>
            </li>
            <li className="py-2.5 flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Contact Privacy</span>
              <span className="inline-flex items-center gap-1 font-medium text-foreground">
                <Lock className="size-3" />
                <span>Protected</span>
              </span>
            </li>
          </ul>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link
              href="/wallet"
              className="h-9 px-3 rounded-lg border border-border bg-card hover:bg-secondary/50 text-xs font-semibold text-foreground inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <Wallet className="size-3.5 text-muted-foreground" />
              <span>Wallet</span>
            </Link>
            <Link
              href="/settings"
              className="h-9 px-3 rounded-lg border border-border bg-card hover:bg-secondary/50 text-xs font-semibold text-foreground inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <Settings className="size-3.5 text-muted-foreground" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

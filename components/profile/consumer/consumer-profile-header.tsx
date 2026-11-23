"use client";

import {
  Calendar,
  Camera,
  CheckCircle2,
  FileText,
  Heart,
  Lock,
  MapPin,
  Pencil,
  Plus,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import type { ConsumerProfileHeaderProps } from "../types";

export function ConsumerProfileHeader({
  profile,
  stats,
  onEditProfileClick,
  onEditPhotoClick,
  onPostRequestClick,
  onStatTabJump,
  onOpenWalletClick,
  onOpenOrdersClick,
  onOpenRequestsClick,
}: ConsumerProfileHeaderProps) {
  const isVerifiedCustomer = profile.emailVerified && profile.phoneVerified;

  const statTiles = [
    {
      id: "orders",
      label: "Active Orders",
      value: String(stats.activeOrdersCount),
      icon: ShoppingBag,
      toneClass: "bg-info-bg text-info",
      onClick: onOpenOrdersClick,
    },
    {
      id: "requests",
      label: "Open Requests",
      value: String(stats.openRequestsCount),
      icon: FileText,
      toneClass: "bg-warning-bg text-warning",
      onClick: onOpenRequestsClick,
    },
    {
      id: "wallet",
      label: "Wallet Balance",
      value: stats.walletBalanceFormatted,
      icon: Wallet,
      toneClass: "bg-success-bg text-success",
      onClick: onOpenWalletClick,
    },
    {
      id: "saved-pros",
      label: "Saved Pros",
      value: String(stats.savedProsCount),
      icon: Heart,
      toneClass: "bg-accent text-primary",
      onClick: () => onStatTabJump("saved-pros"),
    },
  ];

  return (
    <section
      aria-label={`${profile.fullName} consumer account header`}
      className="w-full rounded-t-2xl border-t border-r border-l border-border bg-card overflow-hidden shadow-2xs"
    >
      {/* Top Accent Strip */}
      <div
        aria-hidden="true"
        className="h-24 sm:h-32 w-full bg-linear-to-r from-primary via-primary-hover to-primary-active"
      />

      <div className="px-4 sm:px-8 pb-6 space-y-6">
        {/* Overlapping Avatar */}
        <div className="relative -mt-11 sm:-mt-13 inline-block">
          <div className="size-22 sm:size-26 rounded-2xl border-4 border-card bg-secondary shadow-md overflow-hidden">
            <FallbackImage
              src={profile.avatarUrl}
              alt={profile.fullName}
              fallbackType="user"
              variant="avatar"
              className="w-full h-full object-cover select-none"
            />
          </div>

          <button
            type="button"
            onClick={onEditPhotoClick}
            aria-label="Update profile photo"
            title="Update profile photo"
            className="absolute -bottom-1.5 -right-1.5 size-8 rounded-xl border-2 border-card bg-primary text-primary-foreground flex items-center justify-center shadow-sm hover:bg-primary-hover transition-colors cursor-pointer"
          >
            <Camera className="size-3.5" />
          </button>
        </div>

        {/* Identity + Actions */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 -mt-2">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                {profile.fullName}
              </h1>

              {isVerifiedCustomer && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-success-bg border border-success/25 text-success text-[10px] font-bold uppercase tracking-wider select-none">
                  <CheckCircle2 className="size-3 shrink-0" />
                  <span>Verified Customer</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                <span>{profile.location}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 font-medium">
                <Calendar className="size-3.5 shrink-0" />
                <span>{profile.memberSince}</span>
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Lock className="size-3.5 shrink-0" />
                <span>Contact shared only with booked pros</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onPostRequestClick}
              leadingIcon={<Plus className="size-3.5" />}
              className="h-10 px-4 rounded-xl text-xs font-semibold"
            >
              Post a Request
            </Button>

            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onEditProfileClick}
              leadingIcon={<Pencil className="size-3.5" />}
              className="h-10 px-5 rounded-xl text-xs font-semibold shadow-xs"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Consumer Activity Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
          {statTiles.map((stat) => {
            const Icon = stat.icon;
            return (
              <button
                key={stat.id}
                type="button"
                onClick={stat.onClick}
                className="rounded-xl border border-border bg-background/60 hover:bg-secondary/50 p-3.5 sm:p-4 text-left flex items-center gap-3 transition-colors cursor-pointer"
              >
                <div
                  className={`size-9 sm:size-10 rounded-xl flex items-center justify-center shrink-0 ${stat.toneClass}`}
                >
                  <Icon className="size-4 sm:size-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-muted-foreground truncate">
                    {stat.label}
                  </p>
                  <p className="text-sm sm:text-base font-extrabold text-foreground tracking-tight truncate mt-0.5">
                    {stat.value}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

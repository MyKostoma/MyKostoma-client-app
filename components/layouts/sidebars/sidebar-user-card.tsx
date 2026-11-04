"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  logout,
  selectCurrentUser,
} from "@/store/slices/authSlice";
import { clearAuthCookies } from "@/lib/cookies";
import { baseApi } from "@/store/api/baseApi";
import { RoleDisplayNames, type User, type UserRole } from "@/types/user";
import type { SidebarUserCardProps } from "./types";

function getDisplayName(user: User | null): string {
  if (!user) return "Guest User";
  if (user.fullName) return user.fullName;
  const combined = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
  if (combined) return combined;
  return user.email || "User";
}

function getUserInitials(user: User | null): string {
  if (!user) return "U";
  const first = user.firstName?.[0] ?? "";
  const last = user.lastName?.[0] ?? "";
  const initials = `${first}${last}`.toUpperCase();
  if (initials) return initials;
  return user.email?.[0]?.toUpperCase() || "U";
}

export function SidebarUserCard({
  user: userProp,
  isOpen = true,
  onLogout,
  className,
}: SidebarUserCardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeUser = useAppSelector(selectCurrentUser);
  const user = userProp !== undefined ? userProp : storeUser;

  const displayName = getDisplayName(user);
  const initials = getUserInitials(user);
  const role = (user?.role || "consumer") as UserRole;
  const roleLabel = RoleDisplayNames[role] || "Consumer";

  const handleSignOut = async () => {
    try {
      if (onLogout) {
        await onLogout();
      } else {
        router.push("/login");
      }
    } finally {
      dispatch(logout());
      clearAuthCookies();
      dispatch(baseApi.util.resetApiState());
    }
  };

  return (
    <div className={cn("p-3 mt-auto border-t border-border/70", className)}>
      <div
        className={cn(
          "rounded-xl bg-secondary/50 p-2.5 transition-all duration-200 border border-border/50",
          !isOpen && "p-2"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3",
            !isOpen && "justify-center"
          )}
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt={displayName}
                className="h-9 w-9 rounded-lg object-cover border border-border"
              />
            ) : (
              <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                {initials}
              </div>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
          </div>

          {/* User Details */}
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate leading-tight">
                {displayName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-accent text-accent-foreground">
                  {roleLabel}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        {isOpen && (
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-2.5 w-full flex items-center justify-center gap-2 py-1.5 px-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </div>
  );
}


"use client";

import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser, selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import { ProfessionalDashboardView } from "@/features/professional-dashboard/professional-dashboard-view";

export function ConsumerDashboardView() {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Consumer Dashboard
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome to your consumer portal, {user?.fullName || "Consumer"}. Here you can manage bookings, review requests, and track payments.
        </p>
      </div>
    </div>
  );
}

export function DashboardView() {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  return (
    <div className="space-y-6">
      {effectiveRole === "professional" ? (
        <ProfessionalDashboardView />
      ) : (
        <ConsumerDashboardView />
      )}
    </div>
  );
}


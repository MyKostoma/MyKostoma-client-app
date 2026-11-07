"use client";

import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser, selectUserRole } from "@/store/slices/authSlice";

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

export function ProfessionalDashboardView() {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Professional Workspace Dashboard
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome to your professional console, {user?.fullName || "Pro"}. Monitor your client requests, active jobs, and earnings.
        </p>
      </div>
    </div>
  );
}

export function DashboardView() {
  const userRole = useAppSelector(selectUserRole);

  return (
    <div className="space-y-6">
      {userRole === "professional" ? (
        <ProfessionalDashboardView />
      ) : (
        <ConsumerDashboardView />
      )}
    </div>
  );
}


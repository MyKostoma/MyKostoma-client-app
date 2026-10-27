"use client";

import * as React from "react";
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
      <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card/50">
        <p className="text-sm text-muted-foreground">
          Consumer Dashboard component placeholder — ready for Figma integration.
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
      <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card/50">
        <p className="text-sm text-muted-foreground">
          Professional Dashboard component placeholder — ready for Figma integration.
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const userRole = useAppSelector(selectUserRole);

  if (userRole === "professional") {
    return <ProfessionalDashboardView />;
  }

  return <ConsumerDashboardView />;
}

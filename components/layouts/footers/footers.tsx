"use client";

import * as React from "react";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated } from "@/store/slices/authSlice";
import { PublicFooter } from "./public-footer";
import { AppFooter } from "./app-footer";
import { DashboardFooter } from "./dashboard-footer";
import type { FooterProps } from "./types";

const FOOTER_VARIANTS: Record<string, React.ComponentType<any>> = {
  public: PublicFooter,
  "logged-out": PublicFooter,
  app: AppFooter,
  "logged-in": AppFooter,
  dashboard: DashboardFooter,
};

export function Footer({
  isLoggedIn,
  variant,
  className,
  ...props
}: FooterProps) {
  const storeIsAuthenticated = useAppSelector(selectIsAuthenticated);

  if (variant && FOOTER_VARIANTS[variant]) {
    const VariantComponent = FOOTER_VARIANTS[variant];
    return <VariantComponent className={className} {...props} />;
  }

  const effectiveLoggedIn =
    isLoggedIn ?? storeIsAuthenticated;

  if (effectiveLoggedIn) {
    return <AppFooter className={className} {...props} />;
  }

  return <PublicFooter className={className} {...props} />;
}

export const Footers = Footer;
export const LoggedOutFooter = PublicFooter;
export const LoggedInFooter = AppFooter;
export const dashboardFooter = DashboardFooter;

export * from "./types";
export * from "./public-footer";
export * from "./app-footer";
export * from "./dashboard-footer";
export * from "./icons";

export default Footer;

"use client";

import * as React from "react";
import { LandingNavbar } from "./landing-navbar";
import { AppHeader } from "./app-header";
import type { HeaderProps } from "./types";

const HEADER_VARIANTS: Record<string, React.ComponentType<any>> = {
  landing: LandingNavbar,
  app: AppHeader,
};

export function Header({ variant = "landing", ...props }: HeaderProps) {
  if (variant && HEADER_VARIANTS[variant]) {
    const VariantComponent = HEADER_VARIANTS[variant];
    return <VariantComponent {...props} />;
  }
  return <LandingNavbar {...props} />;
}

export const Headers = Header;
export const LandingHeader = LandingNavbar;

export * from "./types";
export * from "./landing-navbar";
export * from "./app-header";

export default Header;
"use client";

import { useAuthStatus } from "@/components/layouts/use-auth-status";
import { PublicFooter } from "./public-footer";
import { AppFooter } from "./app-footer";
import { DashboardFooter } from "./dashboard-footer";
import type { FooterProps, PublicFooter2Props } from "./types";

const PUBLIC_FOOTER_VARIANTS = new Set([
  "public",
  "public2",
  "publicFooter2",
  "logged-out",
]);

export function Footer({
  isLoggedIn,
  isAuthenticated,
  variant,
  className,
  tagline,
  columns,
  bottomLinks,
  copyrightText,
  copyrightYear,
  companyName,
  logoHref,
  logoSrc,
  logoDarkSrc,
  socials,
  location,
  version,
  links,
  onCloudClick,
  onSendClick,
  onUserClick,
  ...rest
}: FooterProps) {
  const { isAuthenticated: effectiveLoggedIn } = useAuthStatus(
    isLoggedIn ?? isAuthenticated
  );

  const publicFooterProps: PublicFooter2Props = {
    className,
    ...(tagline !== undefined ? { tagline } : {}),
    ...(columns !== undefined ? { columns } : {}),
    ...(bottomLinks !== undefined ? { bottomLinks } : {}),
    ...(copyrightText !== undefined ? { copyrightText } : {}),
    ...(copyrightYear !== undefined ? { copyrightYear } : {}),
    ...(companyName !== undefined ? { companyName } : {}),
    ...rest,
  };

  if (!effectiveLoggedIn || (variant && PUBLIC_FOOTER_VARIANTS.has(variant))) {
    return <PublicFooter {...publicFooterProps} />;
  }

  if (variant === "dashboard") {
    return (
      <DashboardFooter
        className={className}
        {...(copyrightText !== undefined ? { copyrightText } : {})}
        {...(links !== undefined ? { links } : {})}
        {...rest}
      />
    );
  }

  return (
    <AppFooter
      className={className}
      {...(tagline !== undefined ? { tagline } : {})}
      {...(logoHref !== undefined ? { logoHref } : {})}
      {...(logoSrc !== undefined ? { logoSrc } : {})}
      {...(logoDarkSrc !== undefined ? { logoDarkSrc } : {})}
      {...(columns !== undefined ? { columns } : {})}
      {...(socials !== undefined ? { socials } : {})}
      {...(copyrightYear !== undefined ? { copyrightYear } : {})}
      {...(location !== undefined ? { location } : {})}
      {...(version !== undefined ? { version } : {})}
      {...rest}
    />
  );
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

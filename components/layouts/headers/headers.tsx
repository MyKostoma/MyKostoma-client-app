"use client";

import { useAuthStatus } from "@/components/layouts/use-auth-status";
import { LandingNavbar } from "./landing-navbar";
import { AppHeader } from "./app-header";
import type { HeaderProps, LandingNavbarProps } from "./types";

const PUBLIC_HEADER_VARIANTS = new Set(["landing", "public", "logged-out"]);

export function Header({
  variant,
  isAuthenticated,
  isLoggedIn,
  logoHref,
  onLogin,
  onRegister,
  onLogout,
  userName,
  userRole,
  avatarUrl,
  notificationCount,
  hasUnreadMessages,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onNotificationsClick,
  onMessagesClick,
  onSettingsClick,
  onProfileClick,
  ...rest
}: HeaderProps) {
  const { isAuthenticated: effectiveLoggedIn } = useAuthStatus(
    isAuthenticated ?? isLoggedIn
  );

  const landingProps: LandingNavbarProps = {
    ...(logoHref !== undefined ? { logoHref } : {}),
    ...(onLogin !== undefined ? { onLogin } : {}),
    ...(onRegister !== undefined ? { onRegister } : {}),
    ...(onLogout !== undefined ? { onLogout } : {}),
    isAuthenticated: effectiveLoggedIn,
    ...rest,
  };

  if (!effectiveLoggedIn || (variant && PUBLIC_HEADER_VARIANTS.has(variant))) {
    return <LandingNavbar {...landingProps} />;
  }

  return (
    <AppHeader
      {...(logoHref !== undefined ? { logoHref } : {})}
      {...(userName !== undefined ? { userName } : {})}
      {...(userRole !== undefined ? { userRole } : {})}
      {...(avatarUrl !== undefined ? { avatarUrl } : {})}
      {...(notificationCount !== undefined ? { notificationCount } : {})}
      {...(hasUnreadMessages !== undefined ? { hasUnreadMessages } : {})}
      {...(searchPlaceholder !== undefined ? { searchPlaceholder } : {})}
      {...(searchValue !== undefined ? { searchValue } : {})}
      {...(onSearchChange !== undefined ? { onSearchChange } : {})}
      {...(onSearchSubmit !== undefined ? { onSearchSubmit } : {})}
      {...(onNotificationsClick !== undefined ? { onNotificationsClick } : {})}
      {...(onMessagesClick !== undefined ? { onMessagesClick } : {})}
      {...(onSettingsClick !== undefined ? { onSettingsClick } : {})}
      {...(onProfileClick !== undefined ? { onProfileClick } : {})}
      {...(onLogout !== undefined ? { onLogout } : {})}
      {...rest}
    />
  );
}

export const Headers = Header;
export const LandingHeader = LandingNavbar;

export * from "./types";
export * from "./landing-navbar";
export * from "./app-header";

export default Header;
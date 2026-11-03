"use client";

import Link from "next/link";
import {
  Search,
  MessageSquare,
  Bell,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NotificationModal from "@/components/modals/notification-modal";
import { useHeaders } from "@/components/layouts/hooks/useHeaders";
import type { AppHeaderProps } from "./types";

export function AppHeader({
  logoHref = "/home",
  userName,
  userRole,
  avatarUrl,
  notificationCount,
  hasUnreadMessages,
  searchPlaceholder = "Search services, professionals...",
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onNotificationsClick,
  onMessagesClick,
  onSettingsClick,
  onProfileClick,
  onLogout,
  className,
  ...props
}: AppHeaderProps) {
  const {
    isDark,
    toggleTheme,
    internalSearch,
    handleSearch,
    handleSearchSubmit,
    notifications,
    resolvedNotificationCount,
    resolvedHasUnreadMessages,
    notificationModalOpen,
    setNotificationModalOpen,
    handleBellClick,
    markAsRead,
    markAllAsRead,
    removeNotif,
    clearAllNotifs,
    restoreMock,
    resolvedUserName,
    resolvedUserRole,
    resolvedAvatarUrl,
    handleDashboardNavigate,
    handleProfileNavigate,
    handleMessagesNavigate,
    handleSettingsNavigate,
    handleLogout,
    mobileMenuOpen,
    setMobileMenuOpen,
    desktopDropdownOpen,
    setDesktopDropdownOpen,
    mobileUserDropdownOpen,
    setMobileUserDropdownOpen,
    desktopDropdownRef,
  } = useHeaders({
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
    onLogout,
  });

  return (
    <header
      className={cn(
        "w-full rounded-2xl border border-border bg-card px-4 py-3 shadow-2xs transition-colors relative",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 lg:gap-8 flex-1 min-w-0">
          <Link
            href={logoHref}
            className="inline-flex items-center shrink-0 transition-opacity hover:opacity-90"
            aria-label="MyKostoma Home"
          >
            <img
              src="/mykostoma_full_logo.png"
              alt="MyKostoma"
              className="h-7 sm:h-8 w-auto object-contain dark:hidden select-none"
            />
            <img
              src="/mykostoma_full_logo_white.png"
              alt="MyKostoma"
              className="h-7 sm:h-8 w-auto object-contain hidden dark:block select-none"
            />
          </Link>

          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="relative flex-1 max-w-md hidden md:flex items-center"
          >
            <button
              type="submit"
              aria-label="Search"
              className="absolute left-3.5 size-4 text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer flex items-center justify-center p-0 border-0 bg-transparent"
            >
              <Search className="size-4" />
            </button>
            <input
              type="search"
              value={searchValue !== undefined ? searchValue : internalSearch}
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              className={cn(
                "w-full h-10 pl-10 pr-4 text-sm rounded-lg bg-secondary text-foreground outline-none transition-all",
                "border border-transparent placeholder:text-muted-foreground/60",
                "hover:bg-secondary-hover focus:bg-card focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              )}
            />
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          <button
            type="button"
            onClick={handleMessagesNavigate}
            aria-label="Messages"
            className="hidden md:flex relative size-9 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <MessageSquare className="size-4.5" />
            {resolvedHasUnreadMessages && (
              <span
                className="absolute top-2 right-2 size-2 rounded-full bg-error ring-2 ring-card animate-pulse"
                aria-label="Unread messages"
              />
            )}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={handleBellClick}
              aria-label="Notifications"
              aria-expanded={notificationModalOpen}
              className="relative size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <Bell className="size-4.5" />
              {resolvedNotificationCount > 0 && (
                <span className="absolute -top-1 -right-0.5 size-4 rounded-full bg-error text-white font-bold text-[10px] leading-none flex items-center justify-center shadow-xs ring-2 ring-card">
                  {resolvedNotificationCount > 9
                    ? "9+"
                    : resolvedNotificationCount}
                </span>
              )}
            </button>

            <NotificationModal
              isOpen={notificationModalOpen}
              onClose={() => setNotificationModalOpen(false)}
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onRemoveNotification={removeNotif}
              onClearAll={clearAllNotifs}
              onRestoreMock={restoreMock}
            />
          </div>

          <button
            type="button"
            onClick={handleSettingsNavigate}
            aria-label="Settings"
            className="hidden md:flex size-9 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <Settings className="size-4.5" />
          </button>

          <div ref={desktopDropdownRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setDesktopDropdownOpen((prev) => !prev)}
              aria-expanded={desktopDropdownOpen}
              aria-haspopup="menu"
              className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-border/70 hover:opacity-90 transition-opacity cursor-pointer select-none bg-transparent"
            >
              <div className="flex flex-col text-right">
                <span className="text-xs sm:text-sm font-bold text-foreground tracking-tight leading-tight">
                  {resolvedUserName}
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase leading-tight mt-0.5">
                  {resolvedUserRole}
                </span>
              </div>

              <div className="relative">
                <img
                  src={resolvedAvatarUrl}
                  alt={resolvedUserName}
                  className="size-9 rounded-full object-cover ring-2 ring-primary/30 shadow-2xs"
                />
              </div>

              <ChevronDown
                className={cn(
                  "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
                  desktopDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {desktopDropdownOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2.5 w-52 rounded-xl border border-border bg-card p-1.5 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleDashboardNavigate}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <LayoutDashboard className="size-4 text-muted-foreground" />
                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleProfileNavigate}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <User className="size-4 text-muted-foreground" />
                  <span>Profile</span>
                </button>

                <div className="my-1 border-t border-border/60" />

                <button
                  type="button"
                  role="menuitem"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    {isDark ? (
                      <Sun className="size-4 text-warning" />
                    ) : (
                      <Moon className="size-4 text-muted-foreground" />
                    )}
                    <span>Switch Theme</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {isDark ? "Dark" : "Light"}
                  </span>
                </button>

                <div className="my-1 border-t border-border/60" />

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                >
                  <LogOut className="size-4 text-destructive" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden size-9 rounded-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-border/70 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="relative flex items-center"
          >
            <button
              type="submit"
              aria-label="Search"
              className="absolute left-3.5 size-4 text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer flex items-center justify-center p-0 border-0 bg-transparent"
            >
              <Search className="size-4" />
            </button>
            <input
              type="search"
              value={searchValue !== undefined ? searchValue : internalSearch}
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              className={cn(
                "w-full h-10 pl-10 pr-4 text-sm rounded-lg bg-secondary text-foreground outline-none transition-all",
                "border border-transparent placeholder:text-muted-foreground/60",
                "hover:bg-secondary-hover focus:bg-card focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              )}
            />
          </form>

          <div className="rounded-xl bg-secondary/40 border border-border/60 overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileUserDropdownOpen((prev) => !prev)}
              aria-expanded={mobileUserDropdownOpen}
              className="w-full flex items-center justify-between gap-3 p-3 text-left hover:bg-secondary/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={resolvedAvatarUrl}
                  alt={resolvedUserName}
                  className="size-10 rounded-full object-cover ring-2 ring-primary/30 shadow-2xs shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-foreground tracking-tight leading-tight truncate">
                    {resolvedUserName}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase leading-tight mt-0.5 truncate">
                    {resolvedUserRole}
                  </span>
                </div>
              </div>

              <ChevronDown
                className={cn(
                  "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
                  mobileUserDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {mobileUserDropdownOpen && (
              <div className="px-2 pb-2 pt-1 border-t border-border/60 space-y-1 bg-card/50">
                <button
                  type="button"
                  onClick={handleDashboardNavigate}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <LayoutDashboard className="size-4 text-muted-foreground" />
                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={handleProfileNavigate}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <User className="size-4 text-muted-foreground" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    {isDark ? (
                      <Sun className="size-4 text-warning" />
                    ) : (
                      <Moon className="size-4 text-muted-foreground" />
                    )}
                    <span>Switch Theme</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {isDark ? "Dark" : "Light"}
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={handleMessagesNavigate}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <MessageSquare className="size-4.5 text-muted-foreground" />
                <span>Message</span>
              </span>
              {resolvedHasUnreadMessages && (
                <span className="size-2 rounded-full bg-error" />
              )}
            </button>

            <button
              type="button"
              onClick={handleSettingsNavigate}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <Settings className="size-4.5 text-muted-foreground" />
              <span>Settings</span>
            </button>

            <div className="my-1 border-t border-border/60" />

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
            >
              <LogOut className="size-4.5 text-destructive" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default AppHeader;

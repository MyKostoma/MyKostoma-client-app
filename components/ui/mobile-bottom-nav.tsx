"use client";

import * as React from "react";
import {
  Home,
  Search,
  FileText,
  MessageSquare,
  ListOrdered,
  Store,
  Video,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. CONSUMER MOBILE NAVIGATION
// ============================================================================

export interface ConsumerMobileNavProps {
  activeTab?: "home" | "search" | "requests" | "messages" | "profile";
  onTabChange?: (tab: "home" | "search" | "requests" | "messages" | "profile") => void;
  hasUnreadMessages?: boolean;
  avatarUrl?: string;
  className?: string;
}

export function ConsumerMobileNav({
  activeTab = "home",
  onTabChange,
  hasUnreadMessages = true,
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  className,
}: ConsumerMobileNavProps) {
  const [currentTab, setCurrentTab] = React.useState(activeTab);

  React.useEffect(() => {
    if (activeTab !== undefined) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  const handleSelect = (
    tab: "home" | "search" | "requests" | "messages" | "profile"
  ) => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  return (
      <nav
        aria-label="Consumer mobile navigation"
        className={cn(
          "inline-flex items-center justify-between gap-5 sm:gap-7 rounded-3xl bg-card border border-border/80 px-5 py-2.5 shadow-lg select-none transition-colors",
          className
        )}
      >
        {/* Home */}
        <button
          type="button"
          onClick={() => handleSelect("home")}
          className="flex flex-col items-center gap-1 cursor-pointer outline-none group"
        >
          <Home
            className={cn(
              "size-5 transition-transform group-hover:scale-110",
              currentTab === "home"
                ? "text-primary fill-primary/15"
                : "text-muted-foreground"
            )}
          />
          <span
            className={cn(
              "text-[10px] leading-none transition-colors",
              currentTab === "home"
                ? "text-primary font-bold"
                : "text-muted-foreground font-medium"
            )}
          >
            Home
          </span>
        </button>

        {/* Search */}
        <button
          type="button"
          onClick={() => handleSelect("search")}
          className="flex flex-col items-center gap-1 cursor-pointer outline-none group"
        >
          <Search
            className={cn(
              "size-5 transition-transform group-hover:scale-110",
              currentTab === "search"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          />
          <span
            className={cn(
              "text-[10px] leading-none transition-colors",
              currentTab === "search"
                ? "text-primary font-bold"
                : "text-muted-foreground font-medium"
            )}
          >
            Search
          </span>
        </button>

        {/* Requests */}
        <button
          type="button"
          onClick={() => handleSelect("requests")}
          className="flex flex-col items-center gap-1 cursor-pointer outline-none group"
        >
          <div className="relative">
            <FileText
              className={cn(
                "size-5 transition-transform group-hover:scale-110",
                currentTab === "requests"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
            <span className="absolute -bottom-0.5 -right-0.5 text-[8px] font-black leading-none text-muted-foreground">
              +
            </span>
          </div>
          <span
            className={cn(
              "text-[10px] leading-none transition-colors",
              currentTab === "requests"
                ? "text-primary font-bold"
                : "text-muted-foreground font-medium"
            )}
          >
            Requests
          </span>
        </button>

        {/* Messages with notification dot */}
        <button
          type="button"
          onClick={() => handleSelect("messages")}
          className="flex flex-col items-center gap-1 cursor-pointer outline-none group"
        >
          <div className="relative">
            <MessageSquare
              className={cn(
                "size-5 transition-transform group-hover:scale-110",
                currentTab === "messages"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
            {hasUnreadMessages && (
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-error ring-1 ring-card" />
            )}
          </div>
          <span
            className={cn(
              "text-[10px] leading-none transition-colors",
              currentTab === "messages"
                ? "text-primary font-bold"
                : "text-muted-foreground font-medium"
            )}
          >
            Messages
          </span>
        </button>

        {/* Profile Avatar */}
        <button
          type="button"
          onClick={() => handleSelect("profile")}
          className="flex flex-col items-center gap-1 cursor-pointer outline-none group"
        >
          <img
            src={avatarUrl}
            alt="User profile"
            className={cn(
              "size-5.5 rounded-full object-cover transition-transform group-hover:scale-110",
              currentTab === "profile"
                ? "ring-2 ring-primary"
                : "ring-1 ring-border"
            )}
          />
          <span
            className={cn(
              "text-[10px] leading-none transition-colors",
              currentTab === "profile"
                ? "text-primary font-bold"
                : "text-muted-foreground font-medium"
            )}
          >
            Profile
          </span>
        </button>
      </nav>
  );
}

// ============================================================================
// 2. PROFESSIONAL MOBILE NAVIGATION
// ============================================================================

export interface ProfessionalMobileNavProps {
  activeTab?: "requests" | "shop" | "reels" | "messages" | "settings";
  onTabChange?: (tab: "requests" | "shop" | "reels" | "messages" | "settings") => void;
  onCenterActionClick?: () => void;
  className?: string;
}

export function ProfessionalMobileNav({
  activeTab = "requests",
  onTabChange,
  onCenterActionClick,
  className,
}: ProfessionalMobileNavProps) {
  const [currentTab, setCurrentTab] = React.useState(activeTab);

  React.useEffect(() => {
    if (activeTab !== undefined) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  const handleSelect = (
    tab: "requests" | "shop" | "reels" | "messages" | "settings"
  ) => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  return (
      <nav
        aria-label="Professional mobile navigation"
        className={cn(
          "inline-flex items-center justify-between gap-6 sm:gap-7 rounded-3xl bg-[#0D0E10] border border-zinc-800 px-6 py-2.5 shadow-xl select-none relative",
          className
        )}
      >
        {/* Requests */}
        <button
          type="button"
          onClick={() => handleSelect("requests")}
          className="flex flex-col items-center gap-1 cursor-pointer outline-none group"
        >
          <ListOrdered
            className={cn(
              "size-5 transition-transform group-hover:scale-110",
              currentTab === "requests" ? "text-[#E86040]" : "text-zinc-400"
            )}
          />
          <span
            className={cn(
              "text-[10px] leading-none transition-colors",
              currentTab === "requests"
                ? "text-[#E86040] font-bold"
                : "text-zinc-400 font-medium"
            )}
          >
            Requests
          </span>
        </button>

        {/* My Shop */}
        <button
          type="button"
          onClick={() => handleSelect("shop")}
          className="flex flex-col items-center gap-1 cursor-pointer outline-none group"
        >
          <Store
            className={cn(
              "size-5 transition-transform group-hover:scale-110",
              currentTab === "shop" ? "text-[#E86040]" : "text-zinc-400"
            )}
          />
          <span
            className={cn(
              "text-[10px] leading-none transition-colors",
              currentTab === "shop"
                ? "text-[#E86040] font-bold"
                : "text-zinc-400 font-medium"
            )}
          >
            My Shop
          </span>
        </button>

        {/* Center Prominent Action Button (Reels/Camera) */}
        <div className="relative -mt-4 flex flex-col items-center">
          <button
            type="button"
            onClick={() => {
              handleSelect("reels");
              onCenterActionClick?.();
            }}
            aria-label="Start recording or live"
            className="size-11 rounded-full bg-[#E86040] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer outline-none ring-4 ring-[#0D0E10]"
          >
            <Video className="size-5 fill-white" />
          </button>
        </div>

        {/* Messages */}
        <button
          type="button"
          onClick={() => handleSelect("messages")}
          className="flex flex-col items-center gap-1 cursor-pointer outline-none group"
        >
          <MessageSquare
            className={cn(
              "size-5 transition-transform group-hover:scale-110",
              currentTab === "messages" ? "text-[#E86040]" : "text-zinc-400"
            )}
          />
          <span
            className={cn(
              "text-[10px] leading-none transition-colors",
              currentTab === "messages"
                ? "text-[#E86040] font-bold"
                : "text-zinc-400 font-medium"
            )}
          >
            Messages
          </span>
        </button>

        {/* Settings */}
        <button
          type="button"
          onClick={() => handleSelect("settings")}
          className="flex flex-col items-center gap-1 cursor-pointer outline-none group"
        >
          <Settings
            className={cn(
              "size-5 transition-transform group-hover:scale-110",
              currentTab === "settings" ? "text-[#E86040]" : "text-zinc-400"
            )}
          />
          <span
            className={cn(
              "text-[10px] leading-none transition-colors",
              currentTab === "settings"
                ? "text-[#E86040] font-bold"
                : "text-zinc-400 font-medium"
            )}
          >
            Settings
          </span>
        </button>
      </nav>
  );
}

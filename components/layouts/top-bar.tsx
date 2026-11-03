"use client";

import { Plus, Search, Menu } from "lucide-react";
import { cn } from "@/features/flight-disruptions/lib/utils";
import { NotificationBell } from "./notification-bell";

interface TopbarProps {
    title: string;
    subtitle?: string;
    onMenuClick?: () => void;
    onSearchClick?: () => void;
    onAddClick?: () => void;
    canAddComplaint: boolean
}

/**
 * Dashboard topbar with search, notifications, and actions
 */
export function Topbar({
    title,
    subtitle,
    onMenuClick,
    onSearchClick,
    onAddClick,
    canAddComplaint
}: TopbarProps) {
    return (
        <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 md:px-6">
            {/* Left side */}
            <div className="flex items-center gap-4">
                {/* Mobile menu button */}
                <button
                    onClick={onMenuClick}
                    aria-label="Open menu"
                    className="p-2 rounded-lg hover:bg-neutral-100 transition-colors lg:hidden"
                >
                    <Menu className="h-5 w-5 text-neutral-600" />
                </button>

                <div>
                    <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>
                    {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 md:gap-3">
                {/* Search trigger - desktop only */}
                <button
                    onClick={onSearchClick}
                    className="hidden lg:flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm text-neutral-500 hover:bg-neutral-50 transition-colors"
                >
                    <Search className="h-4 w-4" />
                    <span>Search…</span>
                    <kbd className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-medium">
                        ⌘K
                    </kbd>
                </button>

                {/* Mobile search */}
                <button
                    onClick={onSearchClick}
                    aria-label="Search"
                    className="p-2 rounded-lg hover:bg-neutral-100 transition-colors lg:hidden"
                >
                    <Search className="h-5 w-5 text-neutral-600" />
                </button>

                {/* Notifications */}
                <NotificationBell />

                {/* Add complaint button */}
                {
                    canAddComplaint && <button
                        onClick={onAddClick}
                        className={cn(
                            "flex items-center gap-2 rounded-xl px-3 md:px-4 py-2",
                            "bg-ncaa-blue text-white text-sm font-medium",
                            "hover:bg-ncaa-blue-dark transition-colors",
                        )}
                    >
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Add Complaint</span>
                    </button>
                }
            </div>
        </header>
    );
}

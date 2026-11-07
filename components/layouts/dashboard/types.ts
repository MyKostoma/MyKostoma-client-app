import type { ReactNode } from "react"
import type { SidebarVariant } from "../sidebars/types"
import type { BreadcrumbItemConfig, TopBarVariant } from "../top-bars/types"
import type { UserRole } from "@/types/user"

export interface DashboardLayoutProps {
  children: ReactNode
  role?: UserRole
  sidebarVariant?: SidebarVariant
  topBarVariant?: TopBarVariant
  title?: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItemConfig[]
  actions?: ReactNode
  showSidebar?: boolean
  showTopBar?: boolean
  searchPlaceholder?: string
  onSearchClick?: () => void
  className?: string
  contentClassName?: string
}

export interface DashboardLayoutContentProps extends DashboardLayoutProps {
  mobileOpen: boolean
  onCloseMobile: () => void
  onMenuClick: () => void
}

export interface DashboardRoutesShellProps {
  children: ReactNode
}


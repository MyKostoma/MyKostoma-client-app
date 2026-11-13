export type ActiveRequestStatus = "new-request" | "in-discussion" | "quoted";

export type PendingQuotationStatus = "waiting" | "draft" | "sent";

export type EarningsTransactionType = "credit" | "withdrawal";

export interface ProfessionalQuickStat {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  variant: "info" | "warning" | "primary";
  iconName: "shop" | "orders" | "reviews";
}

export interface ProfessionalActiveRequest {
  id: string;
  clientName: string;
  clientAvatarUrl?: string;
  projectTitle: string;
  status: ActiveRequestStatus;
  timeAgo: string;
  href: string;
}

export interface EarningsChartPoint {
  day: string;
  amount: number;
}

export interface EarningsTransactionItem {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: EarningsTransactionType;
}

export interface ProfessionalPendingQuotation {
  id: string;
  clientName: string;
  clientAvatarUrl?: string;
  service: string;
  estimate: string;
  status: PendingQuotationStatus;
  actionLabel: string;
  href: string;
}

export interface ProfessionalDashboardData {
  firstName: string;
  fullName: string;
  avatarUrl?: string;
  verificationLabel: string;
  isVerified: boolean;
  newRequestsCount: number;
  pendingQuotationsCount: number;
  currentBalance: number;
  quickStats: ProfessionalQuickStat[];
  activeRequests: ProfessionalActiveRequest[];
  weeklyEarnings: EarningsChartPoint[];
  recentTransactions: EarningsTransactionItem[];
  pendingQuotations: ProfessionalPendingQuotation[];
}

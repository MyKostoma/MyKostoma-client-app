import type {
  EarningsChartPoint,
  EarningsTransactionItem,
  ProfessionalActiveRequest,
  ProfessionalPendingQuotation,
  ProfessionalQuickStat,
} from "@/features/professional-dashboard/types";

export interface ProfessionalWelcomeBannerProps {
  firstName: string;
  fullName: string;
  avatarUrl?: string;
  isVerified: boolean;
  verificationLabel: string;
  newRequestsCount: number;
  pendingQuotationsCount: number;
  onNewProduct: () => void;
  onCreateQuote: () => void;
}

export interface ProfessionalQuickStatsProps {
  stats: ProfessionalQuickStat[];
}

export interface ActiveRequestsCardProps {
  requests: ProfessionalActiveRequest[];
}

export interface EarningsSummaryCardProps {
  currentBalance: number;
  weeklyEarnings: EarningsChartPoint[];
  transactions: EarningsTransactionItem[];
  onWithdrawFunds: () => void;
}

export interface PendingQuotationsTableProps {
  quotations: ProfessionalPendingQuotation[];
}

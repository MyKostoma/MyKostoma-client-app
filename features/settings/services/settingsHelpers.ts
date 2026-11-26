import type {
  DisputeRecord,
  DisputeStatus,
  PasswordStrengthReport,
  SettingsStepStatus,
} from "@/components/settings/types";

export function formatNairaCurrency(amount: number): string {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function evaluatePasswordStrength(
  password: string
): PasswordStrengthReport {
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

  if (!password) {
    return {
      score: 0,
      level: "empty",
      label: "Weak",
      hasMinLength: false,
      hasNumber: false,
      hasSpecial: false,
    };
  }

  let rawScore = 0;
  if (hasMinLength) rawScore += 1;
  if (hasNumber) rawScore += 1;
  if (hasSpecial) rawScore += 1;
  if (hasMixedCase || password.length >= 12) rawScore += 1;

  const clampedScore = Math.min(4, Math.max(1, rawScore)) as 1 | 2 | 3 | 4;

  const levelMap: Record<
    1 | 2 | 3 | 4,
    { level: PasswordStrengthReport["level"]; label: string }
  > = {
    1: { level: "weak", label: "Weak" },
    2: { level: "fair", label: "Fair" },
    3: { level: "good", label: "Good" },
    4: { level: "strong", label: "Strong" },
  };

  return {
    score: clampedScore,
    level: levelMap[clampedScore].level,
    label: levelMap[clampedScore].label,
    hasMinLength,
    hasNumber,
    hasSpecial,
  };
}

export function computeVerificationCompletion(
  identityVerified: boolean,
  businessStatus: SettingsStepStatus,
  credentialsStatus: SettingsStepStatus
): {
  completedCount: number;
  totalCount: number;
  percent: number;
  statusHeadline: string;
} {
  const totalCount = 3;
  let completedCount = 0;
  if (identityVerified) completedCount += 1;
  if (businessStatus === "verified") completedCount += 1;
  if (credentialsStatus === "verified") completedCount += 1;

  let partialScore = completedCount / totalCount;
  if (businessStatus === "pending") partialScore += 0.15;
  if (credentialsStatus === "pending") partialScore += 0.15;

  const percent =
    completedCount === totalCount
      ? 100
      : Math.min(95, Math.max(15, Math.round(partialScore * 100)));

  const statusHeadline =
    completedCount === totalCount
      ? "Fully Verified"
      : completedCount === 0 &&
          businessStatus !== "pending" &&
          credentialsStatus !== "pending"
        ? "Not Started"
        : "Partially Verified";

  return {
    completedCount,
    totalCount,
    percent,
    statusHeadline,
  };
}

export function filterSettingsDisputes(
  disputes: DisputeRecord[],
  query: string,
  status: "all" | DisputeStatus,
  dateRange: "all" | "30d" | "90d"
): DisputeRecord[] {
  const q = query.trim().toLowerCase();
  const referenceDate = new Date("2026-01-20T00:00:00Z");

  return disputes.filter((item) => {
    if (status !== "all" && item.status !== status) return false;

    if (dateRange !== "all") {
      const days = dateRange === "30d" ? 30 : 90;
      const itemDate = new Date(`${item.createdAtISO}T00:00:00Z`);
      const diffDays =
        (referenceDate.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays > days) return false;
    }

    if (q) {
      const haystack = [
        item.code,
        item.transactionTitle,
        item.transactionRef,
        item.reason,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function buildTransactionsCsv(
  rows: { date: string; description: string; amount: string; status: string }[]
): string {
  const escapeCell = (val: string) => `"${val.replace(/"/g, '""')}"`;
  const header = ["Date", "Description", "Amount", "Status"].join(",");
  const lines = rows.map((row) =>
    [
      escapeCell(row.date),
      escapeCell(row.description),
      escapeCell(row.amount),
      escapeCell(row.status),
    ].join(",")
  );
  return [header, ...lines].join("\n");
}

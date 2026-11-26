import type {
  DisputeRecord,
  NotificationPreferencesState,
  SettingsBusinessInfo,
  SettingsCredentialsInfo,
} from "@/components/settings/types";

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferencesState = {
  channels: {
    accountUpdates: { email: true, push: true, sms: false },
    newMessages: { email: true, push: true, sms: true },
    transactionAlerts: { email: true, push: true, sms: false },
    marketingPromotions: { email: false, push: false, sms: false },
  },
  quietHours: {
    enabled: true,
    from: "10:00 PM",
    to: "08:00 AM",
  },
};

export const QUIET_HOURS_TIME_OPTIONS = [
  { value: "06:00 AM", label: "06:00 AM" },
  { value: "07:00 AM", label: "07:00 AM" },
  { value: "08:00 AM", label: "08:00 AM" },
  { value: "09:00 AM", label: "09:00 AM" },
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "06:00 PM", label: "06:00 PM" },
  { value: "08:00 PM", label: "08:00 PM" },
  { value: "09:00 PM", label: "09:00 PM" },
  { value: "10:00 PM", label: "10:00 PM" },
  { value: "11:00 PM", label: "11:00 PM" },
] as const;

export const DEFAULT_SETTINGS_BUSINESS_INFO: SettingsBusinessInfo = {
  legalName: "UrbanVibe Design Studio Ltd.",
  taxId: "RC-1489023 / TIN-20491822",
  registeredAddress: "14 Adeola Odeku St, Victoria Island, Lagos",
  status: "pending",
};

export const DEFAULT_SETTINGS_CREDENTIALS_INFO: SettingsCredentialsInfo = {
  licenseName: "",
  issuingBody: "",
  licenseNumber: "",
  status: "action-required",
};

export const DEFAULT_SETTINGS_DISPUTES: DisputeRecord[] = [
  {
    id: "dis-88219",
    code: "#DIS-88219",
    transactionTitle: "Custom Tuxedo Tailoring",
    transactionRef: "TRX-4491-920",
    dateInitiatedLabel: "Jan 14, 2026",
    createdAtISO: "2026-01-14",
    status: "under-review",
    reason: "Quality or craftsmanship mismatch",
    description:
      "Lapel stitching tension and sleeve hem measurement differed from the signed consultation fitting sheet.",
    amountFormatted: "₦185,000.00",
    resolutionNotes:
      "An arbitrator has requested comparison photos from both parties within 48 hours.",
  },
  {
    id: "dis-77102",
    code: "#DIS-77102",
    transactionTitle: "Premium Silk Fabric Purchase",
    transactionRef: "TRX-2201-118",
    dateInitiatedLabel: "Jan 08, 2026",
    createdAtISO: "2026-01-08",
    status: "open",
    reason: "Delayed delivery past agreed milestone",
    description:
      "Material sourcing milestone exceeded the 7-day grace window without updated dispatch tracking.",
    amountFormatted: "₦95,000.00",
  },
  {
    id: "dis-44921",
    code: "#DIS-44921",
    transactionTitle: "Wedding Gown Alteration",
    transactionRef: "TRX-0012-441",
    dateInitiatedLabel: "Dec 12, 2025",
    createdAtISO: "2025-12-12",
    status: "resolved",
    reason: "Billing discrepancy on extra fittings",
    description:
      "Duplicate adjustment line item flagged during final milestone escrow release.",
    amountFormatted: "₦140,000.00",
    resolutionNotes:
      "Resolved cleanly: partial escrow refund of ₦25,000 credited to customer wallet.",
  },
];

export const DISPUTE_REASON_OPTIONS = [
  "Quality or craftsmanship mismatch",
  "Delayed delivery past agreed milestone",
  "Billing or escrow fee discrepancy",
  "Unresponsive party during active order",
  "Scope change disagreement",
  "Other service concern",
] as const;

export const ACCOUNT_DELETION_REASONS = [
  { value: "", label: "Select a reason" },
  {
    value: "no-longer-needed",
    label: "I no longer need MyKostoma services",
  },
  {
    value: "switching-account",
    label: "Switching to a different account or business entity",
  },
  {
    value: "privacy-concerns",
    label: "Privacy or data security concerns",
  },
  {
    value: "too-many-notifications",
    label: "Receiving too many alerts or emails",
  },
  {
    value: "pricing-or-fees",
    label: "Service fees or commission structure",
  },
  {
    value: "other",
    label: "Other reason",
  },
] as const;

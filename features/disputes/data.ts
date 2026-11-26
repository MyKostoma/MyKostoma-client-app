import type {
  DisputableOrderOption,
  DisputeCase,
  DisputeKpiSummary,
} from "@/components/disputes/types";

export const DISPUTE_REASON_OPTIONS: readonly string[] = [
  "Work not completed as agreed",
  "Quality does not match description",
  "Professional did not show up",
  "Payment not released after completion",
  "Unprofessional conduct",
  "Damage caused during service",
  "Other",
];

export const DEFAULT_DISPUTE_KPIS: DisputeKpiSummary = {
  avgResolutionDays: "4.2 Days",
  avgResolutionTrend: "-12% from last month",
  successRatePercent: "92%",
  successRateTrend: "+2% from last month",
};

export interface DisputeGuidelineSection {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
}

export const DISPUTE_GUIDELINES_ITEMS: DisputeGuidelineSection[] = [
  {
    id: "escrow-freeze",
    title: "1. Immediate Escrow Protection",
    summary:
      "As soon as a dispute is opened, any unreleased milestone or escrow balance tied to the order is automatically frozen.",
    bullets: [
      "Neither party can unilaterally withdraw frozen funds during active mediation.",
      "Funds remain securely held in MyKostoma Escrow until mutual agreement or mediator ruling.",
    ],
  },
  {
    id: "evidence-standards",
    title: "2. Accepted Evidence & Documentation",
    summary:
      "Both consumers and professionals may submit supporting documentation within 48 hours of case opening.",
    bullets: [
      "Clear date-stamped photos or short walkthrough captures of delivered work.",
      "Original quotation scope, milestone checklists, and in-app chat confirmations.",
      "Invoices or third-party repair receipts where damage or missing materials are claimed.",
    ],
  },
  {
    id: "resolution-sla",
    title: "3. Mediation Process & 4-Business-Day SLA",
    summary:
      "A neutral MyKostoma specialist reviews both statements alongside order milestones.",
    bullets: [
      "Initial mediator review begins within 48 hours of submission.",
      "Both parties can propose Full Release, Full Refund, or Split Partial Settlement at any stage.",
      "Most disputes reach binding settlement within 4 business days.",
    ],
  },
];

export const FALLBACK_DISPUTABLE_ORDERS: DisputableOrderOption[] = [
  {
    id: "ord-5521",
    code: "ORD-5521",
    serviceTitle: "Home Cleaning & Kitchen Detailing",
    counterpartyName: "John Doe",
    counterpartyRole: "professional",
    totalAmount: 120000,
    amountFormatted: "₦120,000",
  },
  {
    id: "ord-6210",
    code: "ORD-6210",
    serviceTitle: "Garden Maintenance & Landscaping",
    counterpartyName: "Sarah Miller",
    counterpartyRole: "professional",
    totalAmount: 85000,
    amountFormatted: "₦85,000",
  },
  {
    id: "ord-4932",
    code: "ORD-4932",
    serviceTitle: "Electrical Wiring & Inverter Setup",
    counterpartyName: "Mike Richards",
    counterpartyRole: "professional",
    totalAmount: 145000,
    amountFormatted: "₦145,000",
  },
];

export const DEFAULT_DISPUTE_CASES: DisputeCase[] = [
  {
    id: "ds-1024",
    code: "#DS-1024",
    orderId: "ord-5521",
    orderCode: "#ORD-5521",
    serviceTitle: "Home Cleaning",
    totalAmount: 120000,
    currency: "NGN",
    escrowStatus: "frozen",
    consumerName: "Sarah Jenkins",
    professionalName: "John Doe",
    dateRaisedLabel: "Oct 12, 2026",
    createdAtISO: "2026-10-12T10:15:00Z",
    status: "under-review",
    reason: "Quality does not match description",
    description:
      'The professional arrived late and did not clean the kitchen as specified in the service agreement. Multiple surfaces were left unwashed, and the trash was not emptied as promised in the "Premium Package".',
    timeline: [
      {
        id: "tl-1024-1",
        title: "Dispute Opened",
        timestampLabel: "Oct 12, 2026 • 10:15 AM",
        state: "completed",
      },
      {
        id: "tl-1024-2",
        title: "Under Review",
        timestampLabel: "Oct 14, 2026 • Current",
        state: "current",
        note: "MyKostoma is currently reviewing the evidence provided by both parties. A resolution is expected within 48 hours.",
      },
    ],
    responses: [
      {
        id: "resp-1024-1",
        authorName: "Sarah Jenkins",
        authorRole: "consumer",
        timestampLabel: "Oct 12, 2026 • 10:30 AM",
        message: "Uploaded 3 photos showing the uncleaned areas in the kitchen.",
        attachments: [
          {
            id: "att-1024-1",
            label: "Kitchen Counter Photo",
            fileName: "kitchen-counter-evidence.jpg",
            fileType: "image",
            sizeLabel: "1.4 MB",
          },
          {
            id: "att-1024-2",
            label: "Stove Detail Photo",
            fileName: "stove-detail-evidence.jpg",
            fileType: "image",
            sizeLabel: "1.1 MB",
          },
          {
            id: "att-1024-3",
            label: "Trash Bin Photo",
            fileName: "trash-bin-evidence.jpg",
            fileType: "image",
            sizeLabel: "920 KB",
          },
        ],
      },
      {
        id: "resp-1024-2",
        authorName: "John Doe",
        authorRole: "professional",
        timestampLabel: "Oct 13, 2026 • 02:15 PM",
        message:
          '"I completed all tasks as requested. The kitchen was already clean when I arrived, so I focused on the living room as requested verbally during the walkthrough. The late arrival was communicated 30 minutes in advance due to traffic."',
      },
    ],
  },
  {
    id: "ds-1025",
    code: "#DS-1025",
    orderId: "ord-6210",
    orderCode: "#ORD-6210",
    serviceTitle: "Garden Maintenance",
    totalAmount: 85000,
    currency: "NGN",
    escrowStatus: "frozen",
    consumerName: "Sarah Jenkins",
    professionalName: "Sarah Miller",
    dateRaisedLabel: "Oct 14, 2026",
    createdAtISO: "2026-10-14T09:20:00Z",
    status: "open",
    reason: "Work not completed as agreed",
    description:
      "Front lawn hedging and waste haul-away were left unfinished after Day 1 without a rescheduled follow-up visit.",
    timeline: [
      {
        id: "tl-1025-1",
        title: "Dispute Opened",
        timestampLabel: "Oct 14, 2026 • 09:20 AM",
        state: "completed",
      },
      {
        id: "tl-1025-2",
        title: "Awaiting Counterparty Statement",
        timestampLabel: "Oct 14, 2026 • Current",
        state: "current",
        note: "Both parties can upload supporting photos or propose a mutual resolution while escrow funds remain frozen.",
      },
    ],
    responses: [
      {
        id: "resp-1025-1",
        authorName: "Sarah Jenkins",
        authorRole: "consumer",
        timestampLabel: "Oct 14, 2026 • 09:25 AM",
        message:
          "Shared before-and-after garden photos showing remaining debris bags along the driveway.",
        attachments: [
          {
            id: "att-1025-1",
            label: "Driveway Debris Photo",
            fileName: "driveway-debris.jpg",
            fileType: "image",
            sizeLabel: "1.8 MB",
          },
        ],
      },
    ],
  },
  {
    id: "ds-1026",
    code: "#DS-1026",
    orderId: "ord-4932",
    orderCode: "#ORD-4932",
    serviceTitle: "Electrical Wiring",
    totalAmount: 145000,
    currency: "NGN",
    escrowStatus: "frozen",
    consumerName: "Sarah Jenkins",
    professionalName: "Mike Richards",
    dateRaisedLabel: "Oct 15, 2026",
    createdAtISO: "2026-10-15T14:05:00Z",
    status: "under-review",
    reason: "Payment not released after completion",
    description:
      "Changeover switch installation and load balancing were tested and signed off on-site, but the final escrow milestone remains pending.",
    timeline: [
      {
        id: "tl-1026-1",
        title: "Dispute Opened",
        timestampLabel: "Oct 15, 2026 • 02:05 PM",
        state: "completed",
      },
      {
        id: "tl-1026-2",
        title: "Under Review",
        timestampLabel: "Oct 16, 2026 • Current",
        state: "current",
        note: "Mediator is verifying signed commissioning sheet and multimeter test readings.",
      },
    ],
    responses: [
      {
        id: "resp-1026-1",
        authorName: "Mike Richards",
        authorRole: "professional",
        timestampLabel: "Oct 15, 2026 • 02:40 PM",
        message:
          "Uploaded commissioning checklist and voltage verification log signed during handover.",
        attachments: [
          {
            id: "att-1026-1",
            label: "Commissioning Sign-Off PDF",
            fileName: "commissioning-checklist.pdf",
            fileType: "document",
            sizeLabel: "640 KB",
          },
        ],
      },
    ],
  },
  {
    id: "ds-0988",
    code: "#DS-0988",
    orderId: "ord-3312",
    orderCode: "#ORD-3312",
    serviceTitle: "HVAC Install",
    totalAmount: 210000,
    currency: "NGN",
    escrowStatus: "split",
    consumerName: "Sarah Jenkins",
    professionalName: "Anna Wong",
    dateRaisedLabel: "Sep 28, 2026",
    createdAtISO: "2026-09-28T11:30:00Z",
    status: "resolved",
    reason: "Work not completed as agreed",
    description:
      "Outdoor condenser bracket calibration required re-leveling and replacement of missing drain insulation.",
    timeline: [
      {
        id: "tl-0988-1",
        title: "Dispute Opened",
        timestampLabel: "Sep 28, 2026 • 11:30 AM",
        state: "completed",
      },
      {
        id: "tl-0988-2",
        title: "Under Review",
        timestampLabel: "Sep 29, 2026 • 04:00 PM",
        state: "completed",
      },
      {
        id: "tl-0988-3",
        title: "Resolved via Partial Settlement",
        timestampLabel: "Sep 30, 2026 • 10:15 AM",
        state: "completed",
        note: "Both parties accepted a 20% refund / 80% professional release split.",
      },
    ],
    responses: [
      {
        id: "resp-0988-1",
        authorName: "Anna Wong",
        authorRole: "professional",
        timestampLabel: "Sep 29, 2026 • 01:00 PM",
        message:
          "Agreed to cover the drain insulation material cost via partial escrow adjustment.",
      },
    ],
    resolutionProposal: {
      path: "split",
      splitConsumerPercent: 20,
      note: "Mutual split agreement for missing drain insulation replacement.",
      proposedByRole: "professional",
      proposedAtLabel: "Sep 30, 2026 • 10:15 AM",
      finalized: true,
    },
  },
  {
    id: "ds-0964",
    code: "#DS-0964",
    orderId: "ord-2984",
    orderCode: "#ORD-2984",
    serviceTitle: "Plumbing Service",
    totalAmount: 65000,
    currency: "NGN",
    escrowStatus: "refunded",
    consumerName: "Sarah Jenkins",
    professionalName: "Chidi Okafor",
    dateRaisedLabel: "Sep 14, 2026",
    createdAtISO: "2026-09-14T08:45:00Z",
    status: "resolved",
    reason: "Professional did not show up",
    description:
      "Appointment window elapsed without arrival or prior rescheduling notice.",
    timeline: [
      {
        id: "tl-0964-1",
        title: "Dispute Opened",
        timestampLabel: "Sep 14, 2026 • 08:45 AM",
        state: "completed",
      },
      {
        id: "tl-0964-2",
        title: "Resolved — Full Refund Issued",
        timestampLabel: "Sep 15, 2026 • 03:20 PM",
        state: "completed",
        note: "Full escrow balance refunded to consumer wallet.",
      },
    ],
    responses: [],
    resolutionProposal: {
      path: "refund-to-consumer",
      note: "Confirmed no-show; 100% escrow returned to consumer.",
      proposedByRole: "consumer",
      proposedAtLabel: "Sep 15, 2026 • 03:20 PM",
      finalized: true,
    },
  },
];

export function getDefaultDisputeById(idOrCode: string): DisputeCase | undefined {
  const normalized = idOrCode.trim().toLowerCase().replace(/^#/, "");
  return DEFAULT_DISPUTE_CASES.find(
    (item) =>
      item.id.toLowerCase() === normalized ||
      item.code.toLowerCase().replace(/^#/, "") === normalized
  );
}

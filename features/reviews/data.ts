import type {
  PendingReviewOrder,
  ReviewRecord,
} from "@/components/reviews/types";

export const REVIEW_REPORT_REASONS = [
  "Inaccurate or fabricated order claim",
  "Contains offensive or abusive language",
  "Personal or private information shared",
  "Conflict of interest or spam",
  "Other policy violation",
] as const;

export const DEFAULT_RECEIVED_REVIEWS: ReviewRecord[] = [
  {
    id: "rev-101",
    direction: "received",
    authorName: "Sarah Jenkins",
    authorRole: "Verified Consumer",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    recipientName: "Dr. Alex Rivers",
    recipientRole: "Senior Consultant",
    recipientAvatarUrl: "",
    rating: 5,
    headline: "Exceptional professional service and patient care",
    comment:
      "I recently had a consultation with Dr. Rivers and I cannot express how satisfied I am with the experience. From the moment I walked into the clinic, the atmosphere was professional and welcoming. The consultation itself was thorough; Dr. Rivers took the time to explain everything in detail, ensuring I understood my options without feeling rushed.\n\nIt's rare to find a specialist who combines such high-level expertise with a genuine bedside manner. All my questions were answered with great patience. I highly recommend this clinic for anyone seeking specialized care in this field. The follow-up instructions were clear and easy to follow.",
    dateLabel: "March 14, 2026",
    createdAtISO: "2026-03-14",
    orderId: "ORD-2026-9481",
    orderCode: "ORD-2026-9481",
    serviceTitle: "Residential Consultation",
    verifiedPurchase: true,
    locationLabel: "Downtown Clinic Branch",
    response: {
      text: "Thank you so much for your kind words, Sarah! It was a pleasure meeting you, and I'm glad we could address all your concerns during the consultation. Please don't hesitate to reach out if you have further questions.",
      repliedAtLabel: "March 15, 2026",
      repliedAtISO: "2026-03-15",
    },
  },
  {
    id: "rev-102",
    direction: "received",
    authorName: "Michael Chen",
    authorRole: "Verified Consumer",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    recipientName: "Dr. Alex Rivers",
    recipientRole: "Senior Consultant",
    recipientAvatarUrl: "",
    rating: 4,
    headline: "Knowledgeable team and helpful deliverables",
    comment:
      "The appointment was slightly delayed, but the quality of the advice was worth the wait. Very knowledgeable staff and clean facilities.",
    dateLabel: "March 12, 2026",
    createdAtISO: "2026-03-12",
    orderId: "ORD-2026-9452",
    orderCode: "ORD-2026-9452",
    serviceTitle: "Commercial Space Assessment",
    verifiedPurchase: true,
    locationLabel: "Victoria Island, Lagos",
  },
  {
    id: "rev-103",
    direction: "received",
    authorName: "Emma Watson",
    authorRole: "Verified Consumer",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=80",
    recipientName: "Dr. Alex Rivers",
    recipientRole: "Senior Consultant",
    recipientAvatarUrl: "",
    rating: 2,
    headline: "Arrival instructions could be clearer",
    comment:
      "Had a bit of a difficult time finding the office and the parking was full. Wish there were clearer directions provided in the confirmation email.",
    dateLabel: "March 10, 2026",
    createdAtISO: "2026-03-10",
    orderId: "ORD-2026-9410",
    orderCode: "ORD-2026-9410",
    serviceTitle: "On-Site Design Walkthrough",
    verifiedPurchase: true,
    locationLabel: "Ikoyi Office Annex",
    requiresAttention: true,
  },
  {
    id: "rev-104",
    direction: "received",
    authorName: "Daniel Okoro",
    authorRole: "Hub-X Founder",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    recipientName: "Dr. Alex Rivers",
    recipientRole: "Senior Consultant",
    recipientAvatarUrl: "",
    rating: 5,
    headline: "Seamless office layout transformation",
    comment:
      "Exceptional eye for commercial planning and efficiency. Managed our renovation supervision with extreme professionalism and delivered every milestone right on schedule.",
    dateLabel: "March 6, 2026",
    createdAtISO: "2026-03-06",
    orderId: "ORD-2026-9375",
    orderCode: "ORD-2026-9375",
    serviceTitle: "Commercial Layout Planning",
    verifiedPurchase: true,
    locationLabel: "Lekki Phase 1, Lagos",
    response: {
      text: "Thank you so much Daniel! It was a privilege helping Hub-X design a space that boosts productivity. Looking forward to future collaborations.",
      repliedAtLabel: "March 7, 2026",
      repliedAtISO: "2026-03-07",
    },
  },
  {
    id: "rev-105",
    direction: "received",
    authorName: "Linda James",
    authorRole: "Restaurateur",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    recipientName: "Dr. Alex Rivers",
    recipientRole: "Senior Consultant",
    recipientAvatarUrl: "",
    rating: 5,
    headline: "Spot-on lighting & material curation",
    comment:
      "Great work on the cafe's lighting plan and acoustic wall panels. It really sets the warm atmosphere our guests love.",
    dateLabel: "March 2, 2026",
    createdAtISO: "2026-03-02",
    orderId: "ORD-2026-9320",
    orderCode: "ORD-2026-9320",
    serviceTitle: "Lighting & Atmosphere Package",
    verifiedPurchase: true,
    locationLabel: "Victoria Island, Lagos",
  },
  {
    id: "rev-106",
    direction: "received",
    authorName: "Tunde Bakare",
    authorRole: "Property Developer",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    recipientName: "Dr. Alex Rivers",
    recipientRole: "Senior Consultant",
    recipientAvatarUrl: "",
    rating: 5,
    headline: "Detailed CAD drawings and realistic 3D renders",
    comment:
      "Every elevation drawing was contractor-ready with zero ambiguity on measurements. Saved our site team days of back-and-forth clarifications.",
    dateLabel: "February 24, 2026",
    createdAtISO: "2026-02-24",
    orderId: "ORD-2026-9211",
    orderCode: "ORD-2026-9211",
    serviceTitle: "3D Visualization Pack",
    verifiedPurchase: true,
    locationLabel: "Ikoyi, Lagos",
    response: {
      text: "Glad the CAD package and 3D renders kept site execution smooth, Tunde. Always happy to support your development team.",
      repliedAtLabel: "February 25, 2026",
      repliedAtISO: "2026-02-25",
    },
  },
  {
    id: "rev-107",
    direction: "received",
    authorName: "Amaka Eze",
    authorRole: "Homeowner",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    recipientName: "Dr. Alex Rivers",
    recipientRole: "Senior Consultant",
    recipientAvatarUrl: "",
    rating: 4,
    headline: "Transparent pricing and attentive follow-up",
    comment:
      "Appreciated the itemized budget breakdown from day one. Delivery on the bespoke shelving units took an extra two days, but the finish quality is solid.",
    dateLabel: "February 18, 2026",
    createdAtISO: "2026-02-18",
    orderId: "ORD-2026-9188",
    orderCode: "ORD-2026-9188",
    serviceTitle: "Bespoke Furniture Design",
    verifiedPurchase: true,
    locationLabel: "Yaba, Lagos",
    response: {
      text: "Thank you for your patience and honest feedback, Amaka! We have tightened our workshop handoff schedule to avoid those extra transit days.",
      repliedAtLabel: "February 19, 2026",
      repliedAtISO: "2026-02-19",
    },
  },
];

export const DEFAULT_GIVEN_REVIEWS: ReviewRecord[] = [
  {
    id: "rev-201",
    direction: "given",
    authorName: "Dr. Alex Rivers",
    authorRole: "Verified Provider",
    authorAvatarUrl: "",
    recipientName: "Sarah Jenkins",
    recipientRole: "Consumer Profile",
    recipientAvatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    rating: 5,
    headline: "Prompt communication and clear requirements",
    comment:
      "Sarah prepared all reference inspirations ahead of the consultation and confirmed milestone sign-off promptly. A pleasure working together.",
    dateLabel: "March 15, 2026",
    createdAtISO: "2026-03-15",
    orderId: "ORD-2026-9481",
    orderCode: "ORD-2026-9481",
    serviceTitle: "Residential Consultation",
    verifiedPurchase: true,
    locationLabel: "Lekki Phase 1, Lagos",
  },
  {
    id: "rev-202",
    direction: "given",
    authorName: "Sarah Jenkins",
    authorRole: "Verified Consumer",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    recipientName: "Adex Interior Designs Ltd.",
    recipientRole: "Verified Company",
    recipientAvatarUrl: "",
    rating: 5,
    headline: "Clean POP ceiling installation on schedule",
    comment:
      "Very neat work around the recessed lighting channels. The site crew cleaned up daily and delivered before the agreed date.",
    dateLabel: "March 9, 2026",
    createdAtISO: "2026-03-09",
    orderId: "ORD-8821",
    orderCode: "ORD-8821",
    serviceTitle: "POP Ceiling Installation",
    verifiedPurchase: true,
    locationLabel: "Lekki Phase 1, Lagos",
    response: {
      text: "Thank you for trusting Adex Interior Designs Ltd., Sarah! Enjoy the refreshed living room ceiling.",
      repliedAtLabel: "March 10, 2026",
      repliedAtISO: "2026-03-10",
    },
  },
  {
    id: "rev-203",
    direction: "given",
    authorName: "Sarah Jenkins",
    authorRole: "Verified Consumer",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    recipientName: "Chiamaka Okafor",
    recipientRole: "Interior Specialist",
    recipientAvatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    rating: 4,
    headline: "Thoughtful spatial layout suggestions",
    comment:
      "Chiamaka helped optimize our dining and hallway circulation within budget. Would happily book her again for phase two.",
    dateLabel: "February 28, 2026",
    createdAtISO: "2026-02-28",
    orderId: "MK-2026-8812",
    orderCode: "MK-2026-8812",
    serviceTitle: "Residential Consultation",
    verifiedPurchase: true,
    locationLabel: "Ikeja GRA, Lagos",
  },
];

export const DEFAULT_PENDING_REVIEW_ORDERS: PendingReviewOrder[] = [
  {
    id: "pending-ord-2026-9481",
    orderId: "ORD-2026-9481",
    orderCode: "ORD-2026-9481",
    targetRole: "consumer",
    recipientName: "Sarah Jenkins",
    recipientSubtitle: "Consumer Profile",
    recipientAvatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    serviceTitle: "Residential Consultation",
    completedDateLabel: "JAN 24, 2026",
    feeFormatted: "₦150,000",
  },
  {
    id: "pending-mk-2026-8812",
    orderId: "MK-2026-8812",
    orderCode: "MK-2026-8812",
    targetRole: "professional",
    recipientName: "Chiamaka Okafor",
    recipientSubtitle: "Verified Professional",
    recipientAvatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    serviceTitle: "Residential Consultation",
    completedDateLabel: "Jan 12, 2026",
    feeFormatted: "₦150,000",
  },
  {
    id: "pending-ord-2026-001",
    orderId: "ORD-2026-001",
    orderCode: "ORD-2026-001",
    targetRole: "consumer",
    recipientName: "Sarah Jenkins",
    recipientSubtitle: "Consumer Profile",
    recipientAvatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    serviceTitle: "Logo Design Package",
    completedDateLabel: "OCT 17, 2026",
    feeFormatted: "₦225,000",
  },
  {
    id: "pending-ord-8821",
    orderId: "ORD-8821",
    orderCode: "ORD-8821",
    targetRole: "professional",
    recipientName: "Adex Interior Designs Ltd.",
    recipientSubtitle: "Verified Professional",
    recipientAvatarUrl: "",
    serviceTitle: "POP Ceiling Installation",
    completedDateLabel: "Oct 24, 2026",
    feeFormatted: "₦850,000",
  },
];

export function getDefaultReviewById(id: string): ReviewRecord | undefined {
  const normalized = id.trim().toLowerCase();
  return [...DEFAULT_RECEIVED_REVIEWS, ...DEFAULT_GIVEN_REVIEWS].find(
    (review) =>
      review.id.toLowerCase() === normalized ||
      review.orderCode.toLowerCase() === normalized
  );
}

export function getDefaultPendingOrderById(
  orderId: string
): PendingReviewOrder | undefined {
  const normalized = orderId.trim().toLowerCase();
  return DEFAULT_PENDING_REVIEW_ORDERS.find(
    (item) =>
      item.orderId.toLowerCase() === normalized ||
      item.orderCode.toLowerCase() === normalized ||
      item.id.toLowerCase() === normalized
  );
}

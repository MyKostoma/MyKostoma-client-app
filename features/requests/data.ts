import type {
  ConsumerRequestItem,
  ProfessionalRequestItem,
  RequestFormValues,
} from "@/components/requests/types";

export const DEFAULT_CONSUMER_REQUESTS: ConsumerRequestItem[] = [
  {
    id: "REQ-2026-0842",
    code: "REQ-2026-0842",
    title: "Roof Leak Repair & Shingle Replacement",
    category: "Plumbing & Roofing",
    dateLabel: "Posted Oct 15, 2026",
    postedDateFull: "October 15, 2026",
    budget: "₦150,000.00",
    budgetMin: "25,000",
    budgetMax: "50,000",
    budgetRangeLabel: "₦25,000 — ₦50,000",
    location: "Lekki Phase 1, Lagos",
    addressFull: "12 Maplewood Avenue, Ikeja, Lagos",
    timeline: "Within 24 hours",
    quotesCount: 5,
    quotesBadgeLabel: "5 Quotes",
    status: "open",
    description:
      "The living room ceiling is currently leaking whenever it rains. I believe some shingles were displaced during the last storm. Looking for a professional to assess the damage, replace broken shingles, and ensure the roof is completely waterproof again. I also noticed some water stains on the plasterboard that might need cleaning or minor patching.",
    photosCount: 2,
    quotes: [
      {
        id: "quote-tunde-repairs",
        providerName: "Tunde Repairs & Maintenance",
        rating: 4.8,
        reviewCount: 124,
        amount: "₦135,000.00",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "quote-swifthome",
        providerName: "SwiftHome Solutions",
        rating: 4.9,
        reviewCount: 42,
        amount: "₦160,000.00",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
  {
    id: "REQ-2026-0819",
    code: "REQ-2026-0819",
    title: "Smart Home Security System Setup",
    category: "Electrical & Tech",
    dateLabel: "Posted Oct 12, 2026",
    postedDateFull: "October 12, 2026",
    budget: "₦420,000.00",
    budgetMin: "380,000",
    budgetMax: "450,000",
    budgetRangeLabel: "₦380,000 — ₦450,000",
    location: "Ikeja GRA, Lagos",
    addressFull: "24 Oduduwa Crescent, Ikeja GRA, Lagos",
    timeline: "Within 3 days",
    quotesCount: 1,
    quotesBadgeLabel: "Hired (1)",
    status: "in-progress",
    description:
      "Complete installation of smart perimeter cameras, video doorbell, and biometric smart locks for a 4-bedroom duplex.",
    photosCount: 2,
    quotes: [
      {
        id: "quote-voltsmart",
        providerName: "VoltSmart Solutions",
        rating: 5.0,
        reviewCount: 98,
        amount: "₦420,000.00",
        avatarUrl:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
  {
    id: "REQ-2026-0765",
    code: "REQ-2026-0765",
    title: "Kitchen Cabinet Installation",
    category: "Carpentry",
    dateLabel: "Finished Oct 02, 2026",
    postedDateFull: "September 20, 2026",
    budget: "₦850,000.00",
    budgetMin: "750,000",
    budgetMax: "900,000",
    budgetRangeLabel: "₦750,000 — ₦900,000",
    location: "Abuja, FCT",
    addressFull: "18 Maitama Way, Abuja, FCT",
    timeline: "Within 2 weeks",
    quotesCount: 3,
    quotesBadgeLabel: "3 Quotes",
    status: "completed",
    description:
      "Custom fabrication and installation of soft-close upper and lower kitchen cabinets with quartz countertop support.",
    photosCount: 2,
    quotes: [
      {
        id: "quote-marcus-thorne",
        providerName: "Marcus Thorne Woodcraft",
        rating: 4.9,
        reviewCount: 230,
        amount: "₦850,000.00",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
  {
    id: "REQ-9821-XP",
    code: "REQ-9821-XP",
    title: "Custom Wardrobe Refurbishing",
    category: "Carpentry",
    dateLabel: "Cancelled Sep 28, 2026",
    postedDateFull: "September 15, 2026",
    budget: "₦120,000.00",
    budgetMin: "2,500",
    budgetMax: "4,000",
    budgetRangeLabel: "₦2,500 — ₦4,000",
    location: "Gbagada, Lagos",
    addressFull: "8 Medina Estate, Gbagada, Lagos",
    timeline: "Within 3 months",
    quotesCount: 0,
    quotesBadgeLabel: "0 Quotes",
    status: "closed",
    closedDateLabel: "October 24, 2024",
    description:
      "I am looking for a professional furniture designer or interior specialist to create a custom cabinetry solution for my loft. The primary focus is a large built-in wardrobe in the master bedroom and a smaller shelving unit for the entryway.",
    extraDescription:
      "The style should be minimalist and modern, utilizing light oak wood textures combined with matte charcoal finishes. Precision in measurement is key as the loft has high ceilings and slightly uneven floor levels.",
    photosCount: 0,
    quotes: [],
    marketplaceQuotes: [
      {
        id: "mp-quote-elite",
        providerName: "Elite Woodwork & Design",
        receivedAtLabel: "Received Today, 10:45 AM",
        amount: "₦3,200",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "mp-quote-modern-spaces",
        providerName: "Modern Spaces Studio",
        receivedAtLabel: "Received Today, 08:30 AM",
        amount: "₦2,850",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "mp-quote-artisan",
        providerName: "Artisan Cabinets Co.",
        receivedAtLabel: "Received Yesterday, 04:15 PM",
        amount: "₦3,900",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
];

export const MARKETPLACE_LOFT_REQUEST: ConsumerRequestItem = {
  id: "REQ-9821-XP",
  code: "REQ-9821-XP",
  title: "Custom Cabinetry and Wardrobe Design for Modern Loft",
  category: "Interior Design & Furniture",
  dateLabel: "Posted Oct 12, 2024",
  postedDateFull: "October 12, 2024",
  budget: "₦2,500 — ₦4,000",
  budgetMin: "2,500",
  budgetMax: "4,000",
  budgetRangeLabel: "₦2,500 — ₦4,000",
  location: "New York City, NY",
  timeline: "Within 3 months",
  quotesCount: 3,
  quotesBadgeLabel: "3 Quotes",
  status: "open",
  closedDateLabel: "October 24, 2024",
  description:
    "I am looking for a professional furniture designer or interior specialist to create a custom cabinetry solution for my loft. The primary focus is a large built-in wardrobe in the master bedroom and a smaller shelving unit for the entryway.",
  extraDescription:
    "The style should be minimalist and modern, utilizing light oak wood textures combined with matte charcoal finishes. Precision in measurement is key as the loft has high ceilings and slightly uneven floor levels.",
  quotes: [],
  marketplaceQuotes: [
    {
      id: "mp-quote-elite",
      providerName: "Elite Woodwork & Design",
      receivedAtLabel: "Received Today, 10:45 AM",
      amount: "₦3,200",
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "mp-quote-modern-spaces",
      providerName: "Modern Spaces Studio",
      receivedAtLabel: "Received Today, 08:30 AM",
      amount: "₦2,850",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "mp-quote-artisan",
      providerName: "Artisan Cabinets Co.",
      receivedAtLabel: "Received Yesterday, 04:15 PM",
      amount: "₦3,900",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
  ],
};

export const DEFAULT_EDIT_REQUEST_VALUES: RequestFormValues = {
  title: "Repair leaking roof in living room",
  category: "Plumbing & Roofing",
  description:
    "There is a persistent leak in the center of the living room ceiling whenever it rains heavily. The roof tiles appear shifted. Need an inspection and repair as soon as possible to avoid interior damage.",
  budgetMin: "25,000",
  budgetMax: "50,000",
  timeline: "Within 24 hours",
  location: "12 Maplewood Avenue, Ikeja, Lagos",
  photos: ["roof-leak-1.jpg"],
};

// ============================================================================
// PROFESSIONAL REQUESTS MODULE MOCK DATA
// ============================================================================

export const PRO_REQUEST_CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "electrical-services", label: "Electrical Services" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "software-dev", label: "Software Dev" },
  { value: "digital-marketing", label: "Digital Marketing" },
] as const;

export const PRO_REQUEST_BUDGET_OPTIONS = [
  { value: "any", label: "Any Budget" },
  { value: "low", label: "Under ₦100,000" },
  { value: "mid", label: "₦100,000 – ₦500,000" },
  { value: "high", label: "₦500,000+" },
] as const;

export const PRO_REQUEST_LOCATION_OPTIONS = [
  { value: "all", label: "All Locations" },
  { value: "remote", label: "Remote Only" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
] as const;

export const DEFAULT_PROFESSIONAL_REQUESTS: ProfessionalRequestItem[] = [
  {
    id: "RQ-2026-882",
    code: "RQ-2026-882",
    title: "Residential Electrical Rewiring",
    category: "ELECTRICAL SERVICES",
    categorySlug: "electrical-services",
    postedAgoLabel: "Posted Oct 12, 2026",
    postedDateLabel: "Posted Oct 12, 2026",
    shortDescription:
      "Need a full rewiring for a 3-bedroom bungalow. Includes panel upgrade and new outlets. Looking for a licensed electrical contractor.",
    fullDescription: [
      "Need a full rewiring for a 3-bedroom bungalow. Includes panel upgrade and new outlets. The current system is outdated and prone to frequent tripping.",
      "Looking for a professional with experience in residential systems to ensure safety and compliance with current building codes.",
    ],
    budgetLabel: "₦450,000 - 600,000",
    budgetRangeShort: "450k - 600k",
    budgetTier: "high",
    location: "Lagos, Nigeria",
    locationType: "onsite",
    engagementType: "Project-based",
    timeline: "Start within 2 weeks",
    requirements: [
      "Licensed electrical contractor certification.",
      "Experience with residential rewiring projects.",
      "Ability to provide an itemized list of materials.",
    ],
    attachment: {
      id: "att-house-plan",
      fileName: "House_Plan_Draft.pdf",
      fileSize: "2.4 MB",
      fileType: "PDF",
    },
    client: {
      name: "Oluwaseun A.",
      rating: 4,
      reviewCount: 12,
      memberSince: "May 2024",
      verifiedIdentity: true,
      paymentMethodVerified: true,
    },
    availabilityState: "open",
  },
  {
    id: "REQ-PRO-101",
    code: "REQ-PRO-101",
    title: "E-commerce Platform Redesign",
    category: "UI/UX DESIGN",
    categorySlug: "ui-ux-design",
    postedAgoLabel: "Posted 2 hours ago",
    postedDateLabel: "Posted Oct 14, 2026",
    shortDescription:
      "Looking for an experienced UI/UX designer to overhaul our existing B2B marketplace. Requirements include user research, wireframing, and high-fidelity mockups for 20+ screens.",
    fullDescription: [
      "Looking for an experienced UI/UX designer to overhaul our existing B2B marketplace. Requirements include user research, wireframing, and high-fidelity mockups for 20+ screens.",
      "You will collaborate with our frontend engineering team to build a scalable design system in Figma.",
    ],
    budgetLabel: "₦3,500 - ₦5,000",
    budgetRangeShort: "3.5k - 5k",
    budgetTier: "low",
    location: "Remote",
    locationType: "remote",
    engagementType: "Contract",
    timeline: "Start within 1 week",
    requirements: [
      "Proven portfolio of B2B or e-commerce redesigns.",
      "Strong proficiency with Figma auto-layout and component libraries.",
      "Ability to run usability interviews with existing merchants.",
    ],
    attachment: {
      id: "att-ecom-brief",
      fileName: "Marketplace_Audit_Brief.pdf",
      fileSize: "1.8 MB",
      fileType: "PDF",
    },
    client: {
      name: "Amina B.",
      rating: 5,
      reviewCount: 19,
      memberSince: "Jan 2024",
      verifiedIdentity: true,
      paymentMethodVerified: true,
    },
    availabilityState: "open",
  },
  {
    id: "REQ-PRO-102",
    code: "REQ-PRO-102",
    title: "Full-stack React/Node.js Developer",
    category: "SOFTWARE DEV",
    categorySlug: "software-dev",
    postedAgoLabel: "Posted 5 hours ago",
    postedDateLabel: "Posted Oct 14, 2026",
    shortDescription:
      "Need a developer to assist in building a dashboard for real-time data visualization. Must be proficient in Tailwind CSS and PostgreSQL.",
    fullDescription: [
      "Need a developer to assist in building a dashboard for real-time data visualization. Must be proficient in Tailwind CSS and PostgreSQL.",
      "The engagement covers API architecture, real-time websocket feeds, and responsive analytics widgets.",
    ],
    budgetLabel: "₦60 - ₦90 / hr",
    budgetRangeShort: "60 - 90 / hr",
    budgetTier: "mid",
    location: "New York, NY (Hybrid)",
    locationType: "hybrid",
    engagementType: "Project-based",
    timeline: "Immediate start",
    requirements: [
      "3+ years with React, Next.js, and Node.js.",
      "Experience tuning PostgreSQL queries for live analytics.",
      "Clean TypeScript & Tailwind CSS standards.",
    ],
    client: {
      name: "Michael C.",
      rating: 4.9,
      reviewCount: 24,
      memberSince: "Mar 2023",
      verifiedIdentity: true,
      paymentMethodVerified: true,
    },
    availabilityState: "permission-error",
    restrictedCategory: "Software Development",
    permissionReasons: [
      {
        id: "reason-identity",
        label: "Identity verification not completed",
        isIssue: false,
      },
      {
        id: "reason-category",
        label: "Primary category mismatch",
        isIssue: true,
      },
    ],
  },
  {
    id: "REQ-PRO-103",
    code: "REQ-PRO-103",
    title: "SEO Strategy for SaaS Startup",
    category: "DIGITAL MARKETING",
    categorySlug: "digital-marketing",
    postedAgoLabel: "Posted 1 day ago",
    postedDateLabel: "Posted Oct 13, 2026",
    shortDescription:
      "Seeking an SEO expert to conduct a full site audit and develop a 6-month content strategy to increase organic traffic. Experience with early-stage startups is a plus.",
    fullDescription: [
      "Seeking an SEO expert to conduct a full site audit and develop a 6-month content strategy to increase organic traffic. Experience with early-stage startups is a plus.",
      "Deliverables include technical SEO fixes, keyword clustering, and monthly KPI reporting.",
    ],
    budgetLabel: "₦2,000 - ₦3,000",
    budgetRangeShort: "2k - 3k",
    budgetTier: "low",
    location: "Remote",
    locationType: "remote",
    engagementType: "Retainer",
    timeline: "Within 10 days",
    requirements: [
      "Demonstrable SaaS organic growth case studies.",
      "Technical audit experience with Ahrefs / Screaming Frog.",
      "Content brief creation for technical writers.",
    ],
    client: {
      name: "David O.",
      rating: 4.8,
      reviewCount: 9,
      memberSince: "Aug 2024",
      verifiedIdentity: true,
      paymentMethodVerified: true,
    },
    availabilityState: "open",
  },
  {
    id: "REQ-9921-X",
    code: "REQ-9921-X",
    title: "Commercial Solar Inverter Setup",
    category: "ELECTRICAL SERVICES",
    categorySlug: "electrical-services",
    postedAgoLabel: "Posted 3 days ago",
    postedDateLabel: "Posted Oct 10, 2026",
    shortDescription:
      "Installation of 10kVA hybrid solar inverter with lithium battery bank for a commercial office space.",
    fullDescription: [
      "Installation of 10kVA hybrid solar inverter with lithium battery bank for a commercial office space.",
    ],
    budgetLabel: "₦750,000 - ₦950,000",
    budgetRangeShort: "750k - 950k",
    budgetTier: "high",
    location: "Lagos, Nigeria",
    locationType: "onsite",
    engagementType: "Project-based",
    timeline: "Closed",
    requirements: ["Certified solar technician."],
    client: {
      name: "Tunde K.",
      rating: 4.7,
      reviewCount: 7,
      memberSince: "Feb 2024",
      verifiedIdentity: true,
      paymentMethodVerified: true,
    },
    availabilityState: "unavailable",
  },
];


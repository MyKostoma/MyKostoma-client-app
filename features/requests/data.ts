import type { ConsumerRequestItem, RequestFormValues } from "@/components/requests";

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

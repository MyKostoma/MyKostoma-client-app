import {
  BadgeCheck,
  Hammer,
  Headset,
  LayoutGrid,
  Megaphone,
  Paintbrush,
  Scissors,
  ShieldCheck,
  Sofa,
  Wrench,
  Zap,
} from "lucide-react";
import type { SelectOption } from "@/components/ui/form-fields";
import type { SpotlightProviderItem } from "@/components/consumer-home/types";
import type {
  ProShopProfile,
  ProShopServiceItem,
  ShopCategory,
  ShopDeliveryWindow,
  ShopFilterOption,
  ShopFilterState,
  ShopProviderInfo,
  ShopProviderLevel,
  ShopServiceItem,
  ShopTrustHighlight,
} from "@/components/shop/types";

const GALLERY_POOL = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
];

const withGallery = (imageUrl: string): string[] => [imageUrl, ...GALLERY_POOL];

const PROVIDERS = {
  davidPeterson: {
    id: "david-peterson",
    name: "David Peterson",
    role: "Master Plumber & Pipe Systems Specialist",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    reviewsCount: 211,
    verified: true,
    level: "expert",
    memberSince: "2020",
    location: "Lagos, Nigeria",
    responseTime: "1 Hour",
    lastDelivery: "Today",
  },
  voltSmart: {
    id: "voltsmart-solutions",
    name: "VoltSmart Solutions",
    role: "Certified Electrical Safety Contractors",
    rating: 5.0,
    reviewsCount: 96,
    verified: true,
    level: "expert",
    memberSince: "2019",
    location: "Abuja, Nigeria",
    responseTime: "3 Hours",
    lastDelivery: "2 Days ago",
  },
  sarahJenkins: {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "Interior Stylist & Content Writer",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 4.8,
    reviewsCount: 74,
    verified: true,
    level: "professional",
    memberSince: "2022",
    location: "Lagos, Nigeria",
    responseTime: "2 Hours",
    lastDelivery: "1 Day ago",
  },
  marcusThorne: {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    role: "Custom Furniture Carpenter",
    rating: 4.9,
    reviewsCount: 138,
    verified: true,
    level: "expert",
    memberSince: "2018",
    location: "Ibadan, Nigeria",
    responseTime: "4 Hours",
    lastDelivery: "3 Days ago",
  },
  sophiaMartinez: {
    id: "sophia-martinez",
    name: "Sophia Martinez",
    role: "Senior Social Media Strategist & Content Creator",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    reviewsCount: 128,
    verified: true,
    level: "expert",
    memberSince: "2021",
    location: "Lagos, Nigeria",
    responseTime: "2 Hours",
    lastDelivery: "1 Day ago",
  },
  growthAgency: {
    id: "growth-agency-ny",
    name: "Growth Agency NY",
    role: "Technical SEO & Analytics Agency",
    rating: 5.0,
    reviewsCount: 64,
    verified: true,
    level: "expert",
    memberSince: "2019",
    location: "Abuja, Nigeria",
    responseTime: "5 Hours",
    lastDelivery: "2 Days ago",
  },
  davidChen: {
    id: "david-chen",
    name: "David Chen",
    role: "Paid Media & Performance Marketer",
    rating: 4.8,
    reviewsCount: 89,
    verified: true,
    level: "expert",
    memberSince: "2020",
    location: "Lagos, Nigeria",
    responseTime: "3 Hours",
    lastDelivery: "Today",
  },
  marketingPros: {
    id: "marketing-pros-inc",
    name: "Marketing Pros Inc.",
    role: "Email & Lifecycle Marketing Studio",
    rating: 5.0,
    reviewsCount: 52,
    verified: true,
    level: "expert",
    memberSince: "2021",
    location: "Port Harcourt, Nigeria",
    responseTime: "6 Hours",
    lastDelivery: "3 Days ago",
  },
  robertVance: {
    id: "robert-vance",
    name: "Robert Vance",
    role: "Growth Marketing Consultant",
    rating: 4.7,
    reviewsCount: 41,
    verified: false,
    level: "professional",
    memberSince: "2023",
    location: "Lagos, Nigeria",
    responseTime: "2 Hours",
    lastDelivery: "Today",
  },
} satisfies Record<string, ShopProviderInfo>;

export const DEFAULT_SHOP_SERVICES: ShopServiceItem[] = [
  {
    id: "svc-master-plumbing",
    title: "Master Plumbing Diagnosis & Fix",
    categoryId: "plumbing",
    subCategoryId: "leak-repair",
    tagLabel: "Home Repair",
    imageUrl:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80",
    gallery: withGallery(
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80"
    ),
    badgeText: "Verified Pro",
    badgeVariant: "verified",
    provider: PROVIDERS.davidPeterson,
    price: 142,
    deliveryDays: 0,
    revisions: 1,
    packageLabel: "STANDARD PACKAGE",
    summary: [
      "A full on-site diagnosis of your plumbing system, covering leaks, water pressure, drainage and fittings, followed by an immediate fix for the identified faults.",
      "Every job is completed by a certified master plumber, with a written report so you know exactly what was found and repaired.",
    ],
    deliverables: [
      "Full plumbing system inspection",
      "Leak detection & pressure test",
      "On-the-spot repair of minor faults",
      "Written diagnosis report",
    ],
    featured: true,
  },
  {
    id: "svc-home-safety",
    title: "Full Home Safety Inspection",
    categoryId: "electricians",
    subCategoryId: "safety-inspection",
    tagLabel: "Electrical",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",
    gallery: withGallery(
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
    ),
    badgeText: "Corporate Partner",
    badgeVariant: "corporate",
    provider: PROVIDERS.voltSmart,
    price: 299,
    deliveryDays: 3,
    revisions: 1,
    packageLabel: "STANDARD PACKAGE",
    summary: [
      "A complete electrical safety audit of your home, including wiring, distribution boards, earthing and appliance load checks.",
      "You receive a clear risk rating for each area along with prioritised recommendations from a certified contractor.",
    ],
    deliverables: [
      "Wiring & distribution board audit",
      "Earthing and surge protection check",
      "Appliance load assessment",
      "Prioritised safety recommendations",
    ],
    featured: true,
  },
  {
    id: "svc-virtual-mood-board",
    title: "Virtual Room Mood Board",
    categoryId: "interior-design",
    subCategoryId: "design-consultation",
    tagLabel: "Design",
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    gallery: withGallery(
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
    ),
    badgeText: "Verified Pro",
    badgeVariant: "verified",
    provider: PROVIDERS.sarahJenkins,
    price: 85,
    deliveryDays: 3,
    revisions: 2,
    packageLabel: "STANDARD PACKAGE",
    summary: [
      "A curated digital mood board for one room, combining colour palette, furniture direction, textures and lighting ideas that match your taste and budget.",
      "Ideal before you start buying or renovating, so every decision fits one clear vision.",
    ],
    deliverables: [
      "Colour palette & material direction",
      "Furniture and decor references",
      "Lighting suggestions",
      "High-resolution mood board file",
    ],
    featured: true,
  },
  {
    id: "svc-floating-shelf",
    title: "Custom Floating Shelf (Pack of 3)",
    categoryId: "carpentry",
    subCategoryId: "custom-furniture",
    tagLabel: "Carpentry",
    imageUrl:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",
    gallery: withGallery(
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80"
    ),
    badgeText: "Verified Pro",
    badgeVariant: "verified",
    provider: PROVIDERS.marcusThorne,
    price: 450,
    deliveryDays: 5,
    revisions: 1,
    packageLabel: "STANDARD PACKAGE",
    summary: [
      "Three hand-finished floating shelves cut to your measurements in solid wood, with concealed brackets and your choice of stain.",
      "Delivery and wall mounting are included within Lagos and Ibadan.",
    ],
    deliverables: [
      "3 custom-cut solid wood shelves",
      "Concealed mounting brackets",
      "Stain or varnish finish of your choice",
      "Wall installation",
    ],
    featured: true,
  },
  {
    id: "svc-instagram-growth",
    title: "Complete Instagram Growth & Strategy Package",
    categoryId: "digital-marketing",
    subCategoryId: "social-media",
    tagLabel: "Social Media",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=900&q=80",
    gallery: withGallery(
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80"
    ),
    badgeText: "Verified Expert",
    badgeVariant: "verified",
    provider: PROVIDERS.sophiaMartinez,
    price: 1200,
    deliveryDays: 7,
    revisions: 2,
    packageLabel: "STANDARD PACKAGE",
    summary: [
      "Unlock the full potential of your brand's Instagram presence with a comprehensive, data-driven growth strategy. This package is designed for businesses and creators who are serious about building an engaged community and converting followers into customers.",
      "What sets this service apart is the holistic approach. We don't just post content; we build a narrative that resonates with your target audience while strictly adhering to platform algorithms for maximum organic reach.",
    ],
    deliverables: [
      "30-Day Content Calendar & Strategy Roadmap",
      "Competitor Analysis & Market Positioning",
      "Custom Hashtag & Keyword Strategy",
      "Bio Optimization & Link-in-Bio Setup",
      "10 High-Engagement Post Templates",
      "Engagement Playbook for Story/Reels",
    ],
  },
  {
    id: "svc-seo-audit",
    title: "Technical SEO Audit & Performance Roadmap",
    categoryId: "digital-marketing",
    subCategoryId: "seo",
    tagLabel: "SEO Services",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    gallery: withGallery(
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
    ),
    badgeText: "Top 1% Rated",
    badgeVariant: "top-rated",
    provider: PROVIDERS.growthAgency,
    price: 450,
    deliveryDays: 3,
    revisions: 1,
    packageLabel: "STANDARD PACKAGE",
    summary: [
      "A deep technical review of your website covering crawlability, page speed, indexing, structured data and on-page signals.",
      "You get a prioritised roadmap that shows what to fix first for the biggest ranking impact.",
    ],
    deliverables: [
      "Crawl & indexation report",
      "Core Web Vitals review",
      "On-page and schema audit",
      "Prioritised 90-day roadmap",
    ],
  },
  {
    id: "svc-google-ads",
    title: "Google Ads Setup & Month 1 Optimization",
    categoryId: "digital-marketing",
    subCategoryId: "seo",
    tagLabel: "Advertising",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    gallery: withGallery(
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    ),
    badgeText: "Verified Expert",
    badgeVariant: "verified",
    provider: PROVIDERS.davidChen,
    price: 850,
    deliveryDays: 5,
    revisions: 2,
    packageLabel: "STANDARD PACKAGE",
    summary: [
      "Complete Google Ads account setup with keyword research, campaign structure, ad copy and conversion tracking, followed by a month of hands-on optimization.",
      "Built to lower your cost per lead while keeping spend fully under your control.",
    ],
    deliverables: [
      "Account & conversion tracking setup",
      "Keyword research and campaign structure",
      "Ad copy for up to 3 ad groups",
      "Weekly optimization during month 1",
    ],
  },
  {
    id: "svc-seo-blog",
    title: "4 High-Engagement SEO Blog Posts",
    categoryId: "digital-marketing",
    subCategoryId: "content-marketing",
    tagLabel: "Content",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    gallery: withGallery(
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"
    ),
    provider: PROVIDERS.sarahJenkins,
    price: 220,
    deliveryDays: 4,
    revisions: 2,
    packageLabel: "STANDARD PACKAGE",
    summary: [
      "Four researched, keyword-targeted blog posts of around 1,200 words each, written in your brand voice and ready to publish.",
      "Each post includes headings, meta description and internal-link suggestions.",
    ],
    deliverables: [
      "4 posts of ~1,200 words",
      "Keyword research per post",
      "Meta titles and descriptions",
      "Plagiarism-free guarantee",
    ],
  },
  {
    id: "svc-email-automation",
    title: "Advanced Email Automation Flow Setup",
    categoryId: "digital-marketing",
    subCategoryId: "email-marketing",
    tagLabel: "Email",
    imageUrl:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=900&q=80",
    gallery: withGallery(
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=80"
    ),
    badgeText: "Verified Expert",
    badgeVariant: "verified",
    provider: PROVIDERS.marketingPros,
    price: 600,
    deliveryDays: 6,
    revisions: 2,
    packageLabel: "STANDARD PACKAGE",
    summary: [
      "Welcome, abandoned-cart and re-engagement email flows designed, written and configured inside your email platform.",
      "Includes segmentation rules and basic performance tracking so you can see results from day one.",
    ],
    deliverables: [
      "3 automated email flows",
      "Copywriting for every email",
      "Audience segmentation setup",
      "Performance tracking dashboard",
    ],
  },
  {
    id: "svc-growth-consulting",
    title: "1-on-1 Marketing Growth Consulting",
    categoryId: "digital-marketing",
    subCategoryId: "social-media",
    tagLabel: "Consulting",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    gallery: withGallery(
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
    ),
    provider: PROVIDERS.robertVance,
    price: 150,
    deliveryDays: 1,
    revisions: 0,
    packageLabel: "STANDARD PACKAGE",
    summary: [
      "A focused 60-minute video session to review your current marketing, identify quick wins and agree a clear growth plan.",
      "You receive a written action summary within 24 hours of the call.",
    ],
    deliverables: [
      "60-minute video consultation",
      "Marketing channel review",
      "Written action plan",
      "Follow-up Q&A by message",
    ],
  },
];

export const DEFAULT_SAVED_SERVICE_IDS: string[] = [
  "svc-instagram-growth",
  "svc-growth-consulting",
];

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    id: "plumbing",
    name: "Plumbing",
    description:
      "Leak repairs, installations and full plumbing diagnostics from certified plumbers across Nigeria.",
    professionalsCount: 128,
    icon: Wrench,
    subCategories: [
      { id: "leak-repair", label: "Leak Repair & Diagnosis", count: 64 },
      { id: "installation", label: "Fixture Installation", count: 38 },
    ],
  },
  {
    id: "electricians",
    name: "Electricians",
    description:
      "Wiring, inspections and electrical installations delivered by vetted electrical contractors.",
    professionalsCount: 94,
    icon: Zap,
    subCategories: [
      { id: "safety-inspection", label: "Safety Inspection", count: 41 },
      { id: "wiring", label: "Wiring & Installation", count: 29 },
    ],
  },
  {
    id: "tailoring",
    name: "Tailoring",
    description:
      "Bespoke outfits, alterations and fashion design from skilled tailors near you.",
    professionalsCount: 54,
    icon: Scissors,
    subCategories: [
      { id: "bespoke", label: "Bespoke Outfits", count: 26 },
      { id: "alterations", label: "Alterations", count: 18 },
    ],
  },
  {
    id: "carpentry",
    name: "Carpentry",
    description:
      "Custom furniture, fittings and woodwork crafted by experienced carpenters.",
    professionalsCount: 63,
    icon: Hammer,
    subCategories: [
      { id: "custom-furniture", label: "Custom Furniture", count: 33 },
      { id: "fittings", label: "Fittings & Repairs", count: 21 },
    ],
  },
  {
    id: "painting",
    name: "Painting",
    description:
      "Interior and exterior painting, finishes and decorative wall treatments.",
    professionalsCount: 79,
    icon: Paintbrush,
    subCategories: [
      { id: "interior-painting", label: "Interior Painting", count: 40 },
      { id: "exterior-painting", label: "Exterior Painting", count: 27 },
    ],
  },
  {
    id: "security",
    name: "Security",
    description:
      "CCTV, access control and home security installations from licensed providers.",
    professionalsCount: 31,
    icon: ShieldCheck,
    subCategories: [
      { id: "cctv", label: "CCTV Installation", count: 15 },
      { id: "access-control", label: "Access Control", count: 9 },
    ],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    description:
      "Boost your online presence with expert services in SEO, Social Media Management, Content Strategy, and PPC campaigns from our vetted marketing professionals.",
    professionalsCount: 86,
    icon: Megaphone,
    subCategories: [
      { id: "social-media", label: "Social Media Marketing", count: 142 },
      { id: "seo", label: "Search Engine Optimization", count: 95 },
      { id: "content-marketing", label: "Content Marketing", count: 75 },
      { id: "email-marketing", label: "Email Marketing", count: 45 },
    ],
  },
  {
    id: "interior-design",
    name: "Interior Design",
    description:
      "Design consultations, mood boards and space planning from talented interior designers.",
    professionalsCount: 42,
    icon: Sofa,
    subCategories: [
      { id: "design-consultation", label: "Design Consultation", count: 24 },
      { id: "space-planning", label: "Space Planning", count: 16 },
    ],
  },
];

export const SHOP_ALL_CATEGORY: ShopCategory = {
  id: "all",
  name: "All",
  description:
    "Browse every fixed-price service from vetted professionals across Nigeria.",
  professionalsCount: SHOP_CATEGORIES.reduce(
    (total, category) => total + category.professionalsCount,
    0
  ),
  icon: LayoutGrid,
  subCategories: SHOP_CATEGORIES.flatMap((category) => category.subCategories),
};

export const INITIAL_SHOP_FILTERS: ShopFilterState = {
  subCategories: [],
  minPrice: "",
  maxPrice: "",
  deliveryWindows: [],
  levels: [],
};

export const SHOP_SORT_OPTIONS: SelectOption[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "delivery", label: "Fastest Delivery" },
  { value: "rating", label: "Highest Rated" },
];

export const SHOP_DELIVERY_OPTIONS: ShopFilterOption<ShopDeliveryWindow>[] = [
  { id: "24h", label: "Up to 24 hours" },
  { id: "3d", label: "Up to 3 days" },
  { id: "7d", label: "Up to 7 days" },
];

export const SHOP_LEVEL_OPTIONS: ShopFilterOption<ShopProviderLevel>[] = [
  { id: "expert", label: "Expert (Top Tier)" },
  { id: "professional", label: "Professional" },
];

export const SHOP_DELIVERY_WINDOW_DAYS: Record<ShopDeliveryWindow, number> = {
  "24h": 1,
  "3d": 3,
  "7d": 7,
};

export const SHOP_TRUST_HIGHLIGHTS: ShopTrustHighlight[] = [
  {
    id: "secure-payment",
    title: "Secure Payment",
    description:
      "Funds are held safely and only released when you approve the final work.",
    icon: ShieldCheck,
    tone: "success",
  },
  {
    id: "quality-guarantee",
    title: "Quality Guarantee",
    description:
      "All professionals are vetted for excellence and consistent performance.",
    icon: BadgeCheck,
    tone: "warning",
  },
  {
    id: "direct-support",
    title: "Direct Support",
    description:
      "Dedicated account assistance for every direct order processed.",
    icon: Headset,
    tone: "info",
  },
];

export const SHOP_TOP_RATED_PROVIDERS: SpotlightProviderItem[] = [
  {
    id: "precision-painting",
    name: "Precision Painting LLC",
    category: "Commercial & Residential",
    matchText: "98% Match",
    icon: Paintbrush,
  },
  {
    id: "rapid-rescue-plumbing",
    name: "Rapid Rescue Plumbing",
    category: "24/7 Emergency Service",
    matchText: "96% Match",
    icon: Wrench,
  },
];

export const SHOP_PLATFORM_FEE_RATE = 0.03;

// ============================================================================
// PROFESSIONAL SHOP MODULE MOCK DATA
// ============================================================================

export const DEFAULT_PRO_SHOP_PROFILE: ProShopProfile = {
  shopName: "Elena Design Studio",
  badgeLabel: "PRO SELLER",
  rating: 4.9,
  reviewsCount: 128,
  avatarUrl:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
  coverBannerUrl:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
  aboutBio:
    "Award-winning residential and commercial interior design studio specializing in minimalist spatial architecture, bespoke furniture, and photorealistic 3D visualization.",
  location: "Lekki Phase 1, Lagos",
  responseTime: "Under 1 hour",
};

export const PRO_SHOP_CATEGORY_OPTIONS = [
  "Interior Design",
  "Commercial Architecture",
  "Bespoke Furniture",
  "3D Visualization",
  "Home Renovation",
  "Kitchen & Bath Design",
] as const;

export const DEFAULT_PRO_SHOP_SERVICES: ProShopServiceItem[] = [
  {
    id: "pro-svc-residential",
    title: "Residential Consultation",
    shortDescription:
      "Complete 1-on-1 interior consultation for your home redesign.",
    fullDescription:
      "Transform your living space into a modern sanctuary. This comprehensive consultation covers spatial audit, color palette direction, furniture layout recommendations, and lighting planning tailored to your lifestyle.",
    category: "Interior Design",
    packageLabel: "Standard Package",
    price: 150000,
    priceFormatted: "₦150,000",
    priceUnitLabel: "PER PROJECT",
    status: "active",
    deliveryValue: "5",
    deliveryUnit: "Days",
    deliveryLabel: "5 Business Days",
    revisionsLabel: "2 Rounds Included",
    coverImageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["#INTERIORDESIGN", "#MODERNLIVING", "#HOMEREDESIGN"],
    insights: {
      impressions: "4,281",
      orders: 12,
      avgRating: 4.9,
    },
    latestReview: {
      reviewerName: "James Cooper",
      rating: 5.0,
      comment:
        "Exceptional attention to detail. Elena really understood the minimalist vibe we wanted for our home.",
    },
  },
  {
    id: "pro-svc-commercial",
    title: "Commercial Layout Planning",
    shortDescription:
      "Optimized office layouts for productivity and brand identity.",
    fullDescription:
      "End-to-end commercial spatial architecture for modern offices, studios, and retail spaces. Includes ergonomic seating plans, circulation flow mapping, acoustic zoning, and material finish schedules.",
    category: "Commercial Architecture",
    packageLabel: "Premium Package",
    price: 450000,
    priceFormatted: "₦450,000",
    priceUnitLabel: "PER PROJECT",
    status: "active",
    deliveryValue: "14",
    deliveryUnit: "Days",
    deliveryLabel: "14 Business Days",
    revisionsLabel: "3 Rounds Included",
    coverImageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["#OFFICEDESIGN", "#COMMERCIALSPACE", "#ERGONOMICS"],
    insights: {
      impressions: "3,140",
      orders: 9,
      avgRating: 4.9,
    },
    latestReview: {
      reviewerName: "Daniel Okoro",
      rating: 5.0,
      comment:
        "Transformed our open-plan headquarters into a calm, high-output workspace. Delivered ahead of schedule.",
    },
  },
  {
    id: "pro-svc-furniture",
    title: "Bespoke Furniture Design",
    shortDescription:
      "Custom-made furniture pieces tailored to your specific space.",
    fullDescription:
      "Custom furniture CAD drawings, joinery specifications, and wood/upholstery finish selection designed to fit awkward alcoves or anchor statement dining and living rooms.",
    category: "Bespoke Furniture",
    packageLabel: "Custom Package",
    price: 280000,
    priceFormatted: "₦280,000",
    priceUnitLabel: "PER PROJECT",
    status: "inactive",
    deliveryValue: "10",
    deliveryUnit: "Days",
    deliveryLabel: "10 Business Days",
    revisionsLabel: "2 Rounds Included",
    coverImageUrl:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["#BESPOKEFURNITURE", "#WOODCRAFT", "#CUSTOMDESIGN"],
    insights: {
      impressions: "1,892",
      orders: 6,
      avgRating: 4.8,
    },
    latestReview: {
      reviewerName: "Sarah Johnson",
      rating: 5.0,
      comment:
        "Our walnut dining table and credenza drawings were spot on for our carpenter. Zero guesswork!",
    },
  },
  {
    id: "pro-svc-3d-viz",
    title: "3D Visualization Pack",
    shortDescription:
      "High-fidelity 3D renders for your architectural projects.",
    fullDescription:
      "Photorealistic 4K architectural renders with realistic daylighting, material reflections, and camera walkthrough angles so clients can visualize every detail before construction begins.",
    category: "3D Visualization",
    packageLabel: "Visual Pack",
    price: 85000,
    priceFormatted: "₦85,000",
    priceUnitLabel: "PER PROJECT",
    status: "active",
    deliveryValue: "5",
    deliveryUnit: "Days",
    deliveryLabel: "5 Business Days",
    revisionsLabel: "3 Rounds Included",
    coverImageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["#3DRENDERING", "#ARCHITECTURE", "#LUXURYHOME"],
    insights: {
      impressions: "5,104",
      orders: 18,
      avgRating: 5.0,
    },
    latestReview: {
      reviewerName: "James Cooper",
      rating: 5.0,
      comment:
        "The renders looked indistinguishable from real photography. Made investor sign-off effortless.",
    },
  },
  {
    id: "pro-svc-modern-kitchen",
    title: "Modern Kitchen Design",
    shortDescription:
      "Transform your kitchen into a modern ergonomic culinary masterpiece.",
    fullDescription:
      "Transform your kitchen into a modern masterpiece. This comprehensive service includes 3D visualization, material selection, cabinet layout optimization, and lighting consultation. We focus on ergonomic flow and premium aesthetics to ensure your culinary space is both functional and beautiful.",
    category: "Interior Design",
    packageLabel: "Premium Package",
    price: 850000,
    priceFormatted: "₦850,000.00",
    priceUnitLabel: "PER PROJECT",
    status: "active",
    deliveryValue: "14",
    deliveryUnit: "Days",
    deliveryLabel: "14 Business Days",
    revisionsLabel: "3 Rounds Included",
    coverImageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["#KITCHENDESIGN", "#MODERNINTERIOR", "#LUXURYHOME"],
    insights: {
      impressions: "4,281",
      orders: 12,
      avgRating: 4.9,
    },
    latestReview: {
      reviewerName: "James Cooper",
      rating: 5.0,
      comment:
        "Exceptional attention to detail. Alex really understood the minimalist vibe we wanted for our home.",
    },
  },
];



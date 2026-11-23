import type {
  ConsumerContactPreference,
  ConsumerProfileData,
  ProfessionalProfileData,
  ProfilePhotoGuidelineItem,
  ProfileServiceItem,
  ProfilePortfolioItem,
  ProfileReviewItem,
} from "@/components/profile/types";
import { SEARCH_PROFESSIONALS_DATA } from "@/features/consumer/search/data";
import { DEFAULT_FEATURED_PROFESSIONALS } from "@/features/consumer/home/data";
import { DEFAULT_SHOP_SERVICES } from "@/features/shop/data";
import { formatDelivery, findShopCategoryById } from "@/features/shop/services/shopHelpers";

export const PROFESSIONAL_CATEGORY_OPTIONS: readonly string[] = [
  "Interior Design",
  "Electrical Engineering",
  "Plumbing & Piping",
  "Renovation & Remodeling",
  "Architecture",
  "HVAC & Cooling",
  "Metalwork & Fabrication",
  "Smart Home Automation",
  "Cleaning & Maintenance",
];

export const BUSINESS_CATEGORY_OPTIONS: readonly string[] = [
  "Interior Architecture & Renovation",
  "Commercial Electrical Systems",
  "Architecture & Urban Planning",
  "Facility Management",
  "Civil & Structural Engineering",
  "MEP & HVAC Contracting",
  "Design & Build Studio",
  "Commercial Cleaning Services",
];

export const NIGERIAN_LOCATION_PRESETS: readonly string[] = [
  "Lekki Phase 1, Lagos",
  "Victoria Island, Lagos",
  "Ikoyi, Lagos",
  "Ikeja GRA, Lagos",
  "Wuse II, Abuja",
  "Maitama, Abuja",
  "GRA, Port Harcourt",
  "Bodija, Ibadan",
];

export const PROFILE_PHOTO_GUIDELINES: readonly ProfilePhotoGuidelineItem[] = [
  {
    id: "tech",
    title: "Technical Requirements",
    description:
      "Accepted formats: JPG, PNG. Minimum size: 400x400px. Maximum file size: 5MB.",
    icon: "requirements",
  },
  {
    id: "safety",
    title: "Trust & Safety",
    description:
      "Photos that do not depict a real person or contain inappropriate content will be removed.",
    icon: "safety",
  },
  {
    id: "quality",
    title: "Professional Quality",
    description:
      "Ensure good lighting and a clear view of your face. Avoid busy backgrounds or filters.",
    icon: "quality",
  },
  {
    id: "visibility",
    title: "Visibility",
    description:
      "Your profile photo is public and helps clients identify you during consultations.",
    icon: "visibility",
  },
];

export const MOCK_PROFESSIONAL_PROFILES: Record<string, ProfessionalProfileData> = {
  "elena-rodriguez": {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    roleTitle: "Lead Interior Designer at UrbanVibe",
    category: "Interior Design",
    verificationLabel: "INDIVIDUAL VERIFIED",
    verificationType: "individual",
    location: "Lekki Phase 1, Lagos",
    rating: 4.9,
    reviewCount: 142,
    experienceLabel: "8 Years Exp.",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Passionate interior designer specializing in modern minimalist and industrial aesthetics. I believe in creating spaces that not only look stunning but also enhance the quality of life for the people who inhabit them. With over 8 years of experience in both residential and commercial projects.",
    skills: [
      "3D Visualization",
      "Sustainable Materials",
      "Residential",
      "AutoCAD",
    ],
    responseTimeText: "2 hours",
    services: [
      {
        id: "residential-consultation",
        title: "Residential Consultation",
        description:
          "Complete floor planning, material selection, and 3D visualization for your home.",
        tags: ["2-3 Weeks", "Virtual/On-site"],
        categoryTags: ["ON-SITE", "RESIDENTIAL"],
        deliveryTime: "14–21 Days Delivery",
        revisionsLabel: "3 Revisions Included",
        priceLabel: "STARTING FROM",
        priceValue: "₦150,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "pie-chart",
        iconVariant: "info",
        imageUrl:
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "commercial-space-styling",
        title: "Commercial Space Styling",
        description:
          "Professional office and retail store interior branding and ergonomic space planning.",
        tags: ["Custom Timeline", "Project-based"],
        categoryTags: ["ON-SITE", "COMMERCIAL"],
        deliveryTime: "Custom Timeline",
        revisionsLabel: "Milestone Reviews Included",
        priceLabel: "PRICING",
        priceValue: "Custom Quote",
        ctaLabel: "REQUEST QUOTE",
        ctaVariant: "outline",
        iconName: "store",
        iconVariant: "warning",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "full-interior-design-consultation",
        title: "Full Interior Design Consultation",
        description:
          "Comprehensive design service including space planning, mood boards, material selection, and 3D visualization. Perfect for homeowners looking for a professional touch from concept to completion.",
        tags: ["14-21 Days Delivery", "3 Revisions Included"],
        categoryTags: ["ON-SITE", "RESIDENTIAL"],
        deliveryTime: "14–21 Days Delivery",
        revisionsLabel: "3 Revisions Included",
        priceLabel: "STARTING AT",
        priceValue: "₦450,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "briefcase",
        iconVariant: "primary",
        imageUrl:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "virtual-space-styling",
        title: "Virtual Space Styling & Color Palette",
        description:
          "Quick virtual consultation for refreshes. Includes a custom color palette, furniture arrangement suggestions, and a shopping list for accessories.",
        tags: ["3-5 Days Delivery", "1 Revision Included"],
        categoryTags: ["REMOTE", "EXPRESS"],
        deliveryTime: "3–5 Days Delivery",
        revisionsLabel: "1 Revision Included",
        priceLabel: "STARTING AT",
        priceValue: "₦120,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "sparkles",
        iconVariant: "success",
        imageUrl:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "office-workspace-optimization",
        title: "Office Workspace Optimization",
        description:
          "Boost productivity with a professional workspace layout. Includes ergonomic assessment, lighting design, and branding integration for small to medium offices.",
        tags: ["30 Days Delivery", "5 Revisions Included"],
        categoryTags: ["ON-SITE", "COMMERCIAL"],
        deliveryTime: "30 Days Delivery",
        revisionsLabel: "5 Revisions Included",
        priceLabel: "STARTING AT",
        priceValue: "₦800,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "store",
        iconVariant: "info",
        imageUrl:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80",
      },
    ],
    portfolio: [
      {
        id: "minimalist-penthouse",
        title: "The Minimalist Penthouse",
        category: "Residential",
        filterCategory: "Residential",
        dateLabel: "FEB 2026",
        createdAtISO: "2026-02-18",
        description:
          "A complete renovation of a 3,000 sq ft penthouse in Lekki, focusing on natural light and open-concept living with premium sustainable materials.",
        tags: ["3D MODELING", "SOURCING"],
        imageUrl:
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "hub-x-workspace",
        title: "Hub-X Tech Workspace",
        category: "Commercial",
        filterCategory: "Commercial",
        dateLabel: "JAN 2026",
        createdAtISO: "2026-01-20",
        description:
          "Designing a collaborative environment for a high-growth tech startup. Focused on ergonomic workstations and vibrant breakout zones.",
        tags: ["BRANDING", "LAYOUT"],
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "industrial-loft-concept",
        title: "Industrial Loft Concept",
        category: "Residential",
        filterCategory: "Residential",
        dateLabel: "DEC 2025",
        createdAtISO: "2025-12-12",
        description:
          "Transforming an old warehouse space into a luxury living area. Exposed brick, metal accents, and reclaimed wood integration.",
        tags: ["INDUSTRIAL", "LIGHTING"],
        imageUrl:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "nordic-coffee-house",
        title: "Nordic Coffee House",
        category: "Commercial",
        filterCategory: "Minimalist",
        dateLabel: "NOV 2025",
        createdAtISO: "2025-11-15",
        description:
          "A cozy, minimalist coffee shop design in the heart of Victoria Island. Scandinavian inspired furniture and natural oak palette.",
        tags: ["RETAIL", "FURNITURE"],
        imageUrl:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "ikoyi-courtyard-villa",
        title: "Ikoyi Courtyard Villa",
        category: "Minimalist",
        filterCategory: "Minimalist",
        dateLabel: "OCT 2025",
        createdAtISO: "2025-10-08",
        description:
          "Calm monochrome living suite featuring bespoke cabinetry, acoustic wall panelling, and warm recessed architectural lighting.",
        tags: ["MINIMALIST", "LIGHTING"],
        imageUrl:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "lekki-coastal-retreat",
        title: "Lekki Coastal Retreat",
        category: "Residential",
        filterCategory: "Residential",
        dateLabel: "SEP 2025",
        createdAtISO: "2025-09-21",
        description:
          "Airy oceanfront apartment redesign pairing moisture-resistant hardwoods, linen upholstery, and custom terrazzo finishes.",
        tags: ["RESIDENTIAL", "SOURCING"],
        imageUrl:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 92 },
      { stars: 4, percentage: 6 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 },
    ],
    reviews: [
      {
        id: "review-sarah-j",
        authorName: "Sarah Johnson",
        authorRole: "Homeowner",
        timeAgo: "2 weeks ago",
        dateLabel: "May 18, 2026",
        createdAtISO: "2026-05-18",
        verifiedPurchase: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        helpfulCount: 15,
        comment:
          "Elena turned our outdated living room into a contemporary masterpiece. Her attention to detail and ability to understand our personal style was remarkable. The project was delivered on time and within the budget we discussed. Highly recommended!",
        professionalResponse:
          "Thank you so much Sarah! It was an absolute pleasure working with you to bring your vision to life.",
        professionalResponseDate: "May 19, 2026",
      },
      {
        id: "review-daniel-o",
        authorName: "Daniel Okoro",
        authorRole: "Hub-X Founder",
        timeAgo: "1 month ago",
        dateLabel: "May 16, 2026",
        createdAtISO: "2026-05-16",
        verifiedPurchase: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        helpfulCount: 9,
        comment:
          "Exceptional eye for commercial branding through interior design. Elena managed our office renovation with extreme professionalism. The new layout has significantly improved our team's workflow.",
      },
      {
        id: "review-marcus-t",
        authorName: "Marcus Thompson",
        authorRole: "Verified Purchase",
        timeAgo: "1 month ago",
        dateLabel: "May 14, 2026",
        createdAtISO: "2026-05-14",
        verifiedPurchase: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        helpfulCount: 12,
        comment:
          "Elena was incredible to work with. She really listened to our needs for the office redesign and came up with a concept that balanced professional aesthetics with a cozy atmosphere. The 3D visualizations were spot on!",
        professionalResponse:
          "Thank you so much, Marcus! It was a pleasure working on your workspace. I'm so glad the final result is helping the team's productivity.",
        professionalResponseDate: "May 15, 2026",
      },
      {
        id: "review-sarah-jenkins",
        authorName: "Sarah Jenkins",
        authorRole: "Verified Purchase",
        timeAgo: "2 months ago",
        dateLabel: "Apr 28, 2026",
        createdAtISO: "2026-04-28",
        verifiedPurchase: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        helpfulCount: 4,
        comment:
          "Great virtual consultation. The color palette she suggested really opened up our small living room. Deducted half a star only because the shopping list had one item that was out of stock, but Elena quickly provided an alternative.",
        photos: [
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=400&q=80",
        ],
      },
      {
        id: "review-chidi-n",
        authorName: "Chidi Nwosu",
        authorRole: "Property Developer",
        timeAgo: "3 months ago",
        dateLabel: "Apr 10, 2026",
        createdAtISO: "2026-04-10",
        verifiedPurchase: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
        rating: 4,
        helpfulCount: 3,
        comment:
          "Very organized procurement schedule and crisp AutoCAD drawings for our contractors in Lekki. Would gladly hire Elena's studio again.",
      },
      {
        id: "review-amina-b",
        authorName: "Amina Bello",
        authorRole: "Boutique Owner",
        timeAgo: "3 months ago",
        dateLabel: "Mar 24, 2026",
        createdAtISO: "2026-03-24",
        verifiedPurchase: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        helpfulCount: 7,
        comment:
          "Customers compliment our Victoria Island showroom every single day since the redesign. Lighting placement completely elevated our product displays.",
        professionalResponse:
          "Glad to hear the showroom lighting is making such a strong impression for your brand, Amina!",
        professionalResponseDate: "Mar 25, 2026",
      },
    ],
    quickActions: [
      "Is this service still available?",
      "Can we do a virtual meeting?",
      "Send project brief",
    ],
  },

  "tunde-balogun": {
    id: "tunde-balogun",
    name: "Tunde Balogun",
    roleTitle: "Certified Senior Electrician • 9 Years Exp.",
    verificationLabel: "INDIVIDUAL VERIFIED",
    verificationType: "individual",
    location: "Lekki Phase 1, Lagos",
    rating: 4.2,
    reviewCount: 62,
    experienceLabel: "9 Years Exp.",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    bio: "Certified high & low voltage electrical engineer specializing in modern residential conduit installations, smart home distribution boards, and backup inverter systems. Committed to fire safety codes, clean conduit cable management, and prompt emergency response.",
    responseTimeText: "Under 1 hour",
    services: [
      {
        id: "electrical-wiring-audit",
        title: "Full House Conduit Wiring & Safety Audit",
        description:
          "Complete conduit piping, circuit breaker load balancing, earthing installation, and electrical hazard safety inspections.",
        tags: ["1-2 Weeks", "On-site Assessment"],
        priceLabel: "STARTING FROM",
        priceValue: "₦120,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "briefcase",
        iconVariant: "info",
      },
      {
        id: "inverter-solar-integration",
        title: "Inverter & Hybrid Solar Setup",
        description:
          "Sizing, wiring, and installation of pure sine wave inverters, lithium battery banks, and changeover switchboards.",
        tags: ["1-3 Days", "Hardware Warranty"],
        priceLabel: "ESTIMATE",
        priceValue: "₦85,000",
        ctaLabel: "REQUEST QUOTE",
        ctaVariant: "outline",
        iconName: "sparkles",
        iconVariant: "warning",
      },
      {
        id: "emergency-fault-diagnostics",
        title: "Emergency Fault Diagnostics & Short Circuit Repair",
        description:
          "Rapid diagnosis and resolution of circuit tripping, burnt breakers, power surges, and phase imbalance.",
        tags: ["Same Day", "24/7 Available"],
        priceLabel: "FLAT RATE",
        priceValue: "₦25,000",
        ctaLabel: "CALL OUT",
        ctaVariant: "default",
        iconName: "pie-chart",
        iconVariant: "primary",
      },
    ],
    portfolio: [
      {
        id: "smart-distribution-panel",
        title: "Lekki Phase 1 Smart Panel Retrofit",
        category: "Electrical Distribution",
        imageUrl:
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "inverter-bank-wiring",
        title: "10kVA Commercial Inverter Bank",
        category: "Clean Energy Backup",
        imageUrl:
          "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "recessed-lighting-wiring",
        title: "Architectural Ceiling Conduit Wiring",
        category: "Residential Lighting",
        imageUrl:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 68 },
      { stars: 4, percentage: 22 },
      { stars: 3, percentage: 10 },
    ],
    reviews: [
      {
        id: "review-babatunde-a",
        authorName: "Babatunde Alabi",
        authorRole: "Duplex Owner, Lekki",
        timeAgo: "3 days ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        comment:
          "Tunde diagnosed an electrical tripping problem that three other electricians couldn't fix. Clean conduit work and very polite.",
        professionalResponse:
          "Glad to have sorted the earthing issue for you Babatunde. Safe power always!",
      },
      {
        id: "review-kemi-o",
        authorName: "Kemi Osuntokun",
        authorRole: "Architect",
        timeAgo: "2 weeks ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        rating: 4,
        comment:
          "Very dependable electrician. Handled the entire sub-panel wiring on our renovation on time.",
      },
    ],
    quickActions: [
      "Are you available for an emergency visit?",
      "Can you inspect my distribution board?",
      "Can I get a quote for wiring my house?",
    ],
  },

  "voltsmart-solutions": {
    id: "voltsmart-solutions",
    name: "VoltSmart Solutions",
    roleTitle: "Commercial Electrical Systems & Smart Automation",
    verificationLabel: "CORPORATE PARTNER",
    verificationType: "company",
    location: "Victoria Island, Lagos",
    rating: 5.0,
    reviewCount: 98,
    experienceLabel: "14 Years in Business",
    avatarUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80",
    bio: "VoltSmart Solutions is a premier corporate engineering firm delivering industrial electrical reticulation, commercial facility energy audits, transformer sub-station maintenance, and integrated building automation systems throughout West Africa.",
    responseTimeText: "Under 30 mins",
    services: [
      {
        id: "commercial-power-reticulation",
        title: "Industrial & Commercial Power Reticulation",
        description:
          "High capacity three-phase wiring, cable trays, busbar trunking, and power distribution boards for corporate headquarters.",
        tags: ["Turnkey Project", "SLA Included"],
        priceLabel: "PRICING",
        priceValue: "Custom Contract",
        ctaLabel: "REQUEST PROPOSAL",
        ctaVariant: "default",
        iconName: "briefcase",
        iconVariant: "info",
      },
      {
        id: "facility-energy-audit",
        title: "Comprehensive Energy & Power Quality Audit",
        description:
          "Harmonic distortion analysis, thermographic thermal imaging scans, and generator-inverter load optimization.",
        tags: ["1-2 Weeks", "Certified Engineers"],
        priceLabel: "STARTING FROM",
        priceValue: "₦350,000",
        ctaLabel: "BOOK AUDIT",
        ctaVariant: "outline",
        iconName: "pie-chart",
        iconVariant: "success",
      },
    ],
    portfolio: [
      {
        id: "vi-tower-automation",
        title: "VI Corporate Tower Intelligent Automation",
        category: "Commercial Electrical",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "data-center-power",
        title: "Tier III Data Center Dual-Fed Substation",
        category: "Critical Infrastructure",
        imageUrl:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "factory-switchgear",
        title: "Industrial Switchgear & PLC Panels",
        category: "Heavy Industry",
        imageUrl:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 98 },
      { stars: 4, percentage: 2 },
    ],
    reviews: [
      {
        id: "review-zenith-fac",
        authorName: "Chinedu Eze",
        authorRole: "Facilities Director, VI",
        timeAgo: "1 week ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        comment:
          "VoltSmart has managed our 8-story commercial facility electrical maintenance for two years with zero unplanned downtime. Elite team.",
      },
    ],
    quickActions: [
      "Request a corporate procurement meeting",
      "Send RFP for commercial facility wiring",
      "Request industrial emergency support",
    ],
  },

  "marcus-thorne": {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    roleTitle: "Master Artisan & Custom Woodcraft",
    verificationLabel: "INDIVIDUAL VERIFIED",
    verificationType: "individual",
    location: "Yaba, Lagos",
    rating: 3.7,
    reviewCount: 230,
    experienceLabel: "12 Years Exp.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Passionate woodworker and furniture designer creating bespoke cabinetry, hardwood dining tables, acoustic fluted panels, and architectural joinery. Working with seasoned iroko, teak, mahogany, and premium imported oak.",
    responseTimeText: "3 hours",
    services: [
      {
        id: "bespoke-cabinetry",
        title: "Custom Kitchen & Wardrobe Cabinetry",
        description:
          "Precision-crafted soft-close cabinets, moisture-resistant marine board carcasses, and exquisite hardwood veneer facings.",
        tags: ["3-4 Weeks", "Custom Fitting"],
        priceLabel: "STARTING FROM",
        priceValue: "₦280,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "store",
        iconVariant: "info",
      },
      {
        id: "hardwood-dining-tables",
        title: "Handcrafted Solid Hardwood Tables",
        description:
          "Statement live-edge and Scandinavian style dining sets built to last for generations.",
        tags: ["2 Weeks", "Nationwide Delivery"],
        priceLabel: "PRICE RANGE",
        priceValue: "₦180,000 - ₦650,000",
        ctaLabel: "CUSTOM ORDER",
        ctaVariant: "outline",
        iconName: "sparkles",
        iconVariant: "warning",
      },
    ],
    portfolio: [
      {
        id: "fluted-wall-panelling",
        title: "Acoustic Fluted Teak Wall Panelling",
        category: "Architectural Woodwork",
        imageUrl:
          "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "iroko-dining-table",
        title: "Live Edge Iroko 8-Seater Table",
        category: "Furniture Design",
        imageUrl:
          "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "minimalist-oak-closet",
        title: "Walk-in Dressing Room Cabinetry",
        category: "Residential Cabinetry",
        imageUrl:
          "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 52 },
      { stars: 4, percentage: 28 },
      { stars: 3, percentage: 14 },
      { stars: 2, percentage: 6 },
    ],
    reviews: [
      {
        id: "review-fola-k",
        authorName: "Fola Kuti",
        authorRole: "Interior Decorator",
        timeAgo: "1 month ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        comment:
          "Marcus built the dining table of my dreams. The wood grain and finishing oil are world-class.",
      },
    ],
    quickActions: [
      "Can you build custom furniture to my dimensions?",
      "Do you provide on-site measurement?",
      "What wood species do you work with?",
    ],
  },

  "chidi-okonkwo": {
    id: "chidi-okonkwo",
    name: "Chidi Okonkwo",
    roleTitle: "Master Plumber & Pipe Diagnostics • 12 Years Exp.",
    verificationLabel: "INDIVIDUAL VERIFIED",
    verificationType: "individual",
    location: "Lekki Phase 1, Lagos",
    rating: 4.8,
    reviewCount: 118,
    experienceLabel: "12 Years Exp.",
    avatarUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
    bio: "Master licensed plumber providing complete pipe reticulation, borehole water treatment plant installation, sewage piping, high-pressure booster pump calibration, and non-destructive ultrasonic leak detection.",
    responseTimeText: "Under 1 hour",
    services: [
      {
        id: "leak-detection",
        title: "Ultrasonic Concealed Pipe Leak Detection",
        description:
          "Find hidden wall and floor pipe leaks without tearing down your tiles or concrete walls.",
        tags: ["Same Day", "Non-Destructive"],
        priceLabel: "FLAT RATE",
        priceValue: "₦45,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "briefcase",
        iconVariant: "info",
      },
      {
        id: "water-treatment-system",
        title: "Borehole Filtration & Reverse Osmosis Plant",
        description:
          "Multi-stage sand, carbon, and iron removal filtration systems for crystal clear drinking water.",
        tags: ["3-5 Days", "Water Lab Tested"],
        priceLabel: "ESTIMATE",
        priceValue: "₦220,000",
        ctaLabel: "GET QUOTE",
        ctaVariant: "outline",
        iconName: "sparkles",
        iconVariant: "warning",
      },
    ],
    portfolio: [
      {
        id: "filtration-plant-project",
        title: "Duplex 3-Stage Filtration Plant",
        category: "Water Treatment",
        imageUrl:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "booster-pump-manifold",
        title: "Multi-Pump Inverter Pressure Manifold",
        category: "Hydraulic Systems",
        imageUrl:
          "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 88 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 2 },
    ],
    reviews: [
      {
        id: "review-tony-b",
        authorName: "Tony Briggs",
        authorRole: "Resident, Lekki",
        timeAgo: "1 week ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        comment:
          "Chidi sorted out our borehole water brownish odor within 48 hours. The water is now completely odorless and clear.",
      },
    ],
    quickActions: [
      "Can you fix an emergency water leak today?",
      "Can I get a quotation for water treatment?",
      "Are you available for plumbing inspection?",
    ],
  },

  "titan-metalworks": {
    id: "titan-metalworks",
    name: "Titan Metalworks",
    roleTitle: "Structural Welding & Iron Fabrication",
    verificationLabel: "CORPORATE PARTNER",
    verificationType: "company",
    location: "Ikeja, Lagos",
    rating: 3.4,
    reviewCount: 42,
    experienceLabel: "10 Years in Business",
    avatarUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
    bio: "Titan Metalworks specializes in heavy structural steel construction, automated cantilever sliding gates, stainless steel glass railings, security doors, and industrial warehouse roof trusses across Nigeria.",
    responseTimeText: "4 hours",
    services: [
      {
        id: "automated-gates",
        title: "Automated Laser-Cut Cantilever Gates",
        description:
          "Bespoke laser-cut patterns, heavy-duty anti-rust powder coating, and smart motor automation with remote and smartphone controls.",
        tags: ["2 Weeks", "3 Years Warranty"],
        priceLabel: "STARTING FROM",
        priceValue: "₦350,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "briefcase",
        iconVariant: "info",
      },
      {
        id: "steel-trusses-fabrication",
        title: "Structural Steel Roof Trusses",
        description:
          "Engineered I-beams, hollow sections, and hot-rolled structural steel erection for warehouses and residences.",
        tags: ["Project-based", "Engineer Certified"],
        priceLabel: "PRICING",
        priceValue: "Custom Estimate",
        ctaLabel: "GET QUOTE",
        ctaVariant: "outline",
        iconName: "store",
        iconVariant: "warning",
      },
    ],
    portfolio: [
      {
        id: "laser-cut-gate",
        title: "Modern Geometric Cantilever Gate",
        category: "Architectural Metalwork",
        imageUrl:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "steel-frame-warehouse",
        title: "Ikeja Industrial Portal Frame",
        category: "Heavy Construction",
        imageUrl:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 42 },
      { stars: 4, percentage: 30 },
      { stars: 3, percentage: 18 },
      { stars: 2, percentage: 10 },
    ],
    reviews: [
      {
        id: "review-greg-o",
        authorName: "Gregory Okafor",
        authorRole: "Contractor",
        timeAgo: "2 weeks ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        rating: 4,
        comment:
          "Solid gate fabrication. Delivery had a 2-day delay, but the build quality and welding beads are exceptional.",
      },
    ],
    quickActions: [
      "Can I get a quote for automated gates?",
      "Do you fabricate industrial steel structures?",
      "Can you inspect my building site?",
    ],
  },

  "urbanvibe-design-studio": {
    id: "urbanvibe-design-studio",
    name: "UrbanVibe Design Studio",
    roleTitle: "Interior Architecture & Renovation",
    category: "Interior Architecture & Renovation",
    verificationLabel: "BUSINESS VERIFIED",
    verificationType: "company",
    location: "Victoria Island, Lagos",
    rating: 4.8,
    reviewCount: 412,
    experienceLabel: "6+ Years Active",
    avatarUrl: "",
    bio: "UrbanVibe Design Studio is a premier multi-disciplinary design firm founded in 2018. We specialize in transforming commercial and high-end residential spaces through innovative spatial planning and sustainable material sourcing. Our philosophy centers on \"Functional Elegance,\" ensuring every square foot serves a purpose while maintaining a sophisticated aesthetic.",
    skills: [
      "3D Visualization",
      "Sustainable Materials",
      "Residential",
      "AutoCAD",
    ],
    responseTimeText: "Under 1 hour",
    companyDetails: {
      coverImageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
      logoMonogram: "UV",
      teamStrength: "24 Professionals",
      yearsActive: "6+ Years",
      projectsCompleted: "120+ Completed",
      activeCoverageLabel: "ACTIVE COVERAGE: LAGOS STATE",
      hqLabel: "HQ: VICTORIA ISLAND",
      coverageZones: [
        "Victoria Island",
        "Lekki Phase 1",
        "Ikoyi",
        "Ikeja GRA",
        "Yaba",
      ],
      cacNumber: "RC: 1489023-X",
      cacStatusLabel: "ACTIVE & VERIFIED",
      trustChecks: [
        { id: "identity", label: "Identity Check", verified: true },
        { id: "address", label: "Address Proof", verified: true },
        { id: "license", label: "Professional License", verified: true },
      ],
      operatingHours: [
        { day: "Monday - Friday", hours: "08:00 - 18:00" },
        { day: "Saturday", hours: "10:00 - 16:00" },
        { day: "Sunday", hours: "Closed", isClosed: true },
      ],
      isCurrentlyOpen: true,
      socialLinks: {
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        facebook: "https://facebook.com",
        website: "https://mykostoma.com",
      },
    },
    services: [
      {
        id: "uv-full-interior-design",
        title: "Full Interior Design Consultation",
        description:
          "Comprehensive design service including space planning, mood boards, material selection, and 3D visualization. Perfect for homeowners looking for a professional touch from concept to completion.",
        tags: ["14-21 Days Delivery", "3 Revisions Included"],
        categoryTags: ["ON-SITE", "RESIDENTIAL"],
        deliveryTime: "14–21 Days Delivery",
        revisionsLabel: "3 Revisions Included",
        priceLabel: "STARTING AT",
        priceValue: "₦450,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "briefcase",
        iconVariant: "primary",
        imageUrl:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "uv-virtual-space-styling",
        title: "Virtual Space Styling & Color Palette",
        description:
          "Quick virtual consultation for refreshes. Includes a custom color palette, furniture arrangement suggestions, and a shopping list for accessories.",
        tags: ["3-5 Days Delivery", "1 Revision Included"],
        categoryTags: ["REMOTE", "EXPRESS"],
        deliveryTime: "3–5 Days Delivery",
        revisionsLabel: "1 Revision Included",
        priceLabel: "STARTING AT",
        priceValue: "₦120,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "sparkles",
        iconVariant: "success",
        imageUrl:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "uv-office-workspace-optimization",
        title: "Office Workspace Optimization",
        description:
          "Boost productivity with a professional workspace layout. Includes ergonomic assessment, lighting design, and branding integration for small to medium offices.",
        tags: ["30 Days Delivery", "5 Revisions Included"],
        categoryTags: ["ON-SITE", "COMMERCIAL"],
        deliveryTime: "30 Days Delivery",
        revisionsLabel: "5 Revisions Included",
        priceLabel: "STARTING AT",
        priceValue: "₦800,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "store",
        iconVariant: "info",
        imageUrl:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80",
      },
    ],
    portfolio: [
      {
        id: "uv-minimalist-penthouse",
        title: "The Minimalist Penthouse",
        category: "Residential",
        filterCategory: "Residential",
        dateLabel: "FEB 2026",
        createdAtISO: "2026-02-18",
        description:
          "A complete renovation of a 3,000 sq ft penthouse in Lekki, focusing on natural light and open-concept living with premium sustainable materials.",
        tags: ["3D MODELING", "SOURCING"],
        imageUrl:
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "uv-hub-x-workspace",
        title: "Hub-X Tech Workspace",
        category: "Commercial",
        filterCategory: "Commercial",
        dateLabel: "JAN 2026",
        createdAtISO: "2026-01-20",
        description:
          "Designing a collaborative environment for a high-growth tech startup. Focused on ergonomic workstations and vibrant breakout zones.",
        tags: ["BRANDING", "LAYOUT"],
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "uv-industrial-loft-concept",
        title: "Industrial Loft Concept",
        category: "Residential",
        filterCategory: "Residential",
        dateLabel: "DEC 2025",
        createdAtISO: "2025-12-12",
        description:
          "Transforming an old warehouse space into a luxury living area. Exposed brick, metal accents, and reclaimed wood integration.",
        tags: ["INDUSTRIAL", "LIGHTING"],
        imageUrl:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "uv-nordic-coffee-house",
        title: "Nordic Coffee House",
        category: "Commercial",
        filterCategory: "Minimalist",
        dateLabel: "NOV 2025",
        createdAtISO: "2025-11-15",
        description:
          "A cozy, minimalist coffee shop design in the heart of Victoria Island. Scandinavian inspired furniture and palette.",
        tags: ["RETAIL", "FURNITURE"],
        imageUrl:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "uv-ikoyi-boardroom",
        title: "Ikoyi Executive Boardroom",
        category: "Commercial",
        filterCategory: "Minimalist",
        dateLabel: "OCT 2025",
        createdAtISO: "2025-10-09",
        description:
          "Acoustic walnut panelling, custom conference joinery, and integrated video-conferencing lighting for a fintech headquarters.",
        tags: ["ACOUSTICS", "COMMERCIAL"],
        imageUrl:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 92 },
      { stars: 4, percentage: 6 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 },
    ],
    reviews: [
      {
        id: "uv-review-marcus",
        authorName: "Marcus Thompson",
        authorRole: "Verified Purchase",
        timeAgo: "2 weeks ago",
        dateLabel: "May 14, 2026",
        createdAtISO: "2026-05-14",
        verifiedPurchase: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        helpfulCount: 12,
        comment:
          "UrbanVibe Design Studio was incredible to work with. The team really listened to our needs for the office redesign and came up with a concept that balanced professional aesthetics with a cozy atmosphere. The 3D visualizations were spot on!",
        professionalResponse:
          "Thank you so much, Marcus! It was a pleasure working on your workspace. We're so glad the final result is helping the team's productivity.",
        professionalResponseDate: "May 15, 2026",
      },
      {
        id: "uv-review-sarah",
        authorName: "Sarah Jenkins",
        authorRole: "Verified Purchase",
        timeAgo: "1 month ago",
        dateLabel: "Apr 28, 2026",
        createdAtISO: "2026-04-28",
        verifiedPurchase: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        helpfulCount: 4,
        comment:
          "Great virtual consultation. The color palette the team suggested really opened up our small living room. Deducted half a star only because the shopping list had one item that was out of stock, but UrbanVibe Design Studio quickly provided an alternative.",
        photos: [
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=400&q=80",
        ],
      },
      {
        id: "uv-review-tolu",
        authorName: "Tolu Adeyemi",
        authorRole: "Operations Lead, Ikoyi",
        timeAgo: "2 months ago",
        dateLabel: "Apr 05, 2026",
        createdAtISO: "2026-04-05",
        verifiedPurchase: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        helpfulCount: 6,
        comment:
          "Delivered our Victoria Island flagship showroom ahead of launch deadline with flawless millwork supervision.",
      },
      {
        id: "uv-review-ngozi",
        authorName: "Ngozi Okafor",
        authorRole: "Founder, Atelier NO",
        timeAgo: "3 months ago",
        dateLabel: "Mar 19, 2026",
        createdAtISO: "2026-03-19",
        verifiedPurchase: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        rating: 4,
        helpfulCount: 2,
        comment:
          "Detailed BOQs and material boards made contractor coordination painless for our studio fit-out.",
      },
      {
        id: "uv-review-kemi",
        authorName: "Kemi Adewale",
        authorRole: "Verified Purchase",
        timeAgo: "3 months ago",
        dateLabel: "Mar 02, 2026",
        createdAtISO: "2026-03-02",
        verifiedPurchase: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        helpfulCount: 9,
        comment:
          "Their spatial planning completely transformed our Lekki headquarters reception and breakout lounge.",
        professionalResponse:
          "Thank you Kemi! Wishing your team continued growth in the new space.",
        professionalResponseDate: "Mar 04, 2026",
      },
    ],
    quickActions: [
      "Can we schedule a commercial site inspection?",
      "What is your turnaround for a full office fit-out?",
      "Send our architectural brief",
    ],
  },
};

export const DEFAULT_PROFESSIONAL_PROFILE: ProfessionalProfileData =
  MOCK_PROFESSIONAL_PROFILES["elena-rodriguez"];

export const DEFAULT_COMPANY_PROFILE: ProfessionalProfileData =
  MOCK_PROFESSIONAL_PROFILES["urbanvibe-design-studio"];

export const CONSUMER_SERVICE_INTEREST_OPTIONS: readonly string[] = [
  "Interior Design",
  "Electrical",
  "Plumbing",
  "Home Cleaning",
  "HVAC & Cooling",
  "Painting",
  "Renovation",
  "Smart Home",
  "Carpentry",
  "Event Planning",
];

export const CONSUMER_CONTACT_PREFERENCE_OPTIONS: readonly {
  value: ConsumerContactPreference;
  label: string;
}[] = [
  { value: "in-app", label: "In-App Messages" },
  { value: "phone", label: "Phone Call" },
  { value: "whatsapp", label: "WhatsApp / SMS" },
  { value: "email", label: "Email" },
];

export const DEFAULT_CONSUMER_PROFILE: ConsumerProfileData = {
  id: "consumer-sarah-jenkins",
  fullName: "Sarah Jenkins",
  email: "sarah.jenkins@example.com",
  phone: "+234 803 452 8910",
  location: "Lekki Phase 1, Lagos",
  memberSince: "Member since Jan 2025",
  avatarUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  bio: "Homeowner in Lekki Phase 1 managing periodic home maintenance, interior upgrades, and office fit-out bookings across Lagos.",
  emailVerified: true,
  phoneVerified: true,
  preferredContact: "in-app",
  serviceInterests: [
    "Interior Design",
    "Electrical",
    "Home Cleaning",
    "Smart Home",
  ],
  savedAddresses: [
    {
      id: "addr-home-lekki",
      label: "Primary Residence",
      tag: "Home",
      streetAddress: "14B Admiralty Road",
      area: "Lekki Phase 1, Lagos",
      landmark: "Opposite Domino's Pizza / Sterling Bank",
      phone: "+234 803 452 8910",
      accessNotes: "Call security gatehouse upon arrival for visitor pass.",
      isDefault: true,
    },
    {
      id: "addr-office-vi",
      label: "Studio Annex Office",
      tag: "Office",
      streetAddress: "Plot 22 Adeola Odeku Street",
      area: "Victoria Island, Lagos",
      landmark: "Next to Zenith Heights",
      phone: "+234 809 210 4412",
      accessNotes: "Weekdays 9:00 AM – 5:00 PM at front reception.",
      isDefault: false,
    },
  ],
  savedProIds: [
    "elena-rodriguez",
    "urbanvibe-design-studio",
    "tunde-balogun",
  ],
  writtenReviews: [
    {
      id: "crev-urbanvibe",
      professionalId: "urbanvibe-design-studio",
      professionalName: "UrbanVibe Design Studio",
      professionalAvatar: "",
      professionalCategory: "Interior Architecture & Renovation",
      rating: 5,
      dateLabel: "Apr 28, 2026",
      comment:
        "Great virtual consultation. The color palette the team suggested really opened up our small living room, and they quickly provided an alternative when one item went out of stock.",
    },
    {
      id: "crev-elena",
      professionalId: "elena-rodriguez",
      professionalName: "Elena Rodriguez",
      professionalAvatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      professionalCategory: "Lead Interior Designer at UrbanVibe",
      rating: 5,
      dateLabel: "Mar 14, 2026",
      comment:
        "Clear mood boards, transparent budgeting, and punctual weekly progress updates throughout our living room makeover.",
      professionalResponse:
        "Thank you Sarah! It was wonderful working with you to refresh your space.",
    },
  ],
};

/**
 * Retrieves a professional profile by ID.
 * If not in the pre-curated dictionary, dynamically constructs a realistic profile
 * from search or home mock registries based on the pro's specific profession.
 */
export function getProfessionalProfileById(id: string): ProfessionalProfileData {
  if (MOCK_PROFESSIONAL_PROFILES[id]) {
    return MOCK_PROFESSIONAL_PROFILES[id];
  }

  // Look up in Search registry
  const searchPro = SEARCH_PROFESSIONALS_DATA.find((p) => p.id === id);
  if (searchPro) {
    const isCompany = searchPro.verification === "company";
    const profession = searchPro.subtitle || "Professional Specialist";
    const primaryCat = searchPro.categoryIds[0] || "general";

    return {
      id: searchPro.id,
      name: searchPro.name,
      roleTitle: `${searchPro.subtitle} • ${searchPro.location}`,
      verificationLabel: isCompany ? "CORPORATE PARTNER" : "INDIVIDUAL VERIFIED",
      verificationType: isCompany ? "company" : "individual",
      location: searchPro.location,
      rating: searchPro.rating,
      reviewCount: searchPro.reviewCount ?? 50,
      experienceLabel: isCompany ? "Registered Enterprise" : "8+ Years Exp.",
      avatarUrl: searchPro.imageUrl,
      bio: `${searchPro.name} is a top-rated service provider based in ${searchPro.location}, specializing in ${profession}. Dedicated to top-tier workmanship, customer satisfaction, and reliable delivery.`,
      responseTimeText: "Under 2 hours",
      services: [
        {
          id: `${searchPro.id}-service-1`,
          title: `Full ${profession} Inspection & Consultation`,
          description: `Detailed assessment, diagnostics, and customized service execution for your project in ${searchPro.location}.`,
          tags: ["Flexible Schedule", "Guaranteed Quality"],
          priceLabel: "STARTING FROM",
          priceValue: "₦50,000",
          ctaLabel: "BOOK NOW",
          ctaVariant: "default",
          iconName: "briefcase",
          iconVariant: "info",
        },
        {
          id: `${searchPro.id}-service-2`,
          title: `Custom ${profession} Project Delivery`,
          description: `End-to-end execution with premium materials, safety compliance, and comprehensive post-service warranty.`,
          tags: ["Project-based", "Milestone Billing"],
          priceLabel: "PRICING",
          priceValue: "Custom Quote",
          ctaLabel: "REQUEST QUOTE",
          ctaVariant: "outline",
          iconName: "sparkles",
          iconVariant: "warning",
        },
      ],
      portfolio: [
        {
          id: `${searchPro.id}-port-1`,
          title: `${searchPro.name} Signature Project`,
          category: primaryCat.replace(/-/g, " ").toUpperCase(),
          imageUrl: searchPro.imageUrl,
        },
      ],
      ratingBreakdown: [
        { stars: 5, percentage: Math.min(95, Math.round(searchPro.rating * 18)) },
        { stars: 4, percentage: 15 },
        { stars: 3, percentage: 5 },
      ],
      reviews: [
        {
          id: `${searchPro.id}-rev-1`,
          authorName: "Amina Lawal",
          authorRole: "Verified Client",
          timeAgo: "3 weeks ago",
          avatarUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
          rating: Math.round(searchPro.rating),
          comment: `Great experience with ${searchPro.name}! Arrived on time in ${searchPro.location} and handled the job cleanly.`,
        },
      ],
      quickActions: [
        "Are you available this week?",
        "Can I get a customized quote?",
        "Do you provide emergency service?",
      ],
    };
  }

  // Look up in Featured Home registry
  const featuredPro = DEFAULT_FEATURED_PROFESSIONALS.find((p) => p.id === id);
  if (featuredPro) {
    const isCompany = featuredPro.badgeVariant === "corporate";
    const ratingNum =
      typeof featuredPro.rating === "number"
        ? featuredPro.rating
        : parseFloat(featuredPro.rating) || 4.5;

    return {
      id: featuredPro.id,
      name: featuredPro.name,
      roleTitle: `${featuredPro.specialty} • ${featuredPro.location}`,
      verificationLabel: isCompany ? "CORPORATE PARTNER" : "VERIFIED PRO",
      verificationType: isCompany ? "company" : "individual",
      location: featuredPro.location,
      rating: ratingNum,
      reviewCount: 85,
      experienceLabel: "Featured Partner",
      avatarUrl: featuredPro.imageUrl,
      bio: `${featuredPro.name} is a featured service professional with proven expertise in ${featuredPro.specialty}. Providing reliable service across ${featuredPro.location}.`,
      responseTimeText: "Under 1 hour",
      services: [
        {
          id: `${featuredPro.id}-service-1`,
          title: `${featuredPro.specialty} Service Consultation`,
          description: `Initial on-site or virtual consultation and comprehensive estimate for your ${featuredPro.specialty} needs.`,
          tags: ["1-3 Days", "Satisfaction Guaranteed"],
          priceLabel: "STARTING FROM",
          priceValue: "₦65,000",
          ctaLabel: "BOOK NOW",
          ctaVariant: "default",
          iconName: "briefcase",
          iconVariant: "info",
        },
      ],
      portfolio: [
        {
          id: `${featuredPro.id}-port-1`,
          title: `${featuredPro.name} Featured Showcase`,
          category: featuredPro.specialty,
          imageUrl: featuredPro.imageUrl,
        },
      ],
      ratingBreakdown: [
        { stars: 5, percentage: 80 },
        { stars: 4, percentage: 15 },
        { stars: 3, percentage: 5 },
      ],
      reviews: [
        {
          id: `${featuredPro.id}-rev-1`,
          authorName: "Emeka Obi",
          authorRole: "Client",
          timeAgo: "2 weeks ago",
          avatarUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
          rating: 5,
          comment: `Top quality work by ${featuredPro.name}. Reliable and very communicative.`,
        },
      ],
      quickActions: [
        "Is this service still available?",
        "Can we schedule a consultation?",
        "Send project details",
      ],
    };
  }

  // Look up in Shop services registry
  const shopService = DEFAULT_SHOP_SERVICES.find((s) => s.provider.id === id);
  if (shopService) {
    const provider = shopService.provider;
    const providerServices = DEFAULT_SHOP_SERVICES.filter(
      (s) => s.provider.id === id
    );
    const isCompany = shopService.badgeVariant === "corporate";

    return {
      id: provider.id,
      name: provider.name,
      roleTitle: provider.role,
      verificationLabel: isCompany ? "CORPORATE PARTNER" : "VERIFIED EXPERT",
      verificationType: isCompany ? "company" : "individual",
      location: provider.location,
      rating: provider.rating,
      reviewCount: provider.reviewsCount,
      experienceLabel: `Since ${provider.memberSince}`,
      avatarUrl:
        provider.avatarUrl ??
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      bio: `${provider.name} (${provider.role}) offers fixed-price packages with verified quality, clear deliverables, and full escrow protection on MyKostoma.`,
      responseTimeText: provider.responseTime,
      services: providerServices.map((svc) => ({
        id: svc.id,
        title: svc.title,
        description: svc.summary[0] ?? svc.title,
        tags: [formatDelivery(svc.deliveryDays), `${svc.revisions} Revisions`],
        priceLabel: "FIXED PACKAGE",
        priceValue: `₦${svc.price.toLocaleString()}`,
        ctaLabel: "VIEW DETAILS",
        ctaVariant: "outline",
        iconName: "sparkles",
        iconVariant: "info",
      })),
      portfolio: providerServices.map((svc) => ({
        id: `${svc.id}-portfolio`,
        title: svc.title,
        category: findShopCategoryById(svc.categoryId).name,
        imageUrl: svc.imageUrl,
      })),
      ratingBreakdown: [
        { stars: 5, percentage: 88 },
        { stars: 4, percentage: 10 },
        { stars: 3, percentage: 2 },
      ],
      reviews: [
        {
          id: `${provider.id}-review-1`,
          authorName: "Sarah Johnson",
          authorRole: "Homeowner",
          timeAgo: "2 weeks ago",
          avatarUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
          rating: 5,
          comment: `${provider.name} delivered our package ahead of schedule with outstanding attention to detail. Highly recommended!`,
          professionalResponse:
            "Thank you so much Sarah! It was an absolute pleasure working with you to bring your vision to life.",
        },
      ],
      quickActions: [
        "Can I order a custom package?",
        "What is your earliest delivery window?",
        "Can we discuss project specifics?",
      ],
    };
  }

  return DEFAULT_PROFESSIONAL_PROFILE;
}

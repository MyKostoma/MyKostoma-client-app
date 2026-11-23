import type {
  ManagedReelItem,
  ReelCreatorProfile,
  ReelItem,
} from "@/components/reels/types";

export const REEL_REPORT_REASONS = [
  "Misleading service claim or false credentials",
  "Inappropriate or unsafe content",
  "Spam, repetitive promotions, or off-platform solicitation",
  "Copyright or stolen project showcase",
  "Other community guideline violation",
] as const;

export const REEL_COVER_PRESETS: readonly string[] = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
];

export const DEFAULT_REEL_CREATORS: ReelCreatorProfile[] = [
  {
    id: "alex-rivera",
    name: "Alex Rivera",
    roleTitle: "UI/UX Designer & Content Creator",
    categoryBadge: "DESIGN & CREATIVE",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    verified: true,
    bio: "Helping you build better digital products through design tips, architectural UI walkthroughs, and career insights.",
    location: "Lekki Phase 1, Lagos",
    websiteLabel: "bento.me/alexrivera",
    websiteUrl: "https://bento.me/alexrivera",
    reelsCount: 128,
    followersCount: 42500,
    followingCount: 892,
    services: [
      {
        id: "srv-alex-1",
        title: "Product Interface Audit & Redesign Sprint",
        description:
          "Comprehensive teardown of key conversion flows paired with Figma component library cleanup.",
        priceFormatted: "₦180,000",
        durationLabel: "5 Business Days",
      },
      {
        id: "srv-alex-2",
        title: "Interactive Brand & Design System Setup",
        description:
          "Complete scalable typography, color token system, and responsive web prototype.",
        priceFormatted: "₦320,000",
        durationLabel: "2 Weeks",
      },
    ],
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    roleTitle: "Interior Designer",
    categoryBadge: "INTERIOR DESIGNER",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    verified: true,
    bio: "Minimalist penthouse and modern residential interior architect curating warm lighting, bespoke millwork, and tactile textures.",
    location: "Victoria Island, Lagos",
    websiteLabel: "studiojenkins.co",
    websiteUrl: "https://studiojenkins.co",
    reelsCount: 46,
    followersCount: 18400,
    followingCount: 310,
    services: [
      {
        id: "srv-sarah-1",
        title: "Minimalist Living Room Styling",
        description:
          "Full spatial layout, lighting plan, and curated furniture sourcing board.",
        priceFormatted: "₦150,000",
        durationLabel: "2 Weeks",
      },
    ],
  },
  {
    id: "david-peterson",
    name: "David Peterson",
    roleTitle: "Master Plumber & Piping Engineer",
    categoryBadge: "MASTER PLUMBER",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    verified: true,
    bio: "Licensed commercial and residential plumbing specialist sharing pressure-test diagnostics and leak-prevention walkthroughs.",
    location: "Ikeja GRA, Lagos",
    reelsCount: 34,
    followersCount: 9200,
    followingCount: 185,
    services: [
      {
        id: "srv-david-1",
        title: "Emergency Pipe Diagnostics & Valve Retrofit",
        description:
          "Thermal moisture check, shutoff valve upgrade, and pressure-tested copper/PEX repair.",
        priceFormatted: "₦65,000",
        durationLabel: "Same Day",
      },
    ],
  },
  {
    id: "marcus-wright",
    name: "Marcus Wright",
    roleTitle: "Master Carpenter & Bespoke Millwork",
    categoryBadge: "MASTER CARPENTER",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    verified: true,
    bio: "Fine woodworking studio specializing in walnut shelving, hidden joinery, and precision fitted cabinetry.",
    location: "Lekki Phase 1, Lagos",
    reelsCount: 52,
    followersCount: 24100,
    followingCount: 412,
    services: [
      {
        id: "srv-marcus-1",
        title: "Custom Walnut Shelving & Home Library",
        description:
          "Measured laser templating, solid hardwood joinery, and matte oil finishing on site.",
        priceFormatted: "₦420,000",
        durationLabel: "3 Weeks",
      },
    ],
  },
  {
    id: "elena-rossi",
    name: "Elena Rossi",
    roleTitle: "Landscape Architect",
    categoryBadge: "LANDSCAPE ARCHITECT",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    verified: true,
    bio: "Designing climate-resilient rooftop gardens, courtyard planters, and automated drip-irrigation terraces.",
    location: "Ikoyi, Lagos",
    reelsCount: 29,
    followersCount: 15800,
    followingCount: 268,
    services: [
      {
        id: "srv-rossi-1",
        title: "Rooftop & Courtyard Landscape Concept",
        description:
          "Native plant palette, waterproof planter specifications, and outdoor mood lighting.",
        priceFormatted: "₦240,000",
        durationLabel: "10 Days",
      },
    ],
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    roleTitle: "Senior Architect",
    categoryBadge: "SENIOR ARCHITECT",
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
    verified: true,
    bio: "Coastal residence architect documenting site inspections, daylight studies, and structural framing milestones.",
    location: "Banana Island, Lagos",
    reelsCount: 64,
    followersCount: 31400,
    followingCount: 540,
    services: [
      {
        id: "srv-thorne-1",
        title: "Architectural Feasibility & Site Masterplan",
        description:
          "3D massing study, sun-path modeling, and municipal approval documentation.",
        priceFormatted: "₦650,000",
        durationLabel: "3 Weeks",
      },
    ],
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    roleTitle: "Lead Interior Designer at UrbanVibe",
    categoryBadge: "MASTER CARPENTER",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    verified: true,
    bio: "Modern minimalist and sustainable timber interior specialist crafting durable commercial and residential spaces.",
    location: "Lekki Phase 1, Lagos",
    websiteLabel: "urbanvibe.ng",
    websiteUrl: "https://urbanvibe.ng",
    reelsCount: 83,
    followersCount: 29700,
    followingCount: 478,
    services: [
      {
        id: "srv-elena-1",
        title: "Residential Interior Consultation",
        description:
          "Complete floor planning, sustainable wood sourcing, and 3D visualization.",
        priceFormatted: "₦150,000",
        durationLabel: "2–3 Weeks",
      },
    ],
  },
];

export const DEFAULT_FEED_REELS: ReelItem[] = [
  {
    id: "reel-101",
    creatorId: "sarah-jenkins",
    creatorName: "Sarah Jenkins",
    creatorRole: "INTERIOR DESIGNER",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Minimalist Penthouse Living Space Reveal",
    caption:
      "Transforming a minimalist penthouse living space with warm oak paneling and recessed skyline lighting.",
    hashtags: ["#InteriorDesign", "#ModernLiving", "#HomeReno"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 38,
    likesCount: 1200,
    viewsCount: 48500,
    commentsCount: 84,
    audioLabel: "Ambient Loft Keys • Original",
    uploadedAtLabel: "Oct 18, 2026",
    createdAtISO: "2026-10-18",
  },
  {
    id: "reel-102",
    creatorId: "david-peterson",
    creatorName: "David Peterson",
    creatorRole: "MASTER PLUMBER",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Fixing a Critical Manifold Leak Before Handover",
    caption:
      "Fixing a critical pressure leak before the weekend handover. Pro tip: always test isolation shutoff valves under load.",
    hashtags: ["#PlumbingLife", "#ServicePro", "#Craftsmanship"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1581578731548-c646400cc692?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 45,
    likesCount: 860,
    viewsCount: 19200,
    commentsCount: 47,
    audioLabel: "Original Audio",
    uploadedAtLabel: "Oct 16, 2026",
    createdAtISO: "2026-10-16",
  },
  {
    id: "reel-103",
    creatorId: "marcus-wright",
    creatorName: "Marcus Wright",
    creatorRole: "MASTER CARPENTER",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Custom Walnut Shelving Installation",
    caption:
      "Custom walnut shelving unit installation for a home library project. Precision joinery is everything.",
    hashtags: ["#Woodworking", "#HomeOffice", "#Craftsmanship"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 52,
    likesCount: 2400,
    viewsCount: 94000,
    commentsCount: 162,
    audioLabel: "Workshop Lo-Fi • Marcus Wright",
    uploadedAtLabel: "Oct 15, 2026",
    createdAtISO: "2026-10-15",
  },
  {
    id: "reel-104",
    creatorId: "elena-rossi",
    creatorName: "Elena Rossi",
    creatorRole: "LANDSCAPE ARCHITECT",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Rooftop Terrace Garden Progress",
    caption:
      "Morning progress on the rooftop garden project. Integrating native coastal flora with architectural timber planters.",
    hashtags: ["#GardenDesign", "#SustainableLiving", "#OutdoorLiving"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 41,
    likesCount: 1650,
    viewsCount: 62400,
    commentsCount: 95,
    audioLabel: "Original Audio",
    uploadedAtLabel: "Oct 14, 2026",
    createdAtISO: "2026-10-14",
  },
  {
    id: "reel-105",
    creatorId: "marcus-thorne",
    creatorName: "Marcus Thorne",
    creatorRole: "SENIOR ARCHITECT",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Early Morning Coastal Site Inspection",
    caption:
      "Early morning site visit for the upcoming coastal residence project. Detail-oriented structural framing in progress.",
    hashtags: ["#Architecture", "#DesignLife", "#SiteVisit"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 49,
    likesCount: 3180,
    viewsCount: 210000,
    commentsCount: 204,
    audioLabel: "Coastal Morning • Original",
    uploadedAtLabel: "Oct 13, 2026",
    createdAtISO: "2026-10-13",
  },
  {
    id: "reel-106",
    creatorId: "elena-rodriguez",
    creatorName: "Elena Rodriguez",
    creatorRole: "LEAD INTERIOR DESIGNER",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Reclaimed Oak Custom Kitchen Cabinetry",
    caption:
      "Sustainable woodworking: using reclaimed oak for custom cabinetry. The natural grain pattern on this island is unmatched.",
    hashtags: ["#Woodworking", "#Sustainability", "#KitchenDesign"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 36,
    likesCount: 4120,
    viewsCount: 542000,
    commentsCount: 318,
    audioLabel: "Studio Session • Original",
    uploadedAtLabel: "Oct 12, 2026",
    createdAtISO: "2026-10-12",
  },
  {
    id: "reel-107",
    creatorId: "alex-rivera",
    creatorName: "Alex Rivera",
    creatorRole: "UI/UX DESIGNER",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Morning Workflow",
    caption:
      "My typical morning workflow as a UI/UX Designer & spatial planner. Coffee first, then component grids in Figma.",
    hashtags: ["#designlife", "#uidesign", "#productivity"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 44,
    likesCount: 84203,
    viewsCount: 1240582,
    commentsCount: 1054,
    audioLabel: "Original Audio",
    uploadedAtLabel: "Oct 12, 2026",
    createdAtISO: "2026-10-12",
  },
];

export const DEFAULT_MY_REELS: ManagedReelItem[] = [
  {
    id: "my-reel-1",
    creatorId: "alex-rivera",
    creatorName: "Alex Rivera",
    creatorRole: "UI/UX DESIGNER & CONTENT CREATOR",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Morning Workflow",
    caption:
      "My typical morning workflow as a UI/UX Designer in SF. Coffee first, then Figma.",
    hashtags: ["#designlife", "#uidesign", "#productivity"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 44,
    likesCount: 84203,
    viewsCount: 1240582,
    commentsCount: 1054,
    audioLabel: "Original Audio",
    uploadedAtLabel: "Oct 12, 2026",
    createdAtISO: "2026-10-12",
    status: "public",
    viewsTrendLabel: "↑ 12% vs avg.",
    engagementRateLabel: "6.8% Engagement",
    commentsTodayLabel: "92 New today",
    fileName: "workflow_v2_final.mp4",
  },
  {
    id: "my-reel-2",
    creatorId: "alex-rivera",
    creatorName: "Alex Rivera",
    creatorRole: "UI/UX DESIGNER & CONTENT CREATOR",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Minimalist Living Room Reveal",
    caption:
      "Acoustic slat wall installation paired with recessed ceiling tracks in Victoria Island.",
    hashtags: ["#interiordesign", "#minimalism", "#homedesign"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 36,
    likesCount: 41200,
    viewsCount: 850000,
    commentsCount: 412,
    audioLabel: "Studio Beats • Original",
    uploadedAtLabel: "Oct 08, 2026",
    createdAtISO: "2026-10-08",
    status: "public",
    viewsTrendLabel: "↑ 9% vs avg.",
    engagementRateLabel: "4.9% Engagement",
    commentsTodayLabel: "28 New today",
    fileName: "living_room_reveal.mp4",
  },
  {
    id: "my-reel-3",
    creatorId: "alex-rivera",
    creatorName: "Alex Rivera",
    creatorRole: "UI/UX DESIGNER & CONTENT CREATOR",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Lighting Plan Behind the Scenes",
    caption:
      "Rough cut walking through Kelvin temperature selection for warm kitchen islands.",
    hashtags: ["#lightingdesign", "#bts", "#architecture"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 29,
    likesCount: 0,
    viewsCount: 0,
    commentsCount: 0,
    audioLabel: "Original Audio",
    uploadedAtLabel: "Draft saved Oct 19",
    createdAtISO: "2026-10-19",
    status: "draft",
    viewsTrendLabel: "Draft preview",
    engagementRateLabel: "Not published",
    commentsTodayLabel: "0 comments",
    fileName: "lighting_bts_draft.mp4",
  },
  {
    id: "my-reel-4",
    creatorId: "alex-rivera",
    creatorName: "Alex Rivera",
    creatorRole: "UI/UX DESIGNER & CONTENT CREATOR",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Kitchen Millwork Walkthrough",
    caption:
      "Frameless oak cabinetry hinges and quartz waterfall island templating details.",
    hashtags: ["#millwork", "#kitchen", "#bespoke"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 51,
    likesCount: 19400,
    viewsCount: 310000,
    commentsCount: 198,
    audioLabel: "Original Audio",
    uploadedAtLabel: "Oct 03, 2026",
    createdAtISO: "2026-10-03",
    status: "public",
    viewsTrendLabel: "↑ 5% vs avg.",
    engagementRateLabel: "6.3% Engagement",
    commentsTodayLabel: "14 New today",
    fileName: "kitchen_millwork_walkthrough.mp4",
  },
  {
    id: "my-reel-5",
    creatorId: "alex-rivera",
    creatorName: "Alex Rivera",
    creatorRole: "UI/UX DESIGNER & CONTENT CREATOR",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Material Sourcing Tour",
    caption:
      "Comparing brushed brass pulls and fluted glass samples at the trade showroom.",
    hashtags: ["#materials", "#sourcing", "#designstudio"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 33,
    likesCount: 0,
    viewsCount: 0,
    commentsCount: 0,
    audioLabel: "Original Audio",
    uploadedAtLabel: "Draft saved Oct 21",
    createdAtISO: "2026-10-21",
    status: "draft",
    viewsTrendLabel: "Draft preview",
    engagementRateLabel: "Not published",
    commentsTodayLabel: "0 comments",
    fileName: "showroom_sourcing_raw.mp4",
  },
  {
    id: "my-reel-6",
    creatorId: "alex-rivera",
    creatorName: "Alex Rivera",
    creatorRole: "UI/UX DESIGNER & CONTENT CREATOR",
    creatorAvatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    creatorVerified: true,
    title: "Commercial Office Transformation",
    caption:
      "Time-lapse spatial zoning and acoustic pod installation scheduled for Monday launch.",
    hashtags: ["#commercialdesign", "#workspace", "#renovation"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    durationSeconds: 47,
    likesCount: 0,
    viewsCount: 0,
    commentsCount: 0,
    audioLabel: "Original Audio",
    uploadedAtLabel: "Scheduled Oct 28, 2026",
    createdAtISO: "2026-10-28",
    status: "scheduled",
    viewsTrendLabel: "Goes live Oct 28",
    engagementRateLabel: "Queued for release",
    commentsTodayLabel: "Scheduled",
    fileName: "office_transformation.mp4",
  },
];

export function getDefaultManagedReelById(
  id: string
): ManagedReelItem | undefined {
  const normalized = id.trim().toLowerCase();
  return DEFAULT_MY_REELS.find(
    (reel) => reel.id.toLowerCase() === normalized
  );
}

export function getDefaultCreatorById(
  id: string
): ReelCreatorProfile | undefined {
  const normalized = id.trim().toLowerCase();
  return DEFAULT_REEL_CREATORS.find(
    (creator) => creator.id.toLowerCase() === normalized
  );
}

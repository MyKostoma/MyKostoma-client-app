import type {
    FooterProps,
    FooterColumnItem,
    FooterSocialItem,
    FooterLinkItem,
} from "./types";
import { Globe, MessageCircle, Send, Share2 } from "lucide-react";


export const DEFAULT_APP_FOOTER_COLUMNS: FooterColumnItem[] = [
    {
        title: "SERVICES",
        links: [
            { label: "Plumbing & HVAC", href: "#plumbing-hvac" },
            { label: "Electrical Work", href: "#electrical-work" },
            { label: "Interior Design", href: "#interior-design" },
            { label: "Home Security", href: "#home-security" },
        ],
    },
    {
        title: "COMPANY",
        links: [
            { label: "About Us", href: "#about-us" },
            { label: "Become a Pro", href: "#become-a-pro" },
            { label: "Trust & Safety", href: "#trust-and-safety" },
            { label: "Press Center", href: "#press-center" },
        ],
    },
    {
        title: "RESOURCES",
        links: [
            { label: "Service Standards", href: "#service-standards" },
            { label: "Community Forum", href: "#community-forum" },
            { label: "Support Center", href: "#support-center" },
            { label: "Legal Notices", href: "#legal-notices" },
        ],
    },
];

export const DEFAULT_APP_BOTTOM_LINKS: FooterLinkItem[] = [
    { label: "GUIDELINES", href: "#guidelines" },
    { label: "PRIVACY POLICY", href: "#privacy-policy" },
    { label: "TERMS OF SERVICE", href: "#terms-of-service" },
];


export const DEFAULT_PUBLIC_FOOTER_COLUMNS: FooterColumnItem[] = [
    {
        title: "MARKETPLACE",
        links: [
            { label: "Find Pros", href: "#find-pros" },
            { label: "All Categories", href: "#all-categories" },
            { label: "Enterprise Solutions", href: "#enterprise-solutions" },
            { label: "Referral Program", href: "#referral-program" },
        ],
    },
    {
        title: "COMPANY",
        links: [
            { label: "About Us", href: "#about-us" },
            { label: "How it Works", href: "#how-it-works" },
            { label: "Success Stories", href: "#success-stories" },
            { label: "Contact Support", href: "#contact-support" },
        ],
    },
    {
        title: "LEGAL",
        links: [
            { label: "Privacy Policy", href: "#privacy-policy" },
            { label: "Terms of Service", href: "#terms-of-service" },
            { label: "Safety Center", href: "#safety-center" },
            { label: "Help Guidelines", href: "#help-guidelines" },
        ],
    },
];

export const DEFAULT_PUBLIC_SOCIALS: FooterSocialItem[] = [
    { name: "Facebook", href: "https://facebook.com", icon: Share2 },
    { name: "Instagram", href: "https://instagram.com", icon: Globe },
    { name: "Twitter", href: "https://twitter.com", icon: Send },
    { name: "LinkedIn", href: "https://linkedin.com", icon: MessageCircle },
  ];
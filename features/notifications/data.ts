import type { NotificationItem } from "./types";

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    category: "quote_received",
    title: "New quote received",
    description:
      "You received a new price estimate for 'Wedding Photography' from Capture Moments Studio.",
    timeAgo: "2 hours ago",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    archived: false,
    action: {
      label: "View Quote",
      href: "/quotes",
      actionKey: "viewQuote",
    },
    metadata: {
      quoteId: "quote-101",
    },
  },
  {
    id: "notif-2",
    category: "quote_accepted",
    title: "Quote accepted",
    description:
      "Your quote for 'Event Planning' has been accepted by David Miller. The project is now scheduled.",
    timeAgo: "5 hours ago",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: true,
    archived: false,
    metadata: {
      quoteId: "quote-102",
    },
  },
  {
    id: "notif-3",
    category: "message",
    title: "New message from Sarah J.",
    description:
      '"Hi Alex, I\'ve updated the timeline for the photography session. Let me know if that works..."',
    timeAgo: "1 day ago",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    archived: false,
    senderName: "Sarah J.",
    senderAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    action: {
      label: "Reply Now",
      href: "/messages",
      actionKey: "reply",
    },
    metadata: {
      conversationId: "conv-sarah-j",
    },
  },
  {
    id: "notif-4",
    category: "order_status",
    title: "Order status updated",
    description:
      "Order #12345 status updated to 'In Progress'. The provider has started working on your request.",
    timeAgo: "1 day ago",
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    read: true,
    archived: false,
    metadata: {
      orderId: "12345",
    },
  },
  {
    id: "notif-5",
    category: "payment",
    title: "Payment released",
    description:
      "Payment for Order #67890 has been released to your wallet. You can withdraw the funds anytime.",
    timeAgo: "2 days ago",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: true,
    archived: false,
    metadata: {
      orderId: "67890",
      amount: "₦45,000",
    },
  },
  {
    id: "notif-6",
    category: "review",
    title: "New 5-star review!",
    description:
      "Michael B. left you a glowing review for your 'Plumbing Maintenance' service.",
    timeAgo: "3 days ago",
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    read: false,
    archived: false,
    action: {
      label: "View Review",
      href: "/profile",
      actionKey: "viewReview",
    },
    metadata: {
      rating: 5,
    },
  },
  {
    id: "notif-7",
    category: "verification",
    title: "Verification successful",
    description:
      "Your ID verification is successful. Your profile now carries the 'Verified Professional' badge.",
    timeAgo: "1 week ago",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    archived: false,
  },
  {
    id: "notif-8",
    category: "dispute",
    title: "Dispute opened",
    description:
      "A dispute has been opened for Order #54321. Our support team is reviewing the case and will contact you shortly.",
    timeAgo: "2 weeks ago",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    archived: false,
    metadata: {
      orderId: "54321",
    },
  },
];

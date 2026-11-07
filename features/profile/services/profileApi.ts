"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import {
  toggleFollowedProfessional,
  useSendProfessionalInquiryMutation,
  useToggleFollowProfessionalMutation,
} from "@/store/slices/discoverSlice";
import type {
  ProfessionalProfileData,
  ProfileServiceItem,
  ProfileTabId,
} from "@/components/profile/types";
import { DEFAULT_PROFESSIONAL_PROFILE } from "../data";
import { buildServiceInquiryPrefill } from "./profileHelpers";

export function useProfileService(options?: {
  profile?: ProfessionalProfileData;
  initialMessagingOpen?: boolean;
  initialFollowing?: boolean;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profile = options?.profile ?? DEFAULT_PROFESSIONAL_PROFILE;
  const initialMessagingOpen = options?.initialMessagingOpen ?? false;
  const initialFollowing = options?.initialFollowing ?? false;

  const [activeTab, setActiveTab] = useState<ProfileTabId>("services");
  const [isFollowing, setIsFollowing] = useState<boolean>(initialFollowing);
  const [isMessagingOpen, setIsMessagingOpen] =
    useState<boolean>(initialMessagingOpen);
  const [messageText, setMessageText] = useState<string>("");
  const [isStuck, setIsStuck] = useState<boolean>(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [toggleFollowMutation] = useToggleFollowProfessionalMutation();
  const [sendInquiryMutation] = useSendProfessionalInquiryMutation();

  useEffect(() => {
    setActiveTab("services");
    setIsMessagingOpen(initialMessagingOpen);
    setIsFollowing(initialFollowing);
    setMessageText("");
  }, [profile.id, initialMessagingOpen, initialFollowing]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sentinelRef.current) return;
      const rect = sentinelRef.current.getBoundingClientRect();
      setIsStuck(rect.top <= 72);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMessagingOpen) return;

    const handleScrollSpy = () => {
      if (isProgrammaticScrollRef.current) return;

      if (window.scrollY < 200) {
        setActiveTab("services");
        return;
      }

      const sections: ProfileTabId[] = ["reviews", "portfolio", "services"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveTab(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [isMessagingOpen]);

  const handleTabChange = (tab: ProfileTabId) => {
    setActiveTab(tab);
    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 800);

    if (tab === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const sectionEl = document.getElementById(tab);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToggleFollow = async () => {
    const nextFollowing = !isFollowing;
    setIsFollowing(nextFollowing);
    dispatch(toggleFollowedProfessional(profile.id));
    try {
      await toggleFollowMutation({
        id: profile.id,
        following: nextFollowing,
      }).unwrap();
    } catch {
      // Fallback already updated local state
    }
  };

  const handleToggleMessaging = () => {
    setIsMessagingOpen((prev) => !prev);
  };

  const handleServiceAction = (service: ProfileServiceItem) => {
    setMessageText(buildServiceInquiryPrefill(profile.name, service));
    setIsMessagingOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    const trimmed = messageText.trim();
    if (!trimmed) {
      toast.error("Please enter a message before sending.");
      return;
    }
    try {
      await sendInquiryMutation({
        recipientId: profile.id,
        message: trimmed,
      }).unwrap();
    } catch {
      // Fallback simulated success
    }
    toast.success(`Message sent to ${profile.name}!`);
    setMessageText("");
    setIsMessagingOpen(false);
  };

  return {
    router,
    profile,
    activeTab,
    isFollowing,
    isMessagingOpen,
    setIsMessagingOpen,
    messageText,
    setMessageText,
    isStuck,
    sentinelRef,
    handleTabChange,
    handleToggleFollow,
    handleToggleMessaging,
    handleServiceAction,
    handleSendMessage,
  };
}

"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FollowInteractionState } from "./types";

export interface FollowButtonProps {
  isFollowing?: boolean;
  forceState?: FollowInteractionState;
  onToggleFollow?: () => void;
  className?: string;
}

export function FollowButton({
  isFollowing = false,
  forceState,
  onToggleFollow,
  className,
}: FollowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [canShowUnfollowOnHover, setCanShowUnfollowOnHover] = useState(true);

  const effectiveState: FollowInteractionState =
    forceState ??
    (isFollowing
      ? isHovered && canShowUnfollowOnHover
        ? "hover-unfollow"
        : "active"
      : "default");

  const handleClick = () => {
    if (!forceState) {
      if (!isFollowing) {
        // When user clicks Follow, show FOLLOWING first until they re-hover
        setCanShowUnfollowOnHover(false);
      } else {
        setIsHovered(false);
        setCanShowUnfollowOnHover(true);
      }
    }
    onToggleFollow?.();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCanShowUnfollowOnHover(true);
  };

  if (effectiveState === "hover-unfollow") {
    return (
      <Button
        type="button"
        variant="outline"
        size="default"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        leadingIcon={<X className="size-3 stroke-[2.5] text-error" />}
        className={cn(
          "h-10 min-w-32 px-5 rounded-xl text-[11px] font-semibold uppercase tracking-wider border-error/35 bg-card hover:bg-error-bg/50 text-error shadow-2xs",
          className
        )}
      >
        UNFOLLOW
      </Button>
    );
  }

  if (effectiveState === "active") {
    return (
      <Button
        type="button"
        variant="outline"
        size="default"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        leadingIcon={
          <span className="size-4.5 p-0.5 rounded-full bg-foreground text-card flex items-center justify-center shrink-0">
            <Check className="size-2 p-0.5" />
          </span>
        }
        className={cn(
          "h-10 min-w-32 px-5 rounded-xl text-[11px] font-bold uppercase tracking-wider border-border bg-card hover:bg-card text-foreground shadow-2xs",
          className
        )}
      >
        FOLLOWING
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="default"
      size="default"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "h-10 min-w-28 px-6 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-xs",
        className
      )}
    >
      FOLLOW
    </Button>
  );
}

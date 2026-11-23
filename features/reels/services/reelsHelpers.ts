import type {
  MyReelsFilterTab,
  ReelsViewMode,
} from "@/components/reels/types";

const MAX_REEL_FILE_BYTES = 2 * 1024 * 1024 * 1024; // 2 GB

export function formatCompactCount(value: number): string {
  if (value >= 1_000_000) {
    const num = (value / 1_000_000).toFixed(1).replace(/\.0$/, "");
    return `${num}M`;
  }
  if (value >= 1_000) {
    const num = (value / 1_000).toFixed(1).replace(/\.0$/, "");
    return `${num}K`;
  }
  return String(value);
}

export function formatExactCount(value: number): string {
  return value.toLocaleString("en-US");
}

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "0 MB";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let idx = 0;
  while (size >= 1024 && idx < units.length - 1) {
    size /= 1024;
    idx += 1;
  }
  return `${size.toFixed(size >= 100 || idx === 0 ? 0 : 1)} ${units[idx]}`;
}

export function parseHashtagsInput(raw: string): string[] {
  const parts = raw
    .split(/[\s,]+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .map((token) => (token.startsWith("#") ? token : `#${token}`));
  return Array.from(new Set(parts)).slice(0, 8);
}

export function validateReelVideoFile(file: File): {
  valid: boolean;
  errorCode?: string;
  errorMessage?: string;
} {
  const lowerName = file.name.toLowerCase();
  const isAllowedType =
    file.type === "video/mp4" ||
    file.type === "video/webm" ||
    file.type === "video/quicktime" ||
    lowerName.endsWith(".mp4") ||
    lowerName.endsWith(".webm") ||
    lowerName.endsWith(".mov");

  if (!isAllowedType) {
    return {
      valid: false,
      errorCode: "ERR_UNSUPPORTED_FORMAT_415",
      errorMessage:
        "Unsupported video format. Please upload an MP4, WebM, or MOV video file.",
    };
  }

  if (file.size > MAX_REEL_FILE_BYTES) {
    return {
      valid: false,
      errorCode: "ERR_FILE_TOO_LARGE_413",
      errorMessage:
        "Video file exceeds the 2GB limit. Compress your export and try again.",
    };
  }

  return { valid: true };
}

export function normalizeReelsViewMode(
  raw: string | null | undefined,
  isProfessional: boolean
): ReelsViewMode {
  const normalized = (raw ?? "").trim().toLowerCase();
  if (!isProfessional) {
    return normalized === "following" ? "following" : "discover";
  }
  if (
    normalized === "my-reels" ||
    normalized === "discover" ||
    normalized === "following"
  ) {
    return normalized;
  }
  return "my-reels";
}

export function normalizeMyReelsTab(raw?: string | null): MyReelsFilterTab {
  const normalized = (raw ?? "").trim().toLowerCase();
  if (normalized === "all" || normalized === "draft" || normalized === "scheduled") {
    return normalized;
  }
  return "all";
}

export function formatReelDate(date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

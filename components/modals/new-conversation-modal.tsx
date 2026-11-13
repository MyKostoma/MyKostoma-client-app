"use client";

import { useState, useEffect, type FormEvent } from "react";
import { MessageSquarePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-fields";
import type { NewConversationModalProps } from "./types";

export type { NewConversationModalProps } from "./types";

export function NewConversationModal({
  isOpen,
  onClose,
  onCreateConversation,
}: NewConversationModalProps) {
  const [participantName, setParticipantName] = useState("");
  const [participantRole, setParticipantRole] = useState("");
  const [initialMessage, setInitialMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const canSubmit =
    participantName.trim().length > 0 && initialMessage.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    onCreateConversation({
      participantName: participantName.trim(),
      participantRole: participantRole.trim() || "Professional",
      initialMessage: initialMessage.trim(),
    });

    setParticipantName("");
    setParticipantRole("");
    setInitialMessage("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-conversation-dialog-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-5 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
              <MessageSquarePlus className="size-5" />
            </div>
            <div>
              <h2
                id="new-conversation-dialog-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                New Conversation
              </h2>
              <p className="text-xs text-muted-foreground">
                Start a direct chat with a professional or tenant.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="recipient-name" required>
              Recipient Name
            </Label>
            <Input
              id="recipient-name"
              placeholder="e.g. Elena Rodriguez"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="recipient-role">Role or Unit</Label>
            <Input
              id="recipient-role"
              placeholder="e.g. Interior Designer, Plumber, Unit 4B"
              value={participantRole}
              onChange={(e) => setParticipantRole(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="initial-message" required>
              Message
            </Label>
            <Textarea
              id="initial-message"
              rows={3}
              placeholder="Write your opening message..."
              value={initialMessage}
              onChange={(e) => setInitialMessage(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            size="sm"
            disabled={!canSubmit}
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Start Chat
          </Button>
        </div>
      </form>
    </div>
  );
}


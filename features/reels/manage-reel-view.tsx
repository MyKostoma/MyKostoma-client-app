"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ReelsSubpageTopBar } from "@/components/layouts/top-bars/reels/reels-subpage-top-bar";
import { ManageReelWorkspace } from "@/components/reels/manage-reel-workspace";
import { ReelsProOnlyGate } from "@/components/reels/reels-pro-only-gate";
import {
  DeleteReelModal,
  EditReelModal,
} from "@/components/modals/reel-modals";
import { useManageReelService } from "./services/reelsApi";
import type { ManageReelViewProps } from "./types";

export function ManageReelView({ reelId }: ManageReelViewProps) {
  const {
    isProfessional,
    reel,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    progressPercent,
    setProgressPercent,
    editModalOpen,
    setEditModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    handleBack,
    handleSaveEdit,
    handleShareLink,
    handleConfirmDelete,
  } = useManageReelService(reelId);

  return (
    <>
      <DashboardTopBarSlot>
        <ReelsSubpageTopBar
          title="Manage Reel"
          backLabel={isProfessional ? "Back to My Reels" : "Back to Reels"}
          onBack={handleBack}
          actionLabel={isProfessional ? "Edit Reel" : undefined}
          onAction={isProfessional ? () => setEditModalOpen(true) : undefined}
        />
      </DashboardTopBarSlot>

      <div className="pb-10">
        {!isProfessional ? (
          <ReelsProOnlyGate
            featureTitle="Reel Analytics & Management"
            description="Reel performance metrics, editing, and publishing controls belong to the Creator Studio on MyKostoma Professional accounts."
            onBackToFeed={handleBack}
          />
        ) : (
          <ManageReelWorkspace
            reel={reel}
            isPlaying={isPlaying}
            isMuted={isMuted}
            progressPercent={progressPercent}
            onBack={handleBack}
            onTogglePlay={() => setIsPlaying((prev) => !prev)}
            onToggleMute={() => setIsMuted((prev) => !prev)}
            onScrub={setProgressPercent}
            onOpenEdit={() => setEditModalOpen(true)}
            onShareLink={handleShareLink}
            onOpenDelete={() => setDeleteModalOpen(true)}
          />
        )}
      </div>

      {isProfessional && (
        <>
          <EditReelModal
            isOpen={editModalOpen}
            reel={reel}
            onClose={() => setEditModalOpen(false)}
            onSaveReel={handleSaveEdit}
          />

          <DeleteReelModal
            isOpen={deleteModalOpen}
            reelTitle={reel.title}
            onClose={() => setDeleteModalOpen(false)}
            onConfirmDelete={handleConfirmDelete}
          />
        </>
      )}
    </>
  );
}

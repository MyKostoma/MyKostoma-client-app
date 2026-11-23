"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ReelsSubpageTopBar } from "@/components/layouts/top-bars/reels/reels-subpage-top-bar";
import { ReelUploadForm } from "@/components/reels/reel-upload-form";
import { ReelUploadProgress } from "@/components/reels/reel-upload-progress";
import { ReelUploadSuccess } from "@/components/reels/reel-upload-success";
import { ReelUploadFailed } from "@/components/reels/reel-upload-failed";
import { ReelsProOnlyGate } from "@/components/reels/reels-pro-only-gate";
import { formatFileSize } from "./services/reelsHelpers";
import { useUploadReelService } from "./services/reelsApi";

export function UploadReelView() {
  const {
    isProfessional,
    phase,
    selectedFile,
    fileName,
    fileSizeLabel,
    videoPreviewUrl,
    title,
    setTitle,
    caption,
    setCaption,
    hashtags,
    setHashtags,
    visibility,
    setVisibility,
    coverOptions,
    selectedCoverUrl,
    setSelectedCoverUrl,
    titleError,
    fileError,
    progress,
    errorCode,
    errorMessage,
    createdReel,
    followersCountLabel,
    handleFileSelect,
    handleUseSampleClip,
    handleClearFile,
    handleCustomCoverSelect,
    handleSubmit,
    handleCancelUpload,
    handleTryAgain,
    handleBack,
    handleViewUploadedReel,
    handleShareUploadedPlatform,
  } = useUploadReelService();

  return (
    <>
      <DashboardTopBarSlot>
        <ReelsSubpageTopBar
          title="Upload Reel"
          backLabel={isProfessional ? "Back to My Reels" : "Back to Reels"}
          onBack={handleBack}
        />
      </DashboardTopBarSlot>

      <div className="pb-10">
        {!isProfessional ? (
          <ReelsProOnlyGate
            featureTitle="Upload Reels with a Professional Account"
            description="Only verified MyKostoma Professional and Business accounts can publish vertical video reels. Switch to or register a Professional account to share showcase clips."
            onBackToFeed={handleBack}
          />
        ) : (
          <>
            {phase === "form" && (
              <ReelUploadForm
                selectedFile={selectedFile}
                fileName={fileName}
                fileSizeLabel={
                  selectedFile ? formatFileSize(selectedFile.size) : fileSizeLabel
                }
                videoPreviewUrl={videoPreviewUrl}
                title={title}
                caption={caption}
                hashtags={hashtags}
                visibility={visibility}
                coverOptions={coverOptions}
                selectedCoverUrl={selectedCoverUrl}
                titleError={titleError}
                fileError={fileError}
                onFileSelect={handleFileSelect}
                onUseSampleClip={handleUseSampleClip}
                onClearFile={handleClearFile}
                onTitleChange={setTitle}
                onCaptionChange={setCaption}
                onHashtagsChange={setHashtags}
                onVisibilityChange={setVisibility}
                onSelectCover={setSelectedCoverUrl}
                onCustomCoverSelect={handleCustomCoverSelect}
                onCancel={handleBack}
                onSubmit={handleSubmit}
              />
            )}

            {phase === "uploading" && (
              <ReelUploadProgress
                fileName={fileName || "reel_upload.mp4"}
                progress={progress}
                onCancelUpload={handleCancelUpload}
              />
            )}

            {phase === "success" && (
              <ReelUploadSuccess
                title={createdReel?.title || title || "Morning Workflow"}
                thumbnailUrl={createdReel?.thumbnailUrl || selectedCoverUrl}
                followersCountLabel={followersCountLabel}
                onViewReel={handleViewUploadedReel}
                onDone={handleBack}
                onSharePlatform={handleShareUploadedPlatform}
              />
            )}

            {phase === "failed" && (
              <ReelUploadFailed
                errorCode={errorCode}
                errorMessage={errorMessage}
                onTryAgain={handleTryAgain}
                onCancel={handleCancelUpload}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

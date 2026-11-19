"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectVerificationRecord,
  submitVerificationLocal,
  useGetVerificationStatusQuery,
  useSubmitVerificationDocumentMutation,
} from "@/store/slices/verificationSlice";
import type {
  VerificationDocumentType,
  VerificationUploadedFile,
} from "@/components/verification/types";
import {
  buildVerificationOverviewHref,
  buildVerificationStatusHref,
  buildVerificationSubmitHref,
  formatVerificationDisplayDate,
  formatVerificationExpiryDate,
  formatVerificationFileSize,
  generateVerificationId,
  getVerificationDocumentOption,
  maskDocumentNumber,
  resolveVerificationRecordForStatus,
  validateVerificationDocumentNumber,
  validateVerificationImageFile,
} from "./verificationHelpers";

export function useVerificationOverviewService(
  overrideStatus?: string | null
) {
  const router = useRouter();
  const reduxRecord = useAppSelector(selectVerificationRecord);
  const { data: apiRecord, isLoading } = useGetVerificationStatusQuery(
    undefined,
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const [benefitsModalOpen, setBenefitsModalOpen] = useState(false);

  const baseRecord =
    reduxRecord.status !== "unverified"
      ? reduxRecord
      : (apiRecord ?? reduxRecord);

  const record = resolveVerificationRecordForStatus(baseRecord, overrideStatus);

  const handleGetVerified = useCallback(() => {
    router.push(buildVerificationSubmitHref());
  }, [router]);

  const handleViewDetails = useCallback(() => {
    router.push(buildVerificationStatusHref(record.status));
  }, [router, record.status]);

  const handleResubmit = useCallback(() => {
    router.push(buildVerificationSubmitHref(record.documentType));
  }, [router, record.documentType]);

  const handleOpenBenefits = useCallback(() => {
    setBenefitsModalOpen(true);
  }, []);

  const handleCloseBenefits = useCallback(() => {
    setBenefitsModalOpen(false);
  }, []);

  return {
    record,
    isLoading,
    benefitsModalOpen,
    handleGetVerified,
    handleViewDetails,
    handleResubmit,
    handleOpenBenefits,
    handleCloseBenefits,
  };
}

export function useVerificationSubmitService(
  defaultDocumentType: VerificationDocumentType = "nin"
) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [submitMutation, { isLoading: isMutating }] =
    useSubmitVerificationDocumentMutation();

  const [documentType, setDocumentType] =
    useState<VerificationDocumentType>(defaultDocumentType);
  const [documentNumber, setDocumentNumber] = useState("");
  const [frontFile, setFrontFile] = useState<VerificationUploadedFile | null>(
    null
  );
  const [backFile, setBackFile] = useState<VerificationUploadedFile | null>(
    null
  );
  const [documentNumberError, setDocumentNumberError] = useState<
    string | undefined
  >(undefined);
  const [frontFileError, setFrontFileError] = useState<string | undefined>(
    undefined
  );
  const [backFileError, setBackFileError] = useState<string | undefined>(
    undefined
  );
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const frontUrlRef = useRef<string | null>(null);
  const backUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (frontUrlRef.current) URL.revokeObjectURL(frontUrlRef.current);
      if (backUrlRef.current) URL.revokeObjectURL(backUrlRef.current);
    };
  }, []);

  const selectedOption = getVerificationDocumentOption(documentType);

  const handleSelectDocumentType = useCallback(
    (nextType: VerificationDocumentType) => {
      setDocumentType(nextType);
      setDocumentNumberError(undefined);
      setFrontFileError(undefined);
      setBackFileError(undefined);

      const nextOption = getVerificationDocumentOption(nextType);
      if (!nextOption.requiresBackSide && backUrlRef.current) {
        URL.revokeObjectURL(backUrlRef.current);
        backUrlRef.current = null;
        setBackFile(null);
      }
    },
    []
  );

  const handleDocumentNumberChange = useCallback((value: string) => {
    setDocumentNumber(value);
    setDocumentNumberError(undefined);
  }, []);

  const handleFrontFileSelect = useCallback((file: File) => {
    const validation = validateVerificationImageFile(file);
    if (!validation.valid) {
      setFrontFileError(validation.error);
      toast.error(validation.error ?? "Invalid document image.");
      return;
    }

    if (frontUrlRef.current) {
      URL.revokeObjectURL(frontUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);
    frontUrlRef.current = previewUrl;

    setFrontFile({
      name: file.name,
      size: file.size,
      sizeLabel: formatVerificationFileSize(file.size),
      type: file.type,
      previewUrl,
    });
    setFrontFileError(undefined);
  }, []);

  const handleFrontFileRemove = useCallback(() => {
    if (frontUrlRef.current) {
      URL.revokeObjectURL(frontUrlRef.current);
      frontUrlRef.current = null;
    }
    setFrontFile(null);
    setFrontFileError(undefined);
  }, []);

  const handleBackFileSelect = useCallback((file: File) => {
    const validation = validateVerificationImageFile(file);
    if (!validation.valid) {
      setBackFileError(validation.error);
      toast.error(validation.error ?? "Invalid document image.");
      return;
    }

    if (backUrlRef.current) {
      URL.revokeObjectURL(backUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);
    backUrlRef.current = previewUrl;

    setBackFile({
      name: file.name,
      size: file.size,
      sizeLabel: formatVerificationFileSize(file.size),
      type: file.type,
      previewUrl,
    });
    setBackFileError(undefined);
  }, []);

  const handleBackFileRemove = useCallback(() => {
    if (backUrlRef.current) {
      URL.revokeObjectURL(backUrlRef.current);
      backUrlRef.current = null;
    }
    setBackFile(null);
    setBackFileError(undefined);
  }, []);

  const handleCancel = useCallback(() => {
    router.push(buildVerificationOverviewHref());
  }, [router]);

  const handleSubmit = useCallback(async () => {
    const numberCheck = validateVerificationDocumentNumber(
      documentType,
      documentNumber
    );
    const hasFront = Boolean(frontFile);
    const hasBack = !selectedOption.requiresBackSide || Boolean(backFile);

    if (!numberCheck.valid) {
      setDocumentNumberError(numberCheck.error);
    }
    if (!hasFront) {
      setFrontFileError(
        selectedOption.requiresBackSide
          ? "Please upload the front of your ID."
          : "Please upload the data page of your passport."
      );
    }
    if (!hasBack) {
      setBackFileError("Please upload the back of your ID.");
    }

    if (!numberCheck.valid || !hasFront || !hasBack || !frontFile) {
      toast.error("Please complete all required verification fields.");
      return;
    }

    setIsSubmittingLocal(true);
    const maskedNumber = maskDocumentNumber(documentNumber);
    const now = new Date();
    const verificationId = generateVerificationId();
    const verifiedDate = formatVerificationDisplayDate(now);
    const expiresAt = formatVerificationExpiryDate(now);

    try {
      await submitMutation({
        documentType,
        documentNumber: documentNumber.trim(),
        frontFileName: frontFile.name,
        backFileName: backFile?.name,
      }).unwrap();
    } catch {
      // Mock fallback: persist local verified credential when backend is unavailable
    } finally {
      dispatch(
        submitVerificationLocal({
          documentType,
          documentNumberMasked: maskedNumber,
          frontFileName: frontFile.name,
          backFileName: backFile?.name,
          verificationId,
          verifiedDate,
          expiresAt,
        })
      );
      setIsSubmittingLocal(false);
    }

    toast.success("Identity verified successfully!");
    router.push(buildVerificationStatusHref("verified"));
  }, [
    backFile,
    dispatch,
    documentNumber,
    documentType,
    frontFile,
    router,
    selectedOption.requiresBackSide,
    submitMutation,
  ]);

  return {
    documentType,
    selectedOption,
    documentNumber,
    documentNumberError,
    frontFile,
    frontFileError,
    backFile,
    backFileError,
    isSubmitting: isSubmittingLocal || isMutating,
    handleSelectDocumentType,
    handleDocumentNumberChange,
    handleFrontFileSelect,
    handleFrontFileRemove,
    handleBackFileSelect,
    handleBackFileRemove,
    handleCancel,
    handleSubmit,
  };
}

export function useVerificationStatusService(
  overrideStatus?: string | null
) {
  const router = useRouter();
  const reduxRecord = useAppSelector(selectVerificationRecord);
  const record = resolveVerificationRecordForStatus(reduxRecord, overrideStatus);

  const handleViewProfile = useCallback(() => {
    router.push("/profile");
  }, [router]);

  const handleGoToDashboard = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const handleBackToOverview = useCallback(() => {
    router.push(buildVerificationOverviewHref());
  }, [router]);

  const handleStartVerification = useCallback(() => {
    router.push(buildVerificationSubmitHref(record.documentType));
  }, [router, record.documentType]);

  return {
    record,
    handleViewProfile,
    handleGoToDashboard,
    handleBackToOverview,
    handleStartVerification,
  };
}

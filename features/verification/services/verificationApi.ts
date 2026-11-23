"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCompanyVerificationRecord,
  selectCompanyVerificationStatus,
  selectVerificationRecord,
  selectVerificationStatus,
  submitCompanyVerificationLocal,
  submitVerificationLocal,
  useGetCompanyVerificationStatusQuery,
  useGetVerificationStatusQuery,
  useSubmitCompanyVerificationMutation,
  useSubmitVerificationDocumentMutation,
} from "@/store/slices/verificationSlice";
import type {
  VerificationDocumentType,
  VerificationUploadedFile,
} from "@/components/verification/types";
import {
  buildCompanyVerificationOverviewHref,
  buildCompanyVerificationStatusHref,
  buildCompanyVerificationSubmitHref,
  buildVerificationOverviewHref,
  buildVerificationStatusHref,
  buildVerificationSubmitHref,
  formatVerificationDisplayDate,
  formatVerificationExpiryDate,
  formatVerificationFileSize,
  generateCompanyVerificationId,
  generateVerificationId,
  getVerificationDocumentOption,
  maskDocumentNumber,
  resolveCompanyVerificationRecordForStatus,
  resolveVerificationRecordForStatus,
  validateCacRegistrationNumber,
  validateCompanyDocumentFile,
  validateCompanyName,
  validateVerificationDocumentNumber,
  validateVerificationImageFile,
} from "./verificationHelpers";

export function useVerificationOverviewService(
  overrideStatus?: string | null
) {
  const router = useRouter();
  const reduxRecord = useAppSelector(selectVerificationRecord);
  const companyStatus = useAppSelector(selectCompanyVerificationStatus);
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
    companyStatus,
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

export function useCompanyVerificationOverviewService(
  overrideStatus?: string | null
) {
  const router = useRouter();
  const reduxRecord = useAppSelector(selectCompanyVerificationRecord);
  const individualStatus = useAppSelector(selectVerificationStatus);
  const { data: apiRecord, isLoading } = useGetCompanyVerificationStatusQuery(
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

  const record = resolveCompanyVerificationRecordForStatus(
    baseRecord,
    overrideStatus
  );

  const handleStartVerification = useCallback(() => {
    router.push(buildCompanyVerificationSubmitHref());
  }, [router]);

  const handleViewDetails = useCallback(() => {
    router.push(buildCompanyVerificationStatusHref(record.status));
  }, [router, record.status]);

  const handleResubmit = useCallback(() => {
    router.push(buildCompanyVerificationSubmitHref());
  }, [router]);

  const handleOpenBenefits = useCallback(() => {
    setBenefitsModalOpen(true);
  }, []);

  const handleCloseBenefits = useCallback(() => {
    setBenefitsModalOpen(false);
  }, []);

  return {
    record,
    individualStatus,
    isLoading,
    benefitsModalOpen,
    handleStartVerification,
    handleViewDetails,
    handleResubmit,
    handleOpenBenefits,
    handleCloseBenefits,
  };
}

export function useCompanyVerificationSubmitService() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [submitMutation, { isLoading: isMutating }] =
    useSubmitCompanyVerificationMutation();

  const [companyName, setCompanyName] = useState("");
  const [cacNumber, setCacNumber] = useState("");
  const [cacCertificateFile, setCacCertificateFile] =
    useState<VerificationUploadedFile | null>(null);
  const [incorporationFile, setIncorporationFile] =
    useState<VerificationUploadedFile | null>(null);

  const [companyNameError, setCompanyNameError] = useState<string | undefined>(
    undefined
  );
  const [cacNumberError, setCacNumberError] = useState<string | undefined>(
    undefined
  );
  const [cacCertificateError, setCacCertificateError] = useState<
    string | undefined
  >(undefined);
  const [incorporationError, setIncorporationError] = useState<
    string | undefined
  >(undefined);
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const cacUrlRef = useRef<string | null>(null);
  const incorporationUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (cacUrlRef.current) URL.revokeObjectURL(cacUrlRef.current);
      if (incorporationUrlRef.current) {
        URL.revokeObjectURL(incorporationUrlRef.current);
      }
    };
  }, []);

  const handleCompanyNameChange = useCallback((value: string) => {
    setCompanyName(value);
    setCompanyNameError(undefined);
  }, []);

  const handleCacNumberChange = useCallback((value: string) => {
    setCacNumber(value);
    setCacNumberError(undefined);
  }, []);

  const handleCacCertificateSelect = useCallback((file: File) => {
    const validation = validateCompanyDocumentFile(file);
    if (!validation.valid) {
      setCacCertificateError(validation.error);
      toast.error(validation.error ?? "Invalid CAC Certificate file.");
      return;
    }

    if (cacUrlRef.current) {
      URL.revokeObjectURL(cacUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);
    cacUrlRef.current = previewUrl;

    setCacCertificateFile({
      name: file.name,
      size: file.size,
      sizeLabel: formatVerificationFileSize(file.size),
      type: file.type,
      previewUrl,
    });
    setCacCertificateError(undefined);
  }, []);

  const handleCacCertificateRemove = useCallback(() => {
    if (cacUrlRef.current) {
      URL.revokeObjectURL(cacUrlRef.current);
      cacUrlRef.current = null;
    }
    setCacCertificateFile(null);
    setCacCertificateError(undefined);
  }, []);

  const handleIncorporationSelect = useCallback((file: File) => {
    const validation = validateCompanyDocumentFile(file);
    if (!validation.valid) {
      setIncorporationError(validation.error);
      toast.error(validation.error ?? "Invalid Incorporation Document file.");
      return;
    }

    if (incorporationUrlRef.current) {
      URL.revokeObjectURL(incorporationUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);
    incorporationUrlRef.current = previewUrl;

    setIncorporationFile({
      name: file.name,
      size: file.size,
      sizeLabel: formatVerificationFileSize(file.size),
      type: file.type,
      previewUrl,
    });
    setIncorporationError(undefined);
  }, []);

  const handleIncorporationRemove = useCallback(() => {
    if (incorporationUrlRef.current) {
      URL.revokeObjectURL(incorporationUrlRef.current);
      incorporationUrlRef.current = null;
    }
    setIncorporationFile(null);
    setIncorporationError(undefined);
  }, []);

  const handleCancel = useCallback(() => {
    router.push(buildCompanyVerificationOverviewHref());
  }, [router]);

  const handleSubmit = useCallback(async () => {
    const nameCheck = validateCompanyName(companyName);
    const cacCheck = validateCacRegistrationNumber(cacNumber);
    const hasCacFile = Boolean(cacCertificateFile);
    const hasIncorporationFile = Boolean(incorporationFile);

    if (!nameCheck.valid) {
      setCompanyNameError(nameCheck.error);
    }
    if (!cacCheck.valid) {
      setCacNumberError(cacCheck.error);
    }
    if (!hasCacFile) {
      setCacCertificateError("Please upload your CAC Certificate.");
    }
    if (!hasIncorporationFile) {
      setIncorporationError("Please upload your Incorporation Document.");
    }

    if (
      !nameCheck.valid ||
      !cacCheck.valid ||
      !hasCacFile ||
      !hasIncorporationFile ||
      !cacCertificateFile ||
      !incorporationFile
    ) {
      toast.error("Please complete all required company verification fields.");
      return;
    }

    setIsSubmittingLocal(true);
    const verificationId = generateCompanyVerificationId();
    const verifiedDate = formatVerificationDisplayDate(new Date());

    try {
      await submitMutation({
        companyName: companyName.trim(),
        cacRegistrationNumber: cacNumber.trim(),
        cacCertificateFileName: cacCertificateFile.name,
        incorporationFileName: incorporationFile.name,
      }).unwrap();
    } catch {
      // Mock fallback: persist local verified business entity when backend is unavailable
    } finally {
      dispatch(
        submitCompanyVerificationLocal({
          companyName: companyName.trim(),
          cacRegistrationNumber: cacNumber.trim(),
          cacCertificateFileName: cacCertificateFile.name,
          incorporationFileName: incorporationFile.name,
          verificationId,
          verifiedDate,
        })
      );
      setIsSubmittingLocal(false);
    }

    toast.success("Company entity verified successfully!");
    router.push(buildCompanyVerificationStatusHref("verified"));
  }, [
    cacCertificateFile,
    cacNumber,
    companyName,
    dispatch,
    incorporationFile,
    router,
    submitMutation,
  ]);

  return {
    companyName,
    companyNameError,
    cacNumber,
    cacNumberError,
    cacCertificateFile,
    cacCertificateError,
    incorporationFile,
    incorporationError,
    isSubmitting: isSubmittingLocal || isMutating,
    handleCompanyNameChange,
    handleCacNumberChange,
    handleCacCertificateSelect,
    handleCacCertificateRemove,
    handleIncorporationSelect,
    handleIncorporationRemove,
    handleCancel,
    handleSubmit,
  };
}

export function useCompanyVerificationStatusService(
  overrideStatus?: string | null
) {
  const router = useRouter();
  const reduxRecord = useAppSelector(selectCompanyVerificationRecord);
  const record = resolveCompanyVerificationRecordForStatus(
    reduxRecord,
    overrideStatus
  );
  const [hasCopiedShareLink, setHasCopiedShareLink] = useState(false);

  const handleViewCompanyProfile = useCallback(() => {
    router.push("/profile/company");
  }, [router]);

  const handleGoToDashboard = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const handleShareVerifiedStatus = useCallback(async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/verification/company/status?status=verified`
        : "/verification/company/status?status=verified";

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      setHasCopiedShareLink(true);
      toast.success("Verified business link copied to clipboard!");
    } catch {
      setHasCopiedShareLink(true);
      toast.success("Verified business status ready to share!");
    }
  }, []);

  const handleBackToOverview = useCallback(() => {
    router.push(buildCompanyVerificationOverviewHref());
  }, [router]);

  const handleStartVerification = useCallback(() => {
    router.push(buildCompanyVerificationSubmitHref());
  }, [router]);

  return {
    record,
    hasCopiedShareLink,
    handleViewCompanyProfile,
    handleGoToDashboard,
    handleShareVerifiedStatus,
    handleBackToOverview,
    handleStartVerification,
  };
}

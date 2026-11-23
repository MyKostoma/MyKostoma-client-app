import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import type { RootState } from "../index";
import type {
  CompanyVerificationRecord,
  VerificationDocumentType,
  VerificationRecord,
} from "@/components/verification/types";
import type {
  SubmitCompanyVerificationPayload,
  SubmitVerificationPayload,
} from "@/features/verification/types";
import {
  DEFAULT_UNVERIFIED_COMPANY_RECORD,
  DEFAULT_UNVERIFIED_RECORD,
} from "@/features/verification/data";

export interface VerificationDraftMeta {
  documentType: VerificationDocumentType;
  documentNumberMasked: string;
  frontFileName: string;
  backFileName?: string;
}

export interface CompanyVerificationDraftMeta {
  companyName: string;
  cacRegistrationNumber: string;
  cacCertificateFileName: string;
  incorporationFileName: string;
}

export interface VerificationSliceState {
  record: VerificationRecord;
  lastSubmittedDraft: VerificationDraftMeta | null;
  companyRecord: CompanyVerificationRecord;
  lastCompanyDraft: CompanyVerificationDraftMeta | null;
}

const initialState: VerificationSliceState = {
  record: DEFAULT_UNVERIFIED_RECORD,
  lastSubmittedDraft: null,
  companyRecord: DEFAULT_UNVERIFIED_COMPANY_RECORD,
  lastCompanyDraft: null,
};

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    submitVerificationLocal: (
      state,
      action: PayloadAction<{
        documentType: VerificationDocumentType;
        documentNumberMasked: string;
        frontFileName: string;
        backFileName?: string;
        verificationId: string;
        verifiedDate: string;
        expiresAt: string;
      }>
    ) => {
      const {
        documentType,
        documentNumberMasked,
        frontFileName,
        backFileName,
        verificationId,
        verifiedDate,
        expiresAt,
      } = action.payload;

      state.record = {
        status: "verified",
        verificationId,
        verifiedDate,
        expiresAt,
        documentType,
        documentNumberMasked,
      };
      state.lastSubmittedDraft = {
        documentType,
        documentNumberMasked,
        frontFileName,
        backFileName,
      };
    },
    setVerificationRecordLocal: (
      state,
      action: PayloadAction<VerificationRecord>
    ) => {
      state.record = action.payload;
    },
    resetVerificationLocal: (state) => {
      state.record = DEFAULT_UNVERIFIED_RECORD;
      state.lastSubmittedDraft = null;
    },
    submitCompanyVerificationLocal: (
      state,
      action: PayloadAction<{
        companyName: string;
        cacRegistrationNumber: string;
        cacCertificateFileName: string;
        incorporationFileName: string;
        verificationId: string;
        verifiedDate: string;
      }>
    ) => {
      const {
        companyName,
        cacRegistrationNumber,
        cacCertificateFileName,
        incorporationFileName,
        verificationId,
        verifiedDate,
      } = action.payload;

      state.companyRecord = {
        status: "verified",
        verificationId,
        companyName,
        cacRegistrationNumber,
        verifiedDate,
        incorporationStatus: "Active Incorporation",
        documentsCount: state.record.status === "verified" ? 3 : 2,
      };
      state.lastCompanyDraft = {
        companyName,
        cacRegistrationNumber,
        cacCertificateFileName,
        incorporationFileName,
      };
    },
    setCompanyVerificationRecordLocal: (
      state,
      action: PayloadAction<CompanyVerificationRecord>
    ) => {
      state.companyRecord = action.payload;
    },
    resetCompanyVerificationLocal: (state) => {
      state.companyRecord = DEFAULT_UNVERIFIED_COMPANY_RECORD;
      state.lastCompanyDraft = null;
    },
  },
});

export const {
  submitVerificationLocal,
  setVerificationRecordLocal,
  resetVerificationLocal,
  submitCompanyVerificationLocal,
  setCompanyVerificationRecordLocal,
  resetCompanyVerificationLocal,
} = verificationSlice.actions;

export const selectVerificationRecord = (state: RootState) =>
  state.verification.record;
export const selectVerificationStatus = (state: RootState) =>
  state.verification.record.status;
export const selectIsProfessionalVerified = (state: RootState) =>
  state.verification.record.status === "verified";
export const selectLastSubmittedDraft = (state: RootState) =>
  state.verification.lastSubmittedDraft;

export const selectCompanyVerificationRecord = (state: RootState) =>
  state.verification.companyRecord;
export const selectCompanyVerificationStatus = (state: RootState) =>
  state.verification.companyRecord.status;
export const selectIsCompanyVerified = (state: RootState) =>
  state.verification.companyRecord.status === "verified";
export const selectLastCompanyDraft = (state: RootState) =>
  state.verification.lastCompanyDraft;

export const verificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVerificationStatus: builder.query<VerificationRecord, void>({
      query: () => "/verification/status",
      providesTags: ["Verification"],
    }),
    submitVerificationDocument: builder.mutation<
      VerificationRecord,
      SubmitVerificationPayload
    >({
      query: (body) => ({
        url: "/verification/submit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Verification", "Profile", "User"],
    }),
    getCompanyVerificationStatus: builder.query<
      CompanyVerificationRecord,
      void
    >({
      query: () => "/verification/company/status",
      providesTags: ["Verification"],
    }),
    submitCompanyVerification: builder.mutation<
      CompanyVerificationRecord,
      SubmitCompanyVerificationPayload
    >({
      query: (body) => ({
        url: "/verification/company/submit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Verification", "Profile", "User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetVerificationStatusQuery,
  useSubmitVerificationDocumentMutation,
  useGetCompanyVerificationStatusQuery,
  useSubmitCompanyVerificationMutation,
} = verificationApi;

export default verificationSlice.reducer;

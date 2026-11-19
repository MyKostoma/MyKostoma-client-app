import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import type { RootState } from "../index";
import type {
  VerificationDocumentType,
  VerificationRecord,
} from "@/components/verification/types";
import type { SubmitVerificationPayload } from "@/features/verification/types";
import { DEFAULT_UNVERIFIED_RECORD } from "@/features/verification/data";

export interface VerificationDraftMeta {
  documentType: VerificationDocumentType;
  documentNumberMasked: string;
  frontFileName: string;
  backFileName?: string;
}

export interface VerificationSliceState {
  record: VerificationRecord;
  lastSubmittedDraft: VerificationDraftMeta | null;
}

const initialState: VerificationSliceState = {
  record: DEFAULT_UNVERIFIED_RECORD,
  lastSubmittedDraft: null,
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
  },
});

export const {
  submitVerificationLocal,
  setVerificationRecordLocal,
  resetVerificationLocal,
} = verificationSlice.actions;

export const selectVerificationRecord = (state: RootState) =>
  state.verification.record;
export const selectVerificationStatus = (state: RootState) =>
  state.verification.record.status;
export const selectIsProfessionalVerified = (state: RootState) =>
  state.verification.record.status === "verified";
export const selectLastSubmittedDraft = (state: RootState) =>
  state.verification.lastSubmittedDraft;

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
  }),
  overrideExisting: false,
});

export const {
  useGetVerificationStatusQuery,
  useSubmitVerificationDocumentMutation,
} = verificationApi;

export default verificationSlice.reducer;

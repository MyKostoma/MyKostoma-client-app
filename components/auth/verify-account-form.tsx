"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/form-fields";
import { AuthCard } from "./auth-card";
import { AuthSuccess } from "./auth-success";
import { useAuthService } from "@/features/auth/services/authApi";
import { formatCountdownTime } from "@/features/auth/services/authHelpers";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

export function VerifyAccountForm() {
  const { loading, destinationMeta, handleVerifyCode, handleResendCode } =
    useAuthService();

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [otpKey, setOtpKey] = useState(0);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleVerify = async () => {
    if (error) {
      setError(null);
      setCode("");
      setOtpKey((k) => k + 1);
      return;
    }
    if (code.length < CODE_LENGTH) return;
    const res = await handleVerifyCode(code);
    if (res.ok) {
      setVerified(true);
    } else {
      setError(res.message);
    }
  };

  const handleResend = async () => {
    await handleResendCode();
    setSeconds(RESEND_SECONDS);
    setError(null);
  };

  if (verified) {
    return (
      <AuthSuccess
        destinationLabel={destinationMeta.destinationLabel}
        roleLabel={destinationMeta.roleLabel}
        href={destinationMeta.href}
      />
    );
  }

  const canResend = seconds === 0;

  return (
    <AuthCard
      title="Verify your account"
      subtitle="Enter the 6-digit code sent to your email/phone."
    >
      <div className="flex justify-center">
        <OtpInput
          key={otpKey}
          length={CODE_LENGTH}
          defaultValue=""
          value={code}
          onChange={(v) => {
            setCode(v);
            if (error) setError(null);
          }}
          className="gap-2 sm:gap-3"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-md border border-border bg-muted/40 p-3 text-left text-xs text-destructive"
        >
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-4 flex flex-col items-center gap-1">
        {!error && (
          <p className="text-xs text-muted-foreground">
            Resend code in{" "}
            <span className="font-bold text-foreground">
              {formatCountdownTime(seconds)}
            </span>
          </p>
        )}
        <Button
          type="button"
          variant="link"
          size="sm"
          disabled={!canResend}
          onClick={handleResend}
        >
          Resend Code
        </Button>
      </div>

      <div className="mt-5 border-t border-border pt-5">
        <Button
          className="w-full"
          loading={loading}
          disabled={!error && code.length < CODE_LENGTH}
          trailingIcon={error ? <RefreshCw /> : <ArrowRight />}
          onClick={handleVerify}
        >
          {error ? "Try Again" : "Verify"}
        </Button>
        <div className="mt-4 flex justify-center">
          <Button asChild variant="link" size="sm">
            <Link href="/login">Back to Login</Link>
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}

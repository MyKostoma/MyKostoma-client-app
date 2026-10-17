"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Label,
  Input,
  PasswordInput,
  SearchInput,
  NumberInput,
  Textarea,
  Select,
  Switch,
  SwitchRow,
  Checkbox,
  Radio,
  OtpInput,
  FileUpload,
  FileAttachmentItem,
  FormHelperText,
  FormErrorMessage,
} from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  AlertCircle,
  CheckCircle2,
  CheckCircle,
} from "lucide-react";

export function FormShowcase() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Form states for interactivity
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("secretpassword");
  const [searchVal, setSearchVal] = useState("");
  const [numberVal, setNumberVal] = useState<number>(10);
  const [textareaVal, setTextareaVal] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("option-1");
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<"standard" | "express">(
    "standard"
  );
  const [otpValue, setOtpValue] = useState("52");
  const [uploadedFile, setUploadedFile] = useState<string | null>("report_v1.pdf");

  // Night Mode Controls state
  const [darkStatus, setDarkStatus] = useState(true);
  const [darkOption, setDarkOption] = useState<"pro" | "basic">("pro");
  const [darkFileAttached, setDarkFileAttached] = useState<boolean>(true);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
          setIsDark(true);
        } else {
          document.documentElement.classList.remove("dark");
          setIsDark(false);
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
    }
  };

  const selectOptions = [
    { value: "option-1", label: "Select an option" },
    { value: "personal", label: "Personal Account" },
    { value: "business", label: "Business Organization" },
    { value: "enterprise", label: "Enterprise Subscription" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-10 space-y-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          {/* Identity Tag */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border/70 bg-card text-foreground shadow-2xs mb-3">
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="8" height="8" rx="2" fill="#E8175C" />
              <rect x="13" y="3" width="8" height="8" rx="2" fill="#E86040" />
              <rect x="3" y="13" width="8" height="8" rx="2" fill="#3B82F6" />
              <circle cx="17" cy="17" r="4" fill="#22C55E" />
            </svg>
            <span className="text-xs font-semibold tracking-tight">identity</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            MyKostoma{" "}
            <span className="text-primary transition-colors">Form System</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Standardized input fields and form controls for data entry and configuration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground border border-border/80">
            V1.0.0
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            aria-label={
              mounted && isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            leadingIcon={
              mounted && isDark ? (
                <Sun className="size-4 text-warning" />
              ) : (
                <Moon className="size-4 text-foreground" />
              )
            }
            className="transition-colors shadow-2xs"
          >
            {mounted && isDark ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </div>

      {/* 01 Text Inputs & Textarea */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-primary rounded-full inline-block transition-colors" />
          01 Text Inputs & Textarea
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Column 1 */}
          <div className="space-y-6">
            {/* Username */}
            <div>
              <Label htmlFor="username" required>
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormHelperText>
                Pick a unique username for your profile.
              </FormHelperText>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Search Field */}
            <div>
              <Label htmlFor="search-field">Search Field</Label>
              <SearchInput
                id="search-field"
                placeholder="Search resources..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            {/* Disabled State */}
            <div>
              <Label htmlFor="disabled-input">Disabled State</Label>
              <Input
                id="disabled-input"
                disabled
                defaultValue="Read only data"
                state="disabled"
              />
            </div>

            {/* Error State */}
            <div>
              <Label htmlFor="error-input" state="error">
                Error State
              </Label>
              <Input
                id="error-input"
                state="error"
                defaultValue="invalid-email"
              />
              <FormHelperText state="error">
                Please enter a valid email address.
              </FormHelperText>
            </div>

            {/* Success State */}
            <div>
              <Label htmlFor="success-input" state="success">
                Success State
              </Label>
              <Input
                id="success-input"
                state="success"
                defaultValue="Valid input"
                trailingIcon={
                  <CheckCircle2 className="size-4 text-success" />
                }
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            {/* Textarea */}
            <div>
              <Label htmlFor="textarea-field">Textarea</Label>
              <Textarea
                id="textarea-field"
                placeholder="Tell us more..."
                value={textareaVal}
                onChange={(e) => setTextareaVal(e.target.value)}
                className="h-28"
              />
            </div>

            {/* Number Input */}
            <div>
              <Label htmlFor="number-input">Number Input</Label>
              <NumberInput
                id="number-input"
                value={numberVal}
                onValueChange={(val) => setNumberVal(val)}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02 Selection Controls */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-primary rounded-full inline-block transition-colors" />
          02 Selection Controls
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Column 1: Select & Switches */}
          <div className="space-y-6">
            {/* Standard Select */}
            <div>
              <Label id="select-label">Standard Select</Label>
              <Select
                options={selectOptions}
                value={selectedOption}
                onChange={(val) => setSelectedOption(val)}
                placeholder="Select an option"
              />
            </div>

            {/* Switch / Toggle */}
            <div className="space-y-3">
              <Label>Switch / Toggle</Label>
              <div className="space-y-2.5">
                <SwitchRow
                  label="Push Notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
                <SwitchRow
                  label="Email Updates"
                  checked={emailUpdates}
                  onCheckedChange={setEmailUpdates}
                />
              </div>
            </div>
          </div>

          {/* Column 2: Checkboxes & Radios */}
          <div className="space-y-6">
            {/* Checkbox Group */}
            <div>
              <Label>Checkbox Group</Label>
              <div className="flex flex-col gap-3 mt-1">
                <Checkbox
                  id="cb-terms"
                  label="Terms and Conditions"
                  checked={termsAccepted}
                  onCheckedChange={setTermsAccepted}
                />
                <Checkbox
                  id="cb-newsletter"
                  label="Subscribe to newsletter"
                  checked={newsletterSubscribed}
                  onCheckedChange={setNewsletterSubscribed}
                />
                <Checkbox
                  id="cb-beta"
                  label="Beta features"
                  disabled
                  checked={false}
                />
              </div>
            </div>

            {/* Radio Group */}
            <div>
              <Label>Radio Group</Label>
              <div className="flex flex-col gap-3 mt-1">
                <Radio
                  id="radio-standard"
                  name="shipping"
                  value="standard"
                  label="Standard Delivery"
                  checked={selectedShipping === "standard"}
                  onChange={() => setSelectedShipping("standard")}
                />
                <Radio
                  id="radio-express"
                  name="shipping"
                  value="express"
                  label="Express Shipping"
                  checked={selectedShipping === "express"}
                  onChange={() => setSelectedShipping("express")}
                />
              </div>
            </div>
          </div>

          {/* Column 3: OTP & File Upload */}
          <div className="space-y-6">
            {/* OTP Verification */}
            <div>
              <Label>OTP Verification (4-digit)</Label>
              <div className="mt-1">
                <OtpInput
                  length={4}
                  value={otpValue}
                  onChange={setOtpValue}
                />
              </div>
            </div>

            {/* File Upload */}
            <div>
              <Label>File Upload</Label>
              <div className="mt-1">
                <FileUpload
                  onFilesSelected={(files) => {
                    if (files && files[0]) {
                      setUploadedFile(files[0].name);
                    }
                  }}
                  title="Click to upload or drag & drop"
                  subtitle="PNG, JPG, or PDF (max. 5MB)"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Dark Theme Inputs */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-primary rounded-full inline-block transition-colors" />
          03 Dark Theme Inputs
        </h2>

        {/* Night Mode Container */}
        <div className="rounded-2xl bg-background text-foreground p-6 md:p-8 border border-border shadow-xl space-y-6">
          {/* Header row inside dark box */}
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div className="flex items-center gap-2">
              <Moon className="size-4 text-primary" />
              <span className="font-semibold text-sm text-foreground">
                Night Mode Controls
              </span>
            </div>
            <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
              ACCENT: #E86040
            </span>
          </div>

          {/* Content inside dark box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column */}
            <div className="space-y-5">
              {/* Account ID */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Account ID
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue="MYK-882910"
                  className="w-full h-10.5 px-3.5 text-sm rounded-md bg-background border border-border text-foreground font-mono focus:outline-none hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              {/* Security Phrase */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Security Phrase
                </label>
                <textarea
                  placeholder="Enter recovery phrase..."
                  rows={3}
                  className="w-full min-h-[96px] p-3.5 text-sm rounded-md bg-background border border-border text-foreground placeholder:text-zinc-500 focus:outline-none hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Status and Option row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Status Toggle */}
                <div>
                  <span className="block text-xs font-medium text-zinc-400 mb-2">
                    Status
                  </span>
                  <div className="flex items-center gap-2.5">
                    <Switch
                      checked={darkStatus}
                      onCheckedChange={setDarkStatus}
                      colorVariant="coral"
                      aria-label="Active Status"
                    />
                    <span className="text-sm font-medium text-zinc-200">
                      Active
                    </span>
                  </div>
                </div>

                {/* Option Radio */}
                <div>
                  <span className="block text-xs font-medium text-zinc-400 mb-2">
                    Option
                  </span>
                  <div className="flex items-center gap-2.5">
                    <Radio
                      checked={darkOption === "pro"}
                      onChange={() => setDarkOption("pro")}
                      colorVariant="coral"
                      name="darkOption"
                      value="pro"
                      label={<span className="text-zinc-200">Pro Tier</span>}
                    />
                  </div>
                </div>
              </div>

              {/* File Attachment */}
              <div>
                <span className="block text-xs font-medium text-zinc-400 mb-2">
                  File Attachment
                </span>
                {darkFileAttached ? (
                  <FileAttachmentItem
                    fileName="report_v1.pdf"
                    fileSize="2.4 MB"
                    statusText="Uploaded"
                    colorVariant="coral"
                    onRemove={() => setDarkFileAttached(false)}
                    className="bg-background border-border text-zinc-200 hover:border-zinc-700"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setDarkFileAttached(true)}
                    className="text-xs text-[#E86040] hover:underline cursor-pointer"
                  >
                    + Reattach report_v1.pdf
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

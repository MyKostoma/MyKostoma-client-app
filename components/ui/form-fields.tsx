"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Eye,
    EyeOff,
    Search,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    CheckCircle2,
    Check,
    UploadCloud,
    FileText,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ============================================================================
// 1. LABEL COMPONENT
// ============================================================================

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    state?: "default" | "error" | "success" | "disabled";
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, required, state = "default", children, ...props }, ref) => {
        return (
            <label
                ref={ref}
                className={cn(
                    "block text-xs leading-4 font-semibold tracking-tight select-none mb-1.5 transition-colors",
                    state === "error" && "text-error",
                    state === "success" && "text-success",
                    state === "disabled" && "text-muted-foreground/70",
                    state === "default" && "text-foreground",
                    className
                )}
                {...props}
            >
                {children}
                {required && <span className="text-error ml-1 font-bold">*</span>}
            </label>
        );
    }
);
Label.displayName = "Label";

// ============================================================================
// 2. INPUT COMPONENT
// ============================================================================

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    state?: "default" | "error" | "success" | "disabled";
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type = "text",
            state = "default",
            leadingIcon,
            trailingIcon,
            disabled,
            ...props
        },
        ref
    ) => {
        const isError = state === "error";
        const isSuccess = state === "success";
        const isDisabled = disabled || state === "disabled";

        return (
            <div className="relative flex items-center w-full">
                {leadingIcon && (
                    <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground/80">
                        {leadingIcon}
                    </div>
                )}

                <input
                    type={type}
                    ref={ref}
                    disabled={isDisabled}
                    className={cn(
                        "w-full h-10 px-3 text-sm rounded-md transition-all duration-150 outline-none",
                        "border bg-card text-foreground",
                        // Focus ring
                        "focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:border-ring",
                        // Default border
                        "border-input shadow-2xs hover:border-muted-foreground/40",
                        // Error State
                        isError &&
                        "border-error bg-error-bg text-destructive-active focus-visible:border-error focus-visible:ring-error/20",
                        // Success State
                        isSuccess &&
                        "border-success bg-success-bg text-success placeholder:text-success/60 focus-visible:border-success focus-visible:ring-success/20",
                        // Disabled State
                        isDisabled &&
                        "bg-muted text-muted-foreground border-border cursor-not-allowed hover:border-border shadow-none select-none",
                        // Padding adjustments for icons
                        leadingIcon && "pl-8",
                        trailingIcon && "pr-8",
                        className
                    )}
                    {...props}
                />

                {trailingIcon && (
                    <div className="absolute right-3 flex items-center pointer-events-none text-muted-foreground/80">
                        {trailingIcon}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

// ============================================================================
// 3. PASSWORD INPUT COMPONENT
// ============================================================================

export interface PasswordInputProps extends Omit<InputProps, "type" | "trailingIcon"> {
    defaultShowPassword?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, defaultShowPassword = false, disabled, state, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(defaultShowPassword);
        const isDisabled = disabled || state === "disabled";

        return (
            <div className="relative flex items-center w-full">
                <Input
                    type={showPassword ? "text" : "password"}
                    ref={ref}
                    disabled={isDisabled}
                    state={state}
                    className={cn("pr-10", className)}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => !isDisabled && setShowPassword(!showPassword)}
                    disabled={isDisabled}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className={cn(
                        "absolute right-3 p-1 rounded-sm text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer",
                        isDisabled && "opacity-40 cursor-not-allowed"
                    )}
                >
                    {showPassword ? (
                        <EyeOff className="size-4" />
                    ) : (
                        <Eye className="size-4" />
                    )}
                </button>
            </div>
        );
    }
);
PasswordInput.displayName = "PasswordInput";

// ============================================================================
// 4. SEARCH INPUT COMPONENT
// ============================================================================

export interface SearchInputProps extends InputProps { }

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className, placeholder = "Search resources...", ...props }, ref) => {
        return (
            <Input
                ref={ref}
                type="search"
                placeholder={placeholder}
                leadingIcon={<Search className="size-3 text-muted-foreground/70" />}
                className={cn(className)}
                {...props}
            />
        );
    }
);
SearchInput.displayName = "SearchInput";

// ============================================================================
// 5. NUMBER INPUT COMPONENT
// ============================================================================

export interface NumberInputProps
    extends Omit<InputProps, "type" | "trailingIcon" | "value" | "defaultValue"> {
    value?: number | string;
    defaultValue?: number | string;
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (val: number) => void;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            className,
            value,
            defaultValue = 10,
            min,
            max,
            step = 1,
            disabled,
            state,
            onChange,
            onValueChange,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = useState<number | string>(
            value !== undefined ? value : defaultValue
        );

        useEffect(() => {
            if (value !== undefined) {
                setInternalValue(value);
            }
        }, [value]);

        const isDisabled = disabled || state === "disabled";

        const updateValue = (nextVal: number) => {
            let constrained = nextVal;
            if (min !== undefined && constrained < min) constrained = min;
            if (max !== undefined && constrained > max) constrained = max;

            setInternalValue(constrained);
            onValueChange?.(constrained);
        };

        const handleIncrement = () => {
            if (isDisabled) return;
            const current = Number(internalValue) || 0;
            updateValue(current + step);
        };

        const handleDecrement = () => {
            if (isDisabled) return;
            const current = Number(internalValue) || 0;
            updateValue(current - step);
        };

        return (
            <div className="relative flex items-center w-full">
                <Input
                    type="number"
                    ref={ref}
                    value={internalValue}
                    min={min}
                    max={max}
                    step={step}
                    disabled={isDisabled}
                    state={state}
                    onChange={(e) => {
                        setInternalValue(e.target.value);
                        onChange?.(e);
                        const parsed = parseFloat(e.target.value);
                        if (!isNaN(parsed)) {
                            onValueChange?.(parsed);
                        }
                    }}
                    className={cn(
                        "pr-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                        className
                    )}
                    {...props}
                />
                <div className="absolute right-1 top-1 bottom-1 flex flex-col justify-center border-l border-border/40 pl-1 pr-1">
                    <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={isDisabled}
                        tabIndex={-1}
                        aria-label="Increase value"
                        className="flex items-center justify-center h-4 text-muted-foreground/70 hover:text-foreground transition-colors hover:bg-muted/80 rounded-xs px-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ChevronUp className="size-3.5 stroke-[2.5]" />
                    </button>
                    <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={isDisabled}
                        tabIndex={-1}
                        aria-label="Decrease value"
                        className="flex items-center justify-center h-4 text-muted-foreground/70 hover:text-foreground transition-colors hover:bg-muted/80 rounded-xs px-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ChevronDown className="size-3.5 stroke-[2.5]" />
                    </button>
                </div>
            </div>
        );
    }
);
NumberInput.displayName = "NumberInput";

// ============================================================================
// 6. TEXTAREA COMPONENT
// ============================================================================

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    state?: "default" | "error" | "success" | "disabled";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, state = "default", disabled, ...props }, ref) => {
        const isError = state === "error";
        const isSuccess = state === "success";
        const isDisabled = disabled || state === "disabled";

        return (
            <textarea
                ref={ref}
                disabled={isDisabled}
                className={cn(
                    "w-full min-h-24 p-3.5 text-sm rounded-md transition-all duration-150 outline-none resize-y",
                    "border bg-card text-foreground",
                    // Focus ring
                    "focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:border-ring",
                    // Default border
                    "border-input shadow-2xs hover:border-muted-foreground/40",
                    // Error State
                    isError &&
                    "border-error bg-error-bg text-error focus-visible:border-error focus-visible:ring-error/20",
                    // Success State
                    isSuccess &&
                    "border-success bg-success-bg text-success focus-visible:border-success focus-visible:ring-success/20",
                    // Disabled State
                    isDisabled &&
                    "bg-muted text-muted-foreground border-border cursor-not-allowed hover:border-border shadow-none select-none",
                    className
                )}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";

// ============================================================================
// 7. SELECT COMPONENT
// ============================================================================

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    state?: "default" | "error" | "success" | "disabled";
    className?: string;
    id?: string;
}

export const Select: React.FC<SelectProps> = ({
    options,
    value,
    defaultValue,
    placeholder = "Select an option",
    onChange,
    disabled,
    state = "default",
    className,
    id,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
        value !== undefined ? value : defaultValue
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    const isDisabled = disabled || state === "disabled";
    const selectedOption = options.find((opt) => opt.value === selectedValue);

    const handleSelect = (optValue: string) => {
        setSelectedValue(optValue);
        onChange?.(optValue);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                id={id}
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className={cn(
                    "w-full h-10.5 px-3.5 text-sm rounded-md transition-all duration-150 outline-none flex items-center justify-between",
                    "border bg-card text-foreground cursor-pointer shadow-2xs",
                    "hover:border-muted-foreground/40",
                    isOpen && "border-ring ring-2 ring-ring/25",
                    state === "error" && "border-error bg-error-bg text-error",
                    state === "success" && "border-success bg-success-bg text-success",
                    isDisabled &&
                    "bg-muted/70 text-muted-foreground/80 border-border cursor-not-allowed hover:border-border shadow-none",
                    className
                )}
            >
                <span
                    className={cn(
                        "truncate text-left",
                        !selectedOption && "text-muted-foreground/60"
                    )}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={cn(
                        "size-4 text-muted-foreground transition-transform duration-200 shrink-0 ml-2",
                        isOpen && "rotate-180 text-foreground"
                    )}
                />
            </button>

            {isOpen && !isDisabled && (
                <div className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 py-1">
                    {options.map((option) => {
                        const isSelected = option.value === selectedValue;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                disabled={option.disabled}
                                onClick={() => handleSelect(option.value)}
                                className={cn(
                                    "w-full px-3.5 py-2.5 text-sm text-left flex items-center justify-between transition-colors cursor-pointer",
                                    "hover:bg-muted active:bg-secondary",
                                    isSelected && "bg-primary/10 text-primary font-medium",
                                    option.disabled &&
                                    "opacity-40 cursor-not-allowed hover:bg-transparent"
                                )}
                            >
                                <span>{option.label}</span>
                                {isSelected && <Check className="size-4 text-primary shrink-0" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
Select.displayName = "Select";

// ============================================================================
// 8. SWITCH / TOGGLE COMPONENT
// ============================================================================

export interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
    name?: string;
    className?: string;
    colorVariant?: "primary" | "coral" | "success";
    "aria-label"?: string;
}

export const Switch: React.FC<SwitchProps> = ({
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    id,
    name,
    className,
    colorVariant = "primary",
    "aria-label": ariaLabel,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(
        checked !== undefined ? checked : defaultChecked
    );

    useEffect(() => {
        if (checked !== undefined) {
            setIsChecked(checked);
        }
    }, [checked]);

    const toggle = () => {
        if (disabled) return;
        const nextState = !isChecked;
        if (checked === undefined) {
            setIsChecked(nextState);
        }
        onCheckedChange?.(nextState);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isChecked}
            aria-label={ariaLabel}
            disabled={disabled}
            id={id}
            name={name}
            onClick={toggle}
            className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none select-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                // Active state background
                isChecked
                    ? colorVariant === "coral"
                        ? "bg-[#E86040]"
                        : colorVariant === "success"
                            ? "bg-success"
                            : "bg-primary"
                    : "bg-input hover:bg-muted-foreground/30",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            <span
                className={cn(
                    "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out my-auto ml-0.5",
                    isChecked ? "translate-x-5" : "translate-x-0"
                )}
            />
        </button>
    );
};
Switch.displayName = "Switch";

// ============================================================================
// 9. SWITCH ROW CONTAINER
// ============================================================================

export interface SwitchRowProps {
    label: string;
    description?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    colorVariant?: "primary" | "coral" | "success";
}

export const SwitchRow: React.FC<SwitchRowProps> = ({
    label,
    description,
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    className,
    colorVariant = "primary",
}) => {
    return (
        <div
            className={cn(
                "flex items-center justify-between rounded-lg bg-secondary/80 border border-border px-4 py-3 transition-colors hover:bg-secondary",
                disabled && "opacity-60 cursor-not-allowed",
                className
            )}
        >
            <div className="flex flex-col pr-3">
                <span className="text-xs font-medium text-foreground">{label}</span>
                {description && (
                    <span className="text-xs text-muted-foreground mt-0.5">
                        {description}
                    </span>
                )}
            </div>
            <Switch
                checked={checked}
                defaultChecked={defaultChecked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
                colorVariant={colorVariant}
                aria-label={label}
            />
        </div>
    );
};
SwitchRow.displayName = "SwitchRow";

// ============================================================================
// 10. CHECKBOX COMPONENT
// ============================================================================

export interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
    label?: React.ReactNode;
    className?: string;
    name?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
    (
        {
            checked,
            defaultChecked = false,
            onCheckedChange,
            disabled = false,
            id,
            label,
            className,
            name,
        },
        ref
    ) => {
        const [isChecked, setIsChecked] = useState<boolean>(
            checked !== undefined ? checked : defaultChecked
        );

        useEffect(() => {
            if (checked !== undefined) {
                setIsChecked(checked);
            }
        }, [checked]);

        const toggle = () => {
            if (disabled) return;
            const next = !isChecked;
            if (checked === undefined) {
                setIsChecked(next);
            }
            onCheckedChange?.(next);
        };

        return (
            <div className="inline-flex items-center gap-3 select-none">
                <button
                    type="button"
                    role="checkbox"
                    ref={ref}
                    aria-checked={isChecked}
                    disabled={disabled}
                    id={id}
                    name={name}
                    onClick={toggle}
                    className={cn(
                        "size-4 rounded-[4px] border-2 transition-all duration-150 flex items-center justify-center outline-none shrink-0 cursor-pointer",
                        "focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:border-ring",
                        isChecked
                            ? "bg-primary border-primary text-primary-foreground shadow-2xs"
                            : "border-input bg-card hover:border-muted-foreground/60 shadow-2xs",
                        disabled &&
                        "opacity-40 cursor-not-allowed bg-muted border-border shadow-none",
                        className
                    )}
                >
                    {isChecked && <Check className="size-2.5 stroke-3 text-white" />}
                </button>
                {label && (
                    <label
                        htmlFor={id}
                        onClick={toggle}
                        className={cn(
                            "text-sm leading-5 font-medium cursor-pointer transition-colors",
                            disabled
                                ? "text-muted-foreground/70 cursor-not-allowed"
                                : "text-foreground hover:text-foreground"
                        )}
                    >
                        {label}
                    </label>
                )}
            </div>
        );
    }
);
Checkbox.displayName = "Checkbox";

// ============================================================================
// 11. RADIO COMPONENT & RADIO GROUP
// ============================================================================

export interface RadioProps {
    checked?: boolean;
    onChange?: () => void;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    label?: React.ReactNode;
    colorVariant?: "primary" | "coral";
    className?: string;
}

export const Radio: React.FC<RadioProps> = ({
    checked = false,
    onChange,
    disabled = false,
    id,
    name,
    value,
    label,
    colorVariant = "primary",
    className,
}) => {
    return (
        <div className="inline-flex items-center gap-3 select-none">
            <button
                type="button"
                role="radio"
                aria-checked={checked}
                disabled={disabled}
                id={id}
                name={name}
                value={value}
                onClick={() => !disabled && onChange?.()}
                className={cn(
                    "size-4 rounded-full border-2 flex items-center justify-center outline-none transition-all duration-150 shrink-0 cursor-pointer",
                    "focus-visible:ring-2 focus-visible:ring-ring/30",
                    checked
                        ? colorVariant === "coral"
                            ? "border-[#E86040]"
                            : "border-primary"
                        : "border-input hover:border-muted-foreground/60 bg-transparent",
                    disabled && "opacity-40 cursor-not-allowed",
                    className
                )}
            >
                {checked && (
                    <span
                        className={cn(
                            "size-2 rounded-full",
                            colorVariant === "coral" ? "bg-[#E86040]" : "bg-primary"
                        )}
                    />
                )}
            </button>
            {label && (
                <span
                    onClick={() => !disabled && onChange?.()}
                    className={cn(
                        "text-sm font-medium cursor-pointer transition-colors leading-none",
                        disabled
                            ? "text-muted-foreground/50 cursor-not-allowed"
                            : "text-foreground hover:text-foreground/90"
                    )}
                >
                    {label}
                </span>
            )}
        </div>
    );
};
Radio.displayName = "Radio";

// ============================================================================
// 12. OTP INPUT COMPONENT (4-digit default)
// ============================================================================

export interface OtpInputProps {
    length?: number;
    value?: string;
    defaultValue?: string;
    onChange?: (val: string) => void;
    disabled?: boolean;
    className?: string;
}

export const OtpInput: React.FC<OtpInputProps> = ({
    length = 4,
    value,
    defaultValue = "52",
    onChange,
    disabled = false,
    className,
}) => {
    const [internalOtp, setInternalOtp] = useState<string[]>(() => {
        const initial = value !== undefined ? value : defaultValue;
        const arr = new Array(length).fill("");
        for (let i = 0; i < Math.min(initial.length, length); i++) {
            arr[i] = initial[i];
        }
        return arr;
    });

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (value !== undefined) {
            const arr = new Array(length).fill("");
            for (let i = 0; i < Math.min(value.length, length); i++) {
                arr[i] = value[i];
            }
            setInternalOtp(arr);
        }
    }, [value, length]);

    const handleChange = (index: number, char: string) => {
        if (disabled) return;
        const digit = char.replace(/\D/g, "").slice(-1);
        const newOtp = [...internalOtp];
        newOtp[index] = digit;
        setInternalOtp(newOtp);
        onChange?.(newOtp.join(""));

        // Auto advance
        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace") {
            if (!internalOtp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text/plain").replace(/\D/g, "");
        if (!pasted) return;

        const newOtp = [...internalOtp];
        for (let i = 0; i < length; i++) {
            newOtp[i] = pasted[i] || "";
        }
        setInternalOtp(newOtp);
        onChange?.(newOtp.join(""));

        const nextIndex = Math.min(pasted.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
    };

    return (
        <div
            className={cn("flex w-full items-center justify-center gap-2 sm:gap-3", className)}
            onPaste={handlePaste}
        >
            {internalOtp.map((digit, idx) => {
                const isFilled = digit.length > 0;
                return (
                    <input
                        key={idx}
                        ref={(el) => {
                            inputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        disabled={disabled}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className={cn(
                            "min-w-0 flex-1 aspect-square max-w-12 md:max-w-13 rounded-lg p-0 text-center font-bold text-base sm:text-lg md:text-xl outline-none transition-all duration-150",
                            "border-2 bg-card text-foreground shadow-2xs",
                            // Active / Filled purple/primary ring border from Figma
                            isFilled
                                ? "border-primary ring-2 ring-primary/20 text-foreground font-bold"
                                : "border-input hover:border-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20",
                            disabled && "opacity-50 cursor-not-allowed bg-muted border-border"
                        )}
                        aria-label={`Digit ${idx + 1}`}
                    />
                );
            })}
        </div>
    );
};
OtpInput.displayName = "OtpInput";

// ============================================================================
// 13. FILE UPLOAD / DROPZONE COMPONENT
// ============================================================================

export interface FileUploadProps {
    onFilesSelected?: (files: FileList | null) => void;
    accept?: string;
    title?: string;
    subtitle?: string;
    disabled?: boolean;
    className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    onFilesSelected,
    accept = ".png,.jpg,.jpeg,.pdf",
    title = "Click to upload or drag & drop",
    subtitle = "PNG, JPG, or PDF (max. 5MB)",
    disabled = false,
    className,
}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (!disabled && e.dataTransfer.files) {
            onFilesSelected?.(e.dataTransfer.files);
        }
    };

    return (
        <div
            onClick={() => !disabled && inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
                "relative flex flex-col items-center justify-center p-6 md:p-8 rounded-xl text-center border-2 border-dashed transition-all duration-150 cursor-pointer select-none",
                "bg-secondary-hover hover:bg-secondary border-border hover:border-primary/60",
                isDragOver && "border-primary bg-primary/5 ring-4 ring-primary/10",
                disabled && "opacity-50 cursor-not-allowed hover:bg-secondary/20",
                className
            )}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                disabled={disabled}
                className="hidden"
                onChange={(e) => onFilesSelected?.(e.target.files)}
            />
            <div className="flex items-center justify-center size-10 rounded-full bg-secondary/80 text-muted-foreground/80 mb-3 shadow-2xs">
                <UploadCloud className="size-5" />
            </div>
            <p className="text-sm font-semibold text-foreground tracking-tight">
                {title}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
    );
};
FileUpload.displayName = "FileUpload";

// ============================================================================
// 14. FILE ATTACHMENT CARD (FOR NIGHT / DARK THEME & UPLOADED LISTS)
// ============================================================================

export interface FileAttachmentItemProps {
    fileName?: string;
    fileSize?: string;
    statusText?: string;
    onRemove?: () => void;
    className?: string;
    colorVariant?: "primary" | "coral";
}

export const FileAttachmentItem: React.FC<FileAttachmentItemProps> = ({
    fileName = "report_v1.pdf",
    fileSize = "2.4 MB",
    statusText = "Uploaded",
    onRemove,
    className,
    colorVariant = "coral",
}) => {
    return (
        <div
            className={cn(
                "flex items-center justify-between rounded-lg px-2.5 py-4 sm:px-4 sm:py-5 transition-colors border",
                "bg-foreground/40 border-dashed hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
                className
            )}
        >
            <div className="flex items-center gap-3 min-w-0">
                <div
                    className={cn(
                        "flex items-center justify-center shrink-0",
                        colorVariant === "coral" ? "text-[#E86040]" : "text-primary"
                    )}
                >
                    <FileText className="size-4" />
                </div>
                <div className="min-w-0 flex flex-col">
                    <span className="text-sm font-medium text-foreground truncate">
                        {fileName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {fileSize} • {statusText}
                    </span>
                </div>
            </div>

            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    aria-label="Remove attachment"
                    className="p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer ml-3"
                >
                    <X className="size-4" />
                </button>
            )}
        </div>
    );
};
FileAttachmentItem.displayName = "FileAttachmentItem";

// ============================================================================
// 15. FORM HELPER & ERROR MESSAGES
// ============================================================================

export interface FormHelperTextProps {
    children: React.ReactNode;
    state?: "default" | "error" | "success";
    className?: string;
}

export const FormHelperText: React.FC<FormHelperTextProps> = ({
    children,
    state = "default",
    className,
}) => {
    const stateClasses = {
        default: "text-muted-foreground",
        error: "text-error",
        success: "text-success",
    };

    const iconMap = {
        default: null,
        error: <AlertCircle className="size-3.5 shrink-0" />,
        success: <CheckCircle2 className="size-3.5 shrink-0" />,
    };

    const icon = iconMap[state];

    return (
        <div className={cn(
            "flex items-center gap-1.5 text-xs font-medium mt-1.5 animate-in fade-in-50",
            stateClasses[state],
            className
        )}>
            {icon}
            <span>{children}</span>
        </div>
    );
};

export interface FormErrorMessageProps {
    children: React.ReactNode;
    className?: string;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
    children,
    className,
}) => {
    return (
        <div
            className={cn(
                "flex items-center gap-1.5 text-xs text-error font-medium mt-1.5 animate-in fade-in-50",
                className
            )}
        >
            <AlertCircle className="size-3.5 shrink-0" />
            <span>{children}</span>
        </div>
    );
};

export interface FormSuccessMessageProps {
    children: React.ReactNode;
    className?: string;
}

export const FormSuccessMessage: React.FC<FormSuccessMessageProps> = ({
    children,
    className,
}) => {
    return (
        <div
            className={cn(
                "flex items-center gap-1.5 text-xs text-success font-medium mt-1.5 animate-in fade-in-50",
                className
            )}
        >
            <CheckCircle2 className="size-3.5 shrink-0" />
            <span>{children}</span>
        </div>
    );
};

// ============================================================================
// 16. FORM FIELD COMPOSITE COMPONENT
// ============================================================================

export interface FormFieldProps {
    label?: string;
    required?: boolean;
    state?: "default" | "error" | "success" | "disabled";
    helperText?: React.ReactNode;
    errorMessage?: React.ReactNode;
    successMessage?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    required,
    state = "default",
    helperText,
    errorMessage,
    successMessage,
    children,
    className,
    id,
}) => {
    return (
        <div className={cn("w-full space-y-1", className)}>
            {label && (
                <Label htmlFor={id} required={required} state={state}>
                    {label}
                </Label>
            )}
            {children}
            {errorMessage && state === "error" && (
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
            )}
            {successMessage && state === "success" && (
                <FormSuccessMessage>{successMessage}</FormSuccessMessage>
            )}
            {helperText && state !== "error" && state !== "success" && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
        </div>
    );
};
FormField.displayName = "FormField";

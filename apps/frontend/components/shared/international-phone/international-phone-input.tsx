"use client";

import type { FocusEventHandler } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { CountrySelector, FlagImage, usePhoneInput } from "react-international-phone";
import type { CountryIso2 } from "react-international-phone";
import "react-international-phone/style.css";

export const INTERNATIONAL_PHONE_PREFERRED_COUNTRIES: CountryIso2[] = ["sa", "ae", "eg", "kw", "qa", "bh", "om"];

export type InternationalPhoneInputProps = {
  value: string;
  onChange: (phoneE164: string) => void;
  locale: string;
  placeholder?: string;
  defaultCountry?: CountryIso2;
  preferredCountries?: CountryIso2[];
  className?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  /** Visually mark the field invalid (e.g. after blur when validation failed). */
  invalid?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /** Id of the live error message element (e.g. `role="alert"`). */
  "aria-describedby"?: string;
};

/**
 * Phone field matching Figma (719:16248): one shell, circular flag, ISO2, chevron,
 * and number area. Layout follows `dir` so the selector sits on the inline-end in RTL.
 */
export function InternationalPhoneInput({
  value,
  onChange,
  locale,
  placeholder,
  defaultCountry = "sa",
  preferredCountries = INTERNATIONAL_PHONE_PREFERRED_COUNTRIES,
  className,
  name = "phone",
  id,
  disabled,
  invalid,
  onBlur,
  "aria-describedby": ariaDescribedBy,
}: InternationalPhoneInputProps) {
  const isRtl = locale === "ar";

  const { inputValue, country, setCountry, handlePhoneValueChange, inputRef } = usePhoneInput({
    defaultCountry,
    value,
    preferredCountries,
    onChange: ({ phone: next }) => onChange(next),
  });

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        "flex h-11 w-full items-stretch overflow-visible rounded-lg border border-[#d1d5de] bg-white shadow-[0px_1px_2px_0px_rgba(17,24,39,0.05)]",
        invalid && "border-2 border-[#ef2752] shadow-[0px_0px_0px_3px_rgba(239,39,82,0.15)]",
        className,
      )}
      data-invalid={invalid ? true : undefined}
    >
      <div
        className={cn(
          "relative flex h-full shrink-0 items-stretch px-2",
          invalid && "bg-[rgba(239,39,82,0.04)]",
        )}
      >
        <CountrySelector
          selectedCountry={country.iso2}
          preferredCountries={preferredCountries}
          disabled={disabled}
          onSelect={(c) => setCountry(c.iso2)}
          className="flex h-full items-stretch"
          dropdownStyleProps={{
            className:
              "z-[200] w-[min(100vw-2rem,300px)] max-h-[min(50vh,220px)] rounded-lg border border-[#e9ebf0] bg-white py-1 shadow-[0px_10px_16px_-3px_rgba(15,17,20,0.08)]",
            style: isRtl ? { left: "auto", right: 0 } : undefined,
            listItemClassName: "min-h-9 text-sm",
            listItemDialCodeClassName: "text-(--color-text-secondary)",
          }}
          renderButtonWrapper={({ rootProps }) => (
            <button
              type="button"
              {...rootProps}
              dir={isRtl ? "rtl" : "ltr"}
              disabled={disabled}
              className={cn(
                "flex h-full cursor-pointer items-center gap-1.5 rounded-none border-0 bg-transparent py-0 outline-none",
                "text-(--color-text-primary) hover:bg-transparent focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-0",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              <span
                className={cn(
                  "relative flex size-5 shrink-0 overflow-hidden rounded-full border border-[#e9ebf0] bg-[#f9fafc]",
                  invalid && "border-[#ef2752]",
                )}
              >
                <FlagImage iso2={country.iso2} size={20} className="size-5 object-cover" />
              </span>
              <span className="text-sm font-normal uppercase tracking-wide">{country.iso2}</span>
              <ChevronDown
                className={cn("size-4 shrink-0 text-(--color-text-secondary)", invalid && "text-[#ef2752]")}
                aria-hidden
              />
            </button>
          )}
        />
      </div>

      <div
        className={cn(
          "relative min-h-11 min-w-0 flex-1 border-s border-[#d1d5de]",
          invalid && "border-[#ef2752] bg-[rgba(239,39,82,0.04)]",
        )}
      >
        <Input
          ref={inputRef}
          id={id}
          name={name}
          type="tel"
          dir="ltr"
          value={inputValue}
          onChange={handlePhoneValueChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete="tel"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={ariaDescribedBy}
          className={cn(
            "h-11 min-h-11 w-full rounded-none border-0 bg-transparent px-3 py-0 text-sm shadow-none",
            "text-(--color-text-primary) placeholder:text-(--color-text-secondary)",
            "focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            isRtl ? "text-end" : "text-start",
          )}
        />
      </div>
    </div>
  );
}

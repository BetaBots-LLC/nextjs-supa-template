"use client";

import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/hooks/form";
import { isInvalid } from "@/lib/form";

interface PhoneFieldProps {
  label: string;
  placeholder?: string;
}

/**
 * TanStack Form field component for US phone numbers.
 *
 * Formats the input as (555) 123-4567 while the user types using
 * libphonenumber-js `AsYouType`. The stored value is the formatted string —
 * downstream code should strip non-digits before sending to APIs.
 */
export function PhoneField({
  label,
  placeholder = "(555) 123-4567",
}: PhoneFieldProps) {
  const field = useFieldContext<string>();
  const id = field.name as string;
  const hasError = isInvalid(field);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;

    // If the user is deleting, just pass through to avoid fighting the cursor
    if (raw.length < (field.state.value?.length ?? 0)) {
      field.handleChange(raw);
      return;
    }

    const formatter = new AsYouType("US");
    formatter.input(raw);
    const formatted = formatter.getNumber()?.formatNational() ?? raw;
    field.handleChange(formatted);
  }

  // Show the national number in the formatted display if we have a valid parse
  const displayValue = field.state.value ?? "";

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <Input
        id={id}
        name={id}
        type="tel"
        inputMode="tel"
        placeholder={placeholder}
        aria-invalid={hasError}
        value={displayValue}
        onChange={handleChange}
        onBlur={field.handleBlur}
      />
      {hasError && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

/**
 * Strip a formatted phone string to just digits.
 * Use this before sending to APIs (OnPoint, Supabase, etc.)
 */
export function phoneToDigits(formatted: string): string {
  const parsed = parsePhoneNumberFromString(formatted, "US");
  return parsed?.nationalNumber?.toString() ?? formatted.replace(/\D/g, "");
}

import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

// ── Phone ─────────────────────────────────────────────────────────────────────
//
// Validates the formatted string stored by PhoneField, e.g. "(555) 123-4567".
// libphonenumber-js strips formatting before checking validity, so both raw
// digits and national-format strings are accepted.

export const phoneSchema = z.string().superRefine((val, ctx) => {
  if (!val || !val.trim()) {
    ctx.addIssue({
      code: "custom",
      message: "Phone number is required",
    });
    return;
  }
  const parsed = parsePhoneNumberFromString(val, "US");
  if (!parsed?.isValid()) {
    ctx.addIssue({
      code: "custom",
      message: "Enter a valid US phone number",
    });
  }
});

// ── Address ───────────────────────────────────────────────────────────────────
//
// parsedAddressSchema — matches the ParsedAddress shape emitted by
// AddressAutocompleteField's onAddressSelect callback.
// Use this when storing the structured breakdown alongside the display string.

export const parsedAddressSchema = z.object({
  /** Street address line, e.g. "123 Main St" or "PO Box 456" */
  address: z.string().min(1, "Street address is required"),
  /** Apartment / suite / unit — empty string when not present */
  unit: z.string(),
  city: z.string().min(1, "City is required"),
  /** 2-letter state abbreviation, e.g. "CA" */
  state: z.string().length(2, "Use a 2-letter state abbreviation"),
  zip: z.string().regex(/^\d{5}$/, "Enter a 5-digit ZIP code"),
});

export type ParsedAddressValues = z.infer<typeof parsedAddressSchema>;

// manualAddressSchema — for forms where users type an address themselves
// (no autocomplete). Validates each field independently.

export const manualAddressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  unit: z.string().default(""),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "Use a 2-letter state abbreviation"),
  zip: z.string().regex(/^\d{5}$/, "Enter a 5-digit ZIP code"),
});

export type ManualAddressValues = z.infer<typeof manualAddressSchema>;

// ── Composable field schemas ───────────────────────────────────────────────────
//
// Drop these into any object schema via .merge() or spread to avoid repetition.

export const phoneFieldSchema = z.object({
  phone: phoneSchema,
});

export const parsedAddressFieldSchema = z.object({
  // The display value bound to the AddressAutocompleteField input
  address: z.string().min(1, "Address is required"),
  // The structured breakdown populated via onAddressSelect
  addressData: parsedAddressSchema
    .nullable()
    .refine((val) => val !== null, "Select an address from the suggestions"),
});

export type ParsedAddressFieldValues = z.infer<typeof parsedAddressFieldSchema>;

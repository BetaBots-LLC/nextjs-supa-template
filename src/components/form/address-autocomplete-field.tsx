"use client";

import { MapPinIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useFieldContext } from "@/hooks/form";
import { isInvalid } from "@/lib/form";

export interface ParsedAddress {
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressAutocompleteFieldProps {
  label: string;
  placeholder?: string;
  onAddressSelect?: (parsed: ParsedAddress) => void;
  onClear?: () => void;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function parseAddressComponents(
  components: google.maps.places.AddressComponent[],
): ParsedAddress | null {
  let streetNumber = "";
  let route = "";
  let city = "";
  let state = "";
  let zip = "";

  for (const c of components) {
    const type = c.types[0];
    switch (type) {
      case "street_number":
        streetNumber = c.longText;
        break;
      case "route":
        route = c.longText;
        break;
      case "locality":
        city = c.longText;
        break;
      case "sublocality_level_1":
        if (!city) city = c.longText;
        break;
      case "administrative_area_level_1":
        state = c.shortText;
        break;
      case "postal_code":
        zip = c.longText;
        break;
    }
  }

  const address = streetNumber ? `${streetNumber} ${route}` : route;
  if (!address) return null;

  return { address, city, state, zip };
}

// ── Types ───────────────────────────────────────────────────────────────────

interface Suggestion {
  placeId: string;
  mainText: string;
  secondaryText: string;
  prediction: google.maps.places.PlacePrediction;
}

// ── Component ───────────────────────────────────────────────────────────────

export function AddressAutocompleteField({
  label,
  placeholder = "Search for an address\u2026",
  onAddressSelect,
  onClear,
}: AddressAutocompleteFieldProps) {
  const field = useFieldContext<string>();
  const id = field.name as string;
  const hasError = isInvalid(field);

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [placesReady, setPlacesReady] = useState(false);

  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onSelectRef = useRef(onAddressSelect);
  onSelectRef.current = onAddressSelect;
  const onClearRef = useRef(onClear);
  onClearRef.current = onClear;

  // Load the places library once
  useEffect(() => {
    if (typeof google === "undefined") return;

    google.maps
      .importLibrary("places")
      .then(() => {
        sessionTokenRef.current =
          new google.maps.places.AutocompleteSessionToken();
        setPlacesReady(true);
      })
      .catch(() => {});
  }, []);

  // Debounced fetch
  const fetchSuggestions = useCallback(
    (input: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (!placesReady || input.length < 3) {
        setSuggestions([]);
        return;
      }

      debounceRef.current = setTimeout(async () => {
        try {
          const { suggestions: results } =
            await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
              {
                input,
                sessionToken: sessionTokenRef.current ?? undefined,
                includedPrimaryTypes: [
                  "street_address",
                  "subpremise",
                  "premise",
                ],
                includedRegionCodes: ["us"],
              },
            );

          const mapped: Suggestion[] = results.map((s) => ({
            placeId: s.placePrediction.placeId,
            mainText:
              s.placePrediction.mainText?.text ?? s.placePrediction.text.text,
            secondaryText: s.placePrediction.secondaryText?.text ?? "",
            prediction: s.placePrediction,
          }));

          setSuggestions(mapped);
          if (mapped.length > 0) setOpen(true);
        } catch {
          setSuggestions([]);
        }
      }, 300);
    },
    [placesReady],
  );

  // Handle selecting a suggestion from the combobox
  const handleValueChange = useCallback(
    async (value: string | null) => {
      if (!value) {
        // X button was pressed — clear input, close dropdown, reset fields
        field.handleChange("");
        setSuggestions([]);
        setOpen(false);
        onClearRef.current?.();
        return;
      }

      const suggestion = suggestions.find((s) => s.placeId === value);
      if (!suggestion) return;

      setOpen(false);
      setSuggestions([]);

      // Show the main text immediately while we fetch details
      field.handleChange(suggestion.mainText);

      const place = suggestion.prediction.toPlace();
      await place.fetchFields({ fields: ["addressComponents"] });

      // Reset session token (Google billing best practice)
      sessionTokenRef.current =
        new google.maps.places.AutocompleteSessionToken();

      const components = place.addressComponents;
      if (!components) return;

      const parsed = parseAddressComponents(components);
      if (!parsed) return;

      field.handleChange(parsed.address);
      onSelectRef.current?.(parsed);
    },
    [field, suggestions],
  );

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <Combobox
        open={open}
        onOpenChange={setOpen}
        value={null}
        onValueChange={handleValueChange}
      >
        <ComboboxInput
          id={id}
          placeholder={placeholder}
          aria-invalid={hasError}
          showTrigger
          showClear={field.state.value.length > 0}
          value={field.state.value}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            field.handleChange(value);
            fetchSuggestions(value);
          }}
          autoComplete="off"
        />

        <ComboboxContent>
          <ComboboxList>
            {suggestions.map((suggestion) => (
              <ComboboxItem key={suggestion.placeId} value={suggestion.placeId}>
                <MapPinIcon className="size-3.5 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="truncate">{suggestion.mainText}</div>
                  {suggestion.secondaryText && (
                    <div className="truncate text-xs text-muted-foreground">
                      {suggestion.secondaryText}
                    </div>
                  )}
                </div>
              </ComboboxItem>
            ))}
          </ComboboxList>

          {suggestions.length === 0 && (
            <ComboboxEmpty>
              {field.state.value.length >= 3
                ? "No addresses found"
                : "Type to search\u2026"}
            </ComboboxEmpty>
          )}

          {/* Google attribution */}
          <div className="border-t border-border px-2 py-1.5 text-right">
            <span className="text-[10px] text-muted-foreground/60">
              Powered by Google
            </span>
          </div>
        </ComboboxContent>
      </Combobox>

      {hasError && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

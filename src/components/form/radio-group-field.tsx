"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFieldContext } from "@/hooks/form";
import { isInvalid } from "@/lib/form";

interface RadioGroupFieldProps {
  label: string;
  options: { value: string; label: string; description?: string }[];
  description?: string;
}

export function RadioGroupField({
  label,
  options,
  description,
}: RadioGroupFieldProps) {
  const field = useFieldContext<string>();
  const id = field.name as string;
  const hasError = isInvalid(field);

  return (
    <FieldSet>
      <FieldLegend>{label}</FieldLegend>
      {description && <FieldDescription>{description}</FieldDescription>}
      <RadioGroup
        name={id}
        value={field.state.value}
        onValueChange={field.handleChange}
      >
        {options.map((opt) => (
          <FieldLabel key={opt.value} htmlFor={`${id}-${opt.value}`}>
            <Field orientation="horizontal" data-invalid={hasError}>
              <FieldContent>
                <FieldTitle>{opt.label}</FieldTitle>
                {opt.description && (
                  <FieldDescription>{opt.description}</FieldDescription>
                )}
              </FieldContent>
              <RadioGroupItem
                value={opt.value}
                id={`${id}-${opt.value}`}
                aria-invalid={hasError}
              />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
      {hasError && <FieldError errors={field.state.meta.errors} />}
    </FieldSet>
  );
}

"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFieldContext } from "@/hooks/form";
import { isInvalid } from "@/lib/form";

interface TextareaFieldProps {
  label: string;
  placeholder?: string;
  rows?: number;
  description?: string;
}

export function TextareaField({
  label,
  placeholder,
  rows = 3,
  description,
}: TextareaFieldProps) {
  const field = useFieldContext<string>();
  const id = field.name as string;
  const hasError = isInvalid(field);

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={hasError}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {hasError && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

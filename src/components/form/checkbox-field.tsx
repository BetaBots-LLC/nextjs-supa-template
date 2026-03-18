"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useFieldContext } from "@/hooks/form";
import { isInvalid } from "@/lib/form";

interface CheckboxFieldProps {
  label: string;
  description?: string;
}

export function CheckboxField({ label, description }: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();
  const id = field.name as string;
  const hasError = isInvalid(field);

  return (
    <Field data-invalid={hasError} orientation="horizontal">
      <Checkbox
        id={id}
        name={id}
        aria-invalid={hasError}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked)}
      />
      <FieldContent>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={field.state.meta.errors} />}
      </FieldContent>
    </Field>
  );
}

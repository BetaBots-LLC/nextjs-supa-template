"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useFieldContext } from "@/hooks/form";
import { isInvalid } from "@/lib/form";

interface SwitchFieldProps {
  label: string;
  description?: string;
}

export function SwitchField({ label, description }: SwitchFieldProps) {
  const field = useFieldContext<boolean>();
  const id = field.name as string;
  const hasError = isInvalid(field);

  return (
    <Field data-invalid={hasError} orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={field.state.meta.errors} />}
      </FieldContent>
      <Switch
        id={id}
        name={id}
        aria-invalid={hasError}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked)}
      />
    </Field>
  );
}

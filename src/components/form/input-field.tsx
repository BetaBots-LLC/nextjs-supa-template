"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/hooks/form";
import { isInvalid } from "@/lib/form";

interface InputFieldProps {
  label: string;
  type?: React.ComponentProps<"input">["type"];
  placeholder?: string;
  maxLength?: number;
  description?: string;
}

export function InputField({
  label,
  type = "text",
  placeholder,
  maxLength,
  description,
}: InputFieldProps) {
  const field = useFieldContext<string>();
  const id = field.name as string;
  const hasError = isInvalid(field);

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={hasError}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {description && (
        <FieldDescription className="text-muted-foreground text-xs">
          {description}
        </FieldDescription>
      )}
      {hasError && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

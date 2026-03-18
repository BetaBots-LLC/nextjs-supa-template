"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldContext } from "@/hooks/form";
import { isInvalid } from "@/lib/form";

interface SelectFieldProps {
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  description?: string;
  side?: "bottom" | "top" | "left" | "right";
  align?: "start" | "center" | "end";
  alignItemWithTrigger?: boolean;
  orientation?: "vertical" | "horizontal";
}

export function SelectField({
  label,
  placeholder,
  options,
  description,
  side,
  align,
  alignItemWithTrigger,
  orientation = "vertical",
}: SelectFieldProps) {
  const field = useFieldContext<string>();
  const id = field.name as string;
  const hasError = isInvalid(field);

  return (
    <Field data-invalid={hasError} orientation={orientation}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
      <Select
        value={field.state.value}
        onValueChange={(val) => {
          if (val !== null) field.handleChange(val);
        }}
      >
        <SelectTrigger className="w-full" aria-invalid={hasError}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          side={side}
          align={align}
          alignItemWithTrigger={alignItemWithTrigger}
        >
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasError && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

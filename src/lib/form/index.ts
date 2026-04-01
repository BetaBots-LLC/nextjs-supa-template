import type { AnyFieldApi } from "@tanstack/react-form";

export const isInvalid = (field: AnyFieldApi) => {
  return field.state.meta.isTouched && !field.state.meta.isValid;
};

"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { AddressAutocompleteField } from "@/components/form/address-autocomplete";
import { CheckboxField } from "@/components/form/checkbox-field";
import { InputField } from "@/components/form/input-field";
import { PhoneField } from "@/components/form/phone-field";
import { RadioGroupField } from "@/components/form/radio-group-field";
import { SelectField } from "@/components/form/select-field";
import { SubscribeButton } from "@/components/form/subscribe-button";
import { SwitchField } from "@/components/form/switch-field";
import { TextareaField } from "@/components/form/textarea-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    AddressAutocompleteField,
    InputField,
    PhoneField,
    TextareaField,
    SelectField,
    CheckboxField,
    RadioGroupField,
    SwitchField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});

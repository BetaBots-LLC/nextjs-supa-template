"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { AddressAutocompleteField } from "../../../nextjs-supa-template/src/components/form/address-autocomplete";
import { CheckboxField } from "../../../nextjs-supa-template/src/components/form/checkbox-field";
import { InputField } from "../../../nextjs-supa-template/src/components/form/input-field";
import { PhoneField } from "../../../nextjs-supa-template/src/components/form/phone-field";
import { RadioGroupField } from "../../../nextjs-supa-template/src/components/form/radio-group-field";
import { SelectField } from "../../../nextjs-supa-template/src/components/form/select-field";
import { SubscribeButton } from "../../../nextjs-supa-template/src/components/form/subscribe-button";
import { SwitchField } from "../../../nextjs-supa-template/src/components/form/switch-field";
import { TextareaField } from "../../../nextjs-supa-template/src/components/form/textarea-field";

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

"use client";

import { Button } from "@/components/ui/button";
import { useFormContext } from "@/hooks/form";

interface SubscribeButtonProps {
  label: string;
  submittingLabel?: string;
}

export function SubscribeButton({
  label,
  submittingLabel,
}: SubscribeButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (submittingLabel ?? "Submitting…") : label}
        </Button>
      )}
    </form.Subscribe>
  );
}

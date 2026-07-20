"use client";

import { useState, type FormEvent } from "react";
import {
  FormField,
  SelectInput,
  TextArea,
  TextInput,
  secondaryButtonClassName,
  submitButtonClassName,
} from "./FormField";
import TurnstileWidget, { turnstileSiteKey } from "./TurnstileWidget";

const SERVICE_OPTIONS = [
  "Fuel Supply & Distribution",
  "Marine Bunkering",
  "LNG Operations Management",
  "Regulatory & Government Support",
  "Other",
] as const;

type QuoteFormProps = {
  onClose: () => void;
};

export default function QuoteForm({ onClose }: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          service: formData.get("service"),
          message: formData.get("message"),
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to send your request.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to send your request.",
      );
      // Turnstile tokens are single-use, so request a fresh one after failure.
      setTurnstileToken("");
      setTurnstileResetSignal((signal) => signal + 1);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-display text-lg font-semibold uppercase tracking-tight text-petroa-primary">
          Request received
        </p>
        <p className="text-sm leading-[1.6] text-petroa-text/70">
          Thank you for reaching out. Our team will review your quote request and
          get back to you shortly.
        </p>
        <button type="button" onClick={onClose} className={submitButtonClassName}>
          Close
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField id="quote-name" label="Full name *">
          <TextInput id="quote-name" name="name" required autoComplete="name" />
        </FormField>

        <FormField id="quote-email" label="Email *">
          <TextInput
            id="quote-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField id="quote-phone" label="Phone">
          <TextInput
            id="quote-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
          />
        </FormField>

        <FormField id="quote-company" label="Company *">
          <TextInput
            id="quote-company"
            name="company"
            required
            autoComplete="organization"
          />
        </FormField>
      </div>

      <FormField id="quote-service" label="Service needed *">
        <SelectInput id="quote-service" name="service" required defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {SERVICE_OPTIONS.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </SelectInput>
      </FormField>

      <FormField id="quote-message" label="Project details *">
        <TextArea
          id="quote-message"
          name="message"
          required
          placeholder="Tell us about volumes, timelines, locations, or compliance needs."
        />
      </FormField>

      <TurnstileWidget
        onToken={setTurnstileToken}
        resetSignal={turnstileResetSignal}
      />

      {status === "error" ? (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={status === "loading" || (Boolean(turnstileSiteKey) && !turnstileToken)}
          className={submitButtonClassName}
        >
          {status === "loading" ? "Sending..." : "Submit Request"}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={status === "loading"}
          className={secondaryButtonClassName}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

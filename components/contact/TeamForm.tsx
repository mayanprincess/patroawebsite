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

type TeamFormProps = {
  onClose: () => void;
};

export default function TeamForm({ onClose }: TeamFormProps) {
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
          type: "team",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          preferredContact: formData.get("preferredContact"),
          message: formData.get("message"),
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to send your message.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to send your message.",
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
          Message sent
        </p>
        <p className="text-sm leading-[1.6] text-petroa-text/70">
          Thanks for contacting PETROA. A member of our team will reach out using
          your preferred contact method.
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
        <FormField id="team-name" label="Full name *">
          <TextInput id="team-name" name="name" required autoComplete="name" />
        </FormField>

        <FormField id="team-email" label="Email *">
          <TextInput
            id="team-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField id="team-phone" label="Phone">
          <TextInput
            id="team-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
          />
        </FormField>

        <FormField id="team-company" label="Company">
          <TextInput
            id="team-company"
            name="company"
            autoComplete="organization"
          />
        </FormField>
      </div>

      <FormField id="team-preferred-contact" label="Preferred contact *">
        <SelectInput
          id="team-preferred-contact"
          name="preferredContact"
          required
          defaultValue="email"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </SelectInput>
      </FormField>

      <FormField id="team-message" label="How can we help? *">
        <TextArea
          id="team-message"
          name="message"
          required
          placeholder="Share your questions about fuel supply, bunkering, LNG, or regulatory support."
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
          {status === "loading" ? "Sending..." : "Send Message"}
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

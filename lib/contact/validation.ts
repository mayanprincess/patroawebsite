import type { ContactFormData, ContactFormType } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmpty(value: unknown, max = 500): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

export function validateContactPayload(
  body: unknown,
): { success: true; data: ContactFormData } | { success: false; message: string } {
  if (!body || typeof body !== "object") {
    return { success: false, message: "Invalid request body." };
  }

  const record = body as Record<string, unknown>;
  const type = record.type;

  if (type !== "quote" && type !== "team") {
    return { success: false, message: "Invalid form type." };
  }

  if (!isNonEmpty(record.name, 120)) {
    return { success: false, message: "Name is required." };
  }

  if (!isNonEmpty(record.email, 254) || !EMAIL_REGEX.test(record.email.trim())) {
    return { success: false, message: "A valid email is required." };
  }

  if (record.phone !== undefined && record.phone !== "") {
    if (typeof record.phone !== "string" || record.phone.length > 40) {
      return { success: false, message: "Phone number is invalid." };
    }
  }

  if (!isNonEmpty(record.message, 2000)) {
    return { success: false, message: "Message is required." };
  }

  if (type === "quote") {
    if (!isNonEmpty(record.company, 200)) {
      return { success: false, message: "Company is required." };
    }

    if (!isNonEmpty(record.service, 120)) {
      return { success: false, message: "Service selection is required." };
    }

    return {
      success: true,
      data: {
        type: "quote",
        name: record.name.trim(),
        email: record.email.trim().toLowerCase(),
        phone: typeof record.phone === "string" ? record.phone.trim() : undefined,
        company: record.company.trim(),
        service: record.service.trim(),
        message: record.message.trim(),
      },
    };
  }

  if (record.company !== undefined && record.company !== "") {
    if (typeof record.company !== "string" || record.company.length > 200) {
      return { success: false, message: "Company name is invalid." };
    }
  }

  if (record.preferredContact !== "email" && record.preferredContact !== "phone") {
    return { success: false, message: "Preferred contact method is required." };
  }

  return {
    success: true,
    data: {
      type: "team",
      name: record.name.trim(),
      email: record.email.trim().toLowerCase(),
      phone: typeof record.phone === "string" ? record.phone.trim() : undefined,
      company:
        typeof record.company === "string" && record.company.trim()
          ? record.company.trim()
          : undefined,
      preferredContact: record.preferredContact,
      message: record.message.trim(),
    },
  };
}

export function getFormTitle(type: ContactFormType) {
  return type === "quote" ? "Request a Quote" : "Speak With Our Team";
}

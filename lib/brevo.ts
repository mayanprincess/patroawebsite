import type { ContactFormData } from "@/lib/contact/types";

type BrevoConfig = {
  apiKey: string;
  senderEmail: string;
  senderName: string;
  recipientEmail: string;
};

function getBrevoConfig(): BrevoConfig | null {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? "PETROA";
  const recipientEmail = process.env.BREVO_RECIPIENT_EMAIL;

  if (!apiKey || !senderEmail || !recipientEmail) {
    return null;
  }

  return { apiKey, senderEmail, senderName, recipientEmail };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildEmailContent(data: ContactFormData) {
  if (data.type === "quote") {
    return {
      subject: `New Quote Request — ${data.name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? "—")}</p>
        <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
        <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replaceAll("\n", "<br />")}</p>
      `,
    };
  }

  return {
    subject: `Team Contact Request — ${data.name}`,
    html: `
      <h2>Speak With Our Team</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? "—")}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company ?? "—")}</p>
      <p><strong>Preferred contact:</strong> ${escapeHtml(data.preferredContact)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replaceAll("\n", "<br />")}</p>
    `,
  };
}

export async function sendContactEmail(data: ContactFormData) {
  const config = getBrevoConfig();

  if (!config) {
    throw new Error("Email service is not configured.");
  }

  const { subject, html } = buildEmailContent(data);

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": config.apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: config.senderName,
        email: config.senderEmail,
      },
      to: [{ email: config.recipientEmail, name: "PETROA" }],
      replyTo: { email: data.email, name: data.name },
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Brevo API error:", response.status, errorBody);
    throw new Error("Failed to send message.");
  }

  return response.json();
}

import { sendContactEmail } from "@/lib/brevo";
import { validateContactPayload } from "@/lib/contact/validation";
import { verifyTurnstileToken } from "@/lib/turnstile";

function getRemoteIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const turnstileToken =
      body && typeof body === "object"
        ? (body as Record<string, unknown>).turnstileToken
        : undefined;
    const turnstileResult = await verifyTurnstileToken(
      turnstileToken,
      getRemoteIp(request),
    );

    if (!turnstileResult.success) {
      return Response.json({ message: turnstileResult.message }, { status: 400 });
    }

    const result = validateContactPayload(body);

    if (!result.success) {
      return Response.json({ message: result.message }, { status: 400 });
    }

    await sendContactEmail(result.data);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { message: "Unable to send your message. Please try again later." },
      { status: 500 },
    );
  }
}

import { sendContactEmail } from "@/lib/brevo";
import { validateContactPayload } from "@/lib/contact/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

type TurnstileConfig = {
  secretKey: string;
};

type TurnstileVerifyResult =
  | { success: true }
  | { success: false; message: string };

function getTurnstileConfig(): TurnstileConfig | null {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    return null;
  }

  return { secretKey };
}

/**
 * Verifies a Cloudflare Turnstile token against the siteverify API.
 *
 * When TURNSTILE_SECRET_KEY is not configured, verification is skipped with a
 * warning so local development works without Cloudflare credentials. In
 * production a missing key fails closed so the form is never silently
 * unprotected.
 */
export async function verifyTurnstileToken(
  token: unknown,
  remoteIp?: string | null,
): Promise<TurnstileVerifyResult> {
  const config = getTurnstileConfig();

  if (!config) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "TURNSTILE_SECRET_KEY is not set in production. Rejecting submission.",
      );
      return {
        success: false,
        message: "Captcha verification is unavailable. Please try again later.",
      };
    }
    console.warn(
      "TURNSTILE_SECRET_KEY is not set. Skipping captcha verification.",
    );
    return { success: true };
  }

  if (typeof token !== "string" || token.trim().length === 0) {
    return { success: false, message: "Captcha verification is required." };
  }

  const body = new URLSearchParams({
    secret: config.secretKey,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Turnstile API error:", response.status, errorBody);
    return {
      success: false,
      message: "Unable to verify the captcha. Please try again.",
    };
  }

  const result = (await response.json()) as {
    success: boolean;
    "error-codes"?: string[];
  };

  if (!result.success) {
    console.error("Turnstile verification failed:", result["error-codes"]);
    return {
      success: false,
      message: "Captcha verification failed. Please try again.",
    };
  }

  return { success: true };
}
